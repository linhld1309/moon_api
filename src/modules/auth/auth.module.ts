import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AuthModule {}
