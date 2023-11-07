import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "src/guards/strategy/jwt.strategy";
import { AuthService } from "./auth.service";
import { JwtConfig } from "src/guards/strategy/JwtConfig";
import { PrismaModule } from "src/database/prisma.module";
import { UsersService } from "../users/users.service";

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: JwtConfig.secret,
      signOptions: { expiresIn: "60m" },
    }),
  ],
  providers: [UsersService, AuthService, JwtStrategy],
  controllers: [],
  exports: []
})
export class AuthModule {}
