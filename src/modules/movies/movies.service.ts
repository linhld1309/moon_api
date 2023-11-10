import { Injectable } from '@nestjs/common';
import { Movie, MovieParams } from 'src/graphql.schema';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
      },
    });
    return movie
  }

  async findAll(): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany({});
    return movies
  }

  async findByQuery(params: MovieParams): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany({
      where: params
    });

    return movies
  }
}
