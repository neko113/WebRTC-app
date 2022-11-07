import { Module } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './authl.controller';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, AuthService],
})
export class AuthModule {}
