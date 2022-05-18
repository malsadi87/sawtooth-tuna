import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AssetCreationOperation } from '../../../utility/enum/asset-creation.enum';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { TransactionHeader, Transaction, BatchHeader, Batch, BatchList } from 'sawtooth-sdk/protobuf';
import { getProjectConfig } from '../../../utility/methods/helper.methods';
import * as crypto from 'crypto';

@Injectable()
export class UtilityService {
    private sawtoothConfig: any;

    constructor(private httpService: HttpService) {
        this.sawtoothConfig = getProjectConfig('sawtooth');
    }

    hash(data: any): string {
        return crypto.createHash('sha512').update(data).digest('hex').toLowerCase();
    }

    getTunachainNamespace(): string {
        return this.hash("transfer-chain").substring(0, 6);
    }

    getAssetAddress(asset: any): string {
        return `${this.getTunachainNamespace()}00${this.hash(asset).slice(0, 62)}`;
    }

    getMetaKeyAddress(key: string): string {
        return `${this.hash("cross-chain").substring(0, 6)}00${this.hash(key).slice(0, 62)}`;
    }

    async createAsset(operationType: AssetCreationOperation, payload: any, privateKeyHax: string): Promise<boolean> {
        try {
            // Add action type to payload
            payload = { action: operationType, ...payload };

            // Create signer
            const context = createContext(this.sawtoothConfig.KEY_ALGORITHMN);
            const privateKey = Secp256k1PrivateKey.fromHex(privateKeyHax);
            const signer = new Signer(context, privateKey);

            // Create the TransactionHeader
            const payloadBytes = Buffer.from(JSON.stringify(payload));
            const transactionHeaderBytes: any = TransactionHeader.encode({
                familyName: this.sawtoothConfig.FAMILY,
                familyVersion: this.sawtoothConfig.VERSION,
                inputs: [this.sawtoothConfig.PREFIX],
                outputs: [this.sawtoothConfig.PREFIX],
                signerPublicKey: signer.getPublicKey().asHex(),
                batcherPublicKey: signer.getPublicKey().asHex(),
                dependencies: [],
                payloadSha512: this.hash(payloadBytes)
            }).finish();

            // Create the Transaction
            const transactionHeaderSignature = signer.sign(transactionHeaderBytes);
            const transaction = Transaction.create({
                header: transactionHeaderBytes,
                headerSignature: transactionHeaderSignature,
                payload: payloadBytes
            });

            // Create the BatchHeader
            const batchHeaderBytes: any = BatchHeader.encode({
                signerPublicKey: signer.getPublicKey().asHex(),
                transactionIds: [transaction.headerSignature]
            }).finish();

            // Create the Batch
            const batchHeaderSignature = signer.sign(batchHeaderBytes);
            const batch = Batch.create({
                header: batchHeaderBytes,
                headerSignature: batchHeaderSignature,
                transactions: [transaction]
            });

            // Encode the Batch in a BatchList
            const batchListBytes = BatchList.encode({
                batches: [batch]
            }).finish();

            // Submit BatchList to Validator
            const result = await firstValueFrom(this.httpService.post(`${this.sawtoothConfig.API_URL}`, batchListBytes, {
                headers: { 'Content-Type': 'application/octet-stream' }
            }));

            if (result.status != 200)
                throw "Batch append to sawtooth failed!";

            const id = result.data.link.split('?')[1];
            const response = await firstValueFrom(this.httpService.get(`${this.sawtoothConfig.API_URL}/batch_statuses?${id}&wait`));
            
            if (response.status != 200)
                throw "Batch append success status is taking too long time!";
            return true;
        } catch (e) {
            throw e;
        }
    }
}
