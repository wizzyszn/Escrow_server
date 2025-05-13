import {IsEmail, IsEmpty, IsNotEmpty, IsString, IsStrongPassword} from "class-validator"
export class SignInDto{
    @IsEmail() 
    @IsNotEmpty()
    email : string;
    @IsString()
    @IsNotEmpty()
    password : string;
}