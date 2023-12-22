import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {

    constructor(@InjectModel('user') private readonly userModel: Model<User>) { }
    async createUser(@Body() data) {
        try {
            if (!data.username) {
                throw new HttpException({ message: "userId is required" }, HttpStatus.BAD_REQUEST);
            }

            if (!data.password) {
                throw new HttpException({ message: "password is required" }, HttpStatus.BAD_REQUEST);
            }
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
            const newUser = new this.userModel({
                username: data.username,
                password: hashedPassword,
            });

            await newUser.save();
            return {
                msg: 'User successfully registered',
                data: newUser
            };;
        }
        catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }

    async getUserDetail(params) {
        try {
            let userId = params.userId;
            if (!userId) {
                throw new HttpException({ message: "userId is required" }, HttpStatus.BAD_REQUEST);
            }
            let user = await this.userModel.findOne({ _id: userId, status: "Active" });
            return {
                msg: 'User successfully fetched',
                data: user
            };;
        }
        catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUser(params) {
        try {
            let userId = params.userId;
            if (!userId) {
                throw new HttpException({ message: "userId is required" }, HttpStatus.BAD_REQUEST);
            }
            let user = await this.userModel.findOne({ _id: userId, status: "Active" }, { status: "Inactive" });
            return {
                msg: 'User successfully deleted',
                data: user
            };;;
        }
        catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }

    async updateUser(params, data) {
        try {
            let userId = params.userId;
            if (!userId) {
                throw new HttpException({ message: "userId is required" }, HttpStatus.BAD_REQUEST);
            }
            await this.userModel.findOneAndUpdate({ _id: userId, status: "Active" }, data);
            return {
                msg: 'User successfully updated',
            };
        }
        catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }
}
