import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ResetPasswordConfirmationDto {
    @Length(5, 2000)
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}