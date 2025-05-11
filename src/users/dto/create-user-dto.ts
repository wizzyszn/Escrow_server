import {IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator"
export class CreateUsetDto {
    @IsString()
    @IsNotEmpty()
    name : string;
    @IsEmail()
    email :string;
    @IsEnum([ "INTERN" , "ADMIN" , "ENGINEER"], {
        message : 'Provide a valid email'
    })
    role : "INTERN" | "ADMIN" | "ENGINEER"
}