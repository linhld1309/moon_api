import { Module } from '@nestjs/common';
import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { PrismaModule } from '../../database/prisma.module';
import { MoviesService } from '../movies/movies.service';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Module({
  providers: [UsersResolvers, UsersService, MoviesService, SubscriptionsService],
  imports: [PrismaModule],
})
export class UsersModule {}
