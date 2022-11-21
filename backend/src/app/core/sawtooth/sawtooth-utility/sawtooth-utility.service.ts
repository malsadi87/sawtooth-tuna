import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { createContext, Signer } from 'sawtooth-sdk/signing';
import { Secp256k1PrivateKey } from 'sawtooth-sdk/signing/secp256k1';
import { TransactionHeader, Transaction, BatchHeader, Batch, BatchList } from 'sawtooth-sdk/protobuf';
import { LoginUserInfoService } from '../../../shared/loginUserInfo/login-user-info.service';
import { SAWTOOTH_IDENTITY_KEY } from '../../../utility/decorator/sawtoothIdentity.decorator';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class SawtoothUtilityService {
    private sawtoothConfig: any;

    constructor(
        private readonly httpService: HttpService,
        private readonly loginUserInfoService: LoginUserInfoService,
        private readonly configService: ConfigService
    ) {
        this.sawtoothConfig = this.configService.get('sawtooth');
    }

    private hash(data: any): string {
        return crypto.createHash('sha512').update(data).digest('hex').toLowerCase();
    }

    private getNamespace(tpName: string): string {
        return this.hash(tpName).substring(0, 6);
    }

    private getTransactionFamilDetails(tpName: string): { family: string, version: string, prefix: string } {
        const config = this.sawtoothConfig.TP[tpName.toUpperCase()];
        return { family: config.FAMILY, version: config.VERSION, prefix: config.PREFIX };
    }

    // Find the identifiers in a entity using SawtoothIdentity(reflection to 
    // find the identoies(primary key), which is/are will be used to generate the address of the block)
    private getIdentity(payload: any): string {
        if (!payload[SAWTOOTH_IDENTITY_KEY]) throw new Error('Invalid Object!');

        const identifierKeys: [string] = payload[SAWTOOTH_IDENTITY_KEY];
        let identifier = '';
        identifierKeys.forEach(key => {
            identifier = identifier.concat((payload[key] instanceof Date) ? payload[key].toLocaleString(): String(payload[key]));
        });
        return identifier;
    }

    public getAssetAddress(tpName: string, identifier: any): string {
        return `${this.getNamespace(tpName)}00${this.hash(identifier).slice(0, 62)}`;
    }

    public getGeneericAssetAddress(tpName: string, entity_type: string, identifier: any): string {
        return `${this.getNamespace(tpName)}00${this.getNamespace(entity_type)}00${this.hash(identifier).slice(0, 54)}`;
    }

    public async createAsset(payload: any, entity_type: string = null, tpName: string = 'generic'): Promise<string> {
        try {
            // Getting Logged in user Info
            const userInfo = this.loginUserInfoService.getInfo();

            // Get Transaction Famil Details
            const { family: familyName, version: familyVersion, prefix: familyNamespace } = this.getTransactionFamilDetails(tpName);

            // If entity_type is present then its a generic entity save call
            if(entity_type) {
                // Find the identifiers in a entity using SawtoothIdentity(reflection to 
                // find the identoies(primary key), which is/are will be used to generate the address of the block)
                const identifier = this.getIdentity(payload);

                payload = {
                    entity_type: entity_type,
                    identifier: identifier,
                    data_hash: this.hash(JSON.stringify(payload))
                }
            }

            // Create signer
            const context = createContext(this.sawtoothConfig.KEY_ALGORITHMN);
            const privateKey = Secp256k1PrivateKey.fromHex(userInfo.blockChainPrivateKey);
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
            const batchListBytes = BatchList.encode({ batches: [batch] }).finish();

            // Submit BatchList to Validator
            const result = await firstValueFrom(this.httpService.post(`${this.sawtoothConfig.API_URL}/batches`, batchListBytes, {
                headers: { 'Content-Type': 'application/octet-stream' }
            }).pipe(map(x => x.data)));

            // const id = result.link.split('?')[1];
            // const response = await firstValueFrom(this.httpService.get(`${this.sawtoothConfig.API_URL}/batch_statuses?${id}&wait`));

            // if (response.status != 200)
            //     throw "Batch append success status is taking too long time!";
            return new URL(result.link).searchParams.get('id');
        } catch (e) {
            throw e;
        }
    }

    public async getAsset(address: string): Promise<any> {
        try {
            const response = await firstValueFrom(this.httpService.get(`${this.sawtoothConfig.API_URL}/state?address=${address}`));
            if (response.status == 200) {
                if (response.data.data.length == 0)
                    throw new Error('No result found, try another ID');
                else {
                    const result = response.data.data[0];
                    if (result !== '')
                        return JSON.parse(Buffer.from(result.data, 'base64').toString());
                    else
                        throw new Error('Empty Response!'); 
                }
            } else
                throw new Error('An error occured, Please try again later');
        }
        catch (err) {
            console.error(err);
        }
    }

    public async verifyAsset(payload: any, entity_type: string = null, tpName: string = 'generic'): Promise<boolean> {
        // Find the identifiers in a entity using SawtoothIdentity(reflection to
        // find the identoies(primary key), which is/are will be used to generate the address of the block)
        const identifier = this.getIdentity(payload);
        let address: string = entity_type ? this.getGeneericAssetAddress(tpName, entity_type, identifier) : this.getAssetAddress(tpName, identifier);

        const assetBCHash = await this.getAsset(address);

        return this.hash(JSON.stringify(payload)) == assetBCHash.data_hash;
    }
}
