import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class GuardModule {}
