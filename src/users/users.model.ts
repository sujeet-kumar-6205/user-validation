import { Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop()
    _id?: Types.ObjectId;

    @Prop({
        required: true,
        type: String
    })
    username: string;

    @Prop({
        required: true,
        type: String
    })
    password: string;

    @Prop({
        required: true,
        type: String
    })
    status: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
