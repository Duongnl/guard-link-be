// npm i @nestjs/mongoose mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type FolderDocument = HydratedDocument<Folder>;




@Schema()
export class Folder {
    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    ownerId: mongoose.Schema.Types.ObjectId | User ;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null })
    parentId: mongoose.Schema.Types.ObjectId | null;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ type: String, default: null })
    pin: string | null;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;
}


export const FolderSchema = SchemaFactory.createForClass(Folder);