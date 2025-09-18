import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, Matches, ValidateNested } from "class-validator";


export class CreateFolderDto {

    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsMongoId({ message: 'must be a valid MongoDB ObjectId' })
    parentId?: string;

    @IsOptional()
    @Matches(/^\d{6}$/, { message: 'PIN must be exactly 6 digits' })
    pin?: string;
}
