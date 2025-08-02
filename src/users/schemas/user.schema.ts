
// npm i @nestjs/mongoose mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop()
    name: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop({default:true})
    isActive: boolean;

    @Prop({ default: Date.now })
    createdAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);