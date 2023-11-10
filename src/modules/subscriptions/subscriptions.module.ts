import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  providers: [SubscriptionsService],
  imports: [PrismaModule],
})
export class SubscriptionsModule {}
