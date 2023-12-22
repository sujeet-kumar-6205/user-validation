import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from 'src/local.strategy';
import { PassportModule } from "@nestjs/passport"
import { SessionSerializer } from './session.serializer';

@Module({
    imports: [UsersModule, PassportModule.register({ session: true })],
    providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModuleTsModule {}
