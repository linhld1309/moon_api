import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  providers: [MoviesService],
  imports: [PrismaModule],
})
export class MoviesModule {}
