import { Injectable, NotAcceptableException } from '@nestjs/common';
    import { UsersService } from 'src/users/users.service';
    import * as bcrypt from 'bcrypt';

    @Injectable()
    export class AuthService {
      constructor(private readonly usersService: UsersService) {}
      async validateUser(username: string, password: string): Promise<any> {
        let user = await this.usersService.getUserDetail({username : username});
        let passwordValid = await bcrypt.compare(password, user.data.password)
        if (!user) {
            throw new NotAcceptableException('could not find the user');
          }
        if (user && passwordValid) {
          return {
            userId: user.data._id,
            userName: user.data.username
          };
        }
        return null;
      }
    }