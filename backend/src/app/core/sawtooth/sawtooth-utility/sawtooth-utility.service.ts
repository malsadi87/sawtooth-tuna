import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { TransactionHeader, Transaction, BatchHeader, Batch, BatchList } from 'sawtooth-sdk/protobuf';
import { getProjectConfig } from '../../../utility/methods/helper.methods';
import * as crypto from 'crypto';

@Injectable()
export class SawtoothUtilityService {
    private sawtoothConfig: any;

    constructor(private httpService: HttpService) {
        this.sawtoothConfig = getProjectConfig('sawtooth');
    }

    public hash(data: any): string {
        return crypto.createHash('sha512').update(data).digest('hex').toLowerCase();
    }

    public getNamespace(familyName: string): string {
        return this.hash(familyName).substring(0, 6);
    }

    public getAssetAddress(asset: any, familyName: string): string {
        return `${this.getNamespace(familyName)}00${this.hash(asset).slice(0, 62)}`;
    }

    public getMetaKeyAddress(key: string, familyName: string): string {
        return `${this.hash(familyName).substring(0, 6)}00${this.hash(key).slice(0, 62)}`;
    }

    private getTransactionFamilDetails(tpName: string): { family: string, version: string, prefix: string } {
        const config = this.sawtoothConfig.TP[tpName.toUpperCase()];
        return { family: config.FAMILY, version: config.VERSION, prefix: config.PREFIX };
    }

    public async createAsset(payload: any, userPrivateKey: string, tpName: string): Promise<string> {
        try {
            // Get Transaction Famil Details
            const { family: familyName, version: familyVersion, prefix: familyNamespace } = this.getTransactionFamilDetails(tpName);

            // Create signer
            const context = createContext(this.sawtoothConfig.KEY_ALGORITHMN);
            const privateKey = Secp256k1PrivateKey.fromHex(userPrivateKey);
            const signer = new Signer(context, privateKey);

            // Create the TransactionHeader
            const payloadBytes = Buffer.from(JSON.stringify(payload));
            const transactionHeaderBytes: any = TransactionHeader.encode({
                familyName: familyName,
                familyVersion: familyVersion,
                inputs: [familyNamespace],
                outputs: [familyNamespace],
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
            const result = await firstValueFrom(this.httpService.post(`${this.sawtoothConfig.API_URL}/batches`, batchListBytes, {
                headers: { 'Content-Type': 'application/octet-stream' }
            }).pipe(map(x => x.data)));

            // const id = result.link.split('?')[1];
            // const response = await firstValueFrom(this.httpService.get(`${this.sawtoothConfig.API_URL}/batch_statuses?${id}&wait`));

            // if (response.status != 200)
            //     throw "Batch append success status is taking too long time!";
            Logger.log(result.link)
            return result.link.split('?')[1].split('=')[1];
        } catch (e) {
            throw e;
        }
    }

    public getAsset(address: string): any {
        try {
            this.httpService.get(`${this.sawtoothConfig.API_URL}/state?address=${address}`)
                .subscribe(res => {
                    if (res.status == 200) {
                        if (res.data.data.length == 0)
                            throw new Error('No result found, try another ID');
                        else {
                            const response = res.data.data[0];
                            if (response !== '')
                                return JSON.parse(atob(response.data));
                            else
                                throw new Error('Empty Response!'); 
                        }
                    } else
                        throw new Error('An error occured, Please try again later');
                });
        }
        catch (err) {
            console.error(err);
        }
    }
}
