import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local-auth-guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
@Controller('users')
export class UsersController {
    constructor(private userservice: UsersService) { }

    @Post("")
    async createUser(@Body() data) {
        try {
            return this.userservice.createUser(data);
        }
        catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(LocalAuthGuard)
    @Get("/:userId")
    async getUser(@Param() params) {
        try {
            return this.userservice.getUserDetail(params);
        }
        catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete("/:userId")
    async deleteUser(@Param() params) {
        try {
            return this.userservice.deleteUser(params);
        }
        catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }

    @Put("/:userId")
    async updateUser(@Param() params, @Body() data) {
        try {
            return this.userservice.updateUser(params, data);
        }
        catch (err) {
            throw new HttpException({ message: err }, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return {
            User: req.user,
            msg: 'User logged in'
        };
    }

    // protected
    @UseGuards(AuthenticatedGuard)
    @Get('/protected')
    getHello(@Request() req): string {
        return req.user;
    }

    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }
}
