import {IsEmail, IsEmpty, IsString, IsStrongPassword} from "class-validator"
export class SignInDto{
    @IsEmail() 
    @IsEmpty()
    email : string;
    @IsString()
    @IsEmpty()
    password : string;
}