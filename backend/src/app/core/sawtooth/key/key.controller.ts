import { Controller, Get, Param } from '@nestjs/common';
import { KeyService } from './key.service';

@Controller('sawtooth/key')
export class KeyController {
    constructor(private keyService: KeyService){}

    /*
        * For now create a key pair
        * In future this method will not necessary
        * As, key will be created during the registration and saved to db and pass with JWT roken 
    */

    @Get('/createNewPair')
    CreateKeyPair(): { publicKey: string, privateKey: string } {
        return this.keyService.createKeyPair();
    }
}
