import { IsOptional, Length, IsString, IsBoolean, IsUUID, isString, IsEmail } from 'class-validator';

export class UserCreationDto {
	@IsString() @Length(5, 2000) fullName: string;

	@IsString() @IsEmail() @Length(5, 256) email: string;

    @Length(5, 2000) password: string;

	// @IsString() @Length(1, 20) phone: string;

	// @IsOptional() registration_status: boolean | null;

	// @IsOptional() @Length(1, 80) company_name: string | null;

	// @IsOptional() unit_farenheit: boolean | null;

	// @IsOptional() unit_twelve_hour: boolean | null;

	// @IsOptional() unit_gallons: boolean | null;

	// @IsUUID('all') org_id: string;

	// @IsBoolean() org_admin_flag: boolean;

	// @IsBoolean() billing_flag: boolean;

	// @IsBoolean() add_property_flag: boolean;
}