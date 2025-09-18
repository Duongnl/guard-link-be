import { PartialType } from '@nestjs/mapped-types';
import { CreateFolderDto } from './create-folder.dto';
import { IsNotEmpty } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class UpdateFolderNameDto  {
    
    @IsObjectId({ message: 'must be a valid MongoDB ObjectId' })
    _id: string;

    @IsNotEmpty()
    name:string;
}
