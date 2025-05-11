import {PartialType} from "@nestjs/mapped-types"
import { CreateUsetDto } from "./create-user-dto";
export class UpdateUserDto extends PartialType(CreateUsetDto) {

}