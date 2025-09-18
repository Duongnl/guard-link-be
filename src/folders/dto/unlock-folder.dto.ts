import { Matches } from "class-validator";
import { IsObjectId } from "class-validator-mongo-object-id";

export class UnlockFolderDto {

    @IsObjectId({ message: 'must be a valid MongoDB ObjectId' })
    _id:string;

    @Matches(/^\d{6}$/, { message: 'PIN must be exactly 6 digits' })
    pin:string
}