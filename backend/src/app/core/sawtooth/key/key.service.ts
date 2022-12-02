import { Injectable } from '@nestjs/common';
import { createContext } from 'sawtooth-sdk-js/signing';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeyService {
    private sawtoothConfig: any;

    constructor(config: ConfigService) {
        this.sawtoothConfig = config.get('sawtooth');
    }

    private getPrivateKey(publicKey: string): string {
        return null;
    }

    private saveKeyPairToDB(publicKey: string, privateKey: string): boolean {
        return true;
    }

    createKeyPair(): { publicKey: string, privateKey: string } {
        const context = createContext(this.sawtoothConfig.KEY_ALGORITHMN);
        const privateKey = context.newRandomPrivateKey();

        // If user has already a key, then update the db record, else -> 
        // Save them to db, By user record, so that can be retrieve by user(email and password)
        // Pass the public key with JWTtoken
        // Get the private key from DB and do further oprtaion
        // Maybe create a injector so that for each and every request it get the private key from DB
        // Or you can cache it for better performance
        return { publicKey: context.getPublicKey(privateKey).asHex(), privateKey: privateKey.asHex() };
    }
}
