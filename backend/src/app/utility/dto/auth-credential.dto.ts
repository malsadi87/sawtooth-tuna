import { IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class AuthCredential {
    
    @IsString()
    @MinLength(4)
    @MaxLength(25)
    email: string;

    @MinLength(4)
    @MaxLength(16)
    password: string;
}