import { IsString, MinLength, MaxLength, IsEmail } from "class-validator";

export class AuthCredential {
    
    @IsEmail()
    email: string;

    @MinLength(4)
    @MaxLength(16)
    password: string;
}