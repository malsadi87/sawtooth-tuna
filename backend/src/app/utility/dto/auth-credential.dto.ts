import { MinLength, MaxLength, IsEmail } from "class-validator";

export class AuthCredential {
    
    @IsEmail()
    email: string;

    @MinLength(5)
    @MaxLength(16)
    password: string;
}