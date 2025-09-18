import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Folder } from 'src/folders/schemas/folder.schema';

export type FolderDocument = HydratedDocument<Link>;

@Schema()
export class Link {
    @Prop()
    name: string;

    @Prop()
    url: string;

    @Prop()
    description: string;

    @Prop({ default: Date.now })
    updatedAt: Date;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop()
    tags: [string];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true })
    folderId: mongoose.Schema.Types.ObjectId | Folder;

}

export const LinkSchema = SchemaFactory.createForClass(Link);