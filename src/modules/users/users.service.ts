import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { NewUser, UpdateUser } from 'src/graphql.schema';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async create(input: NewUser): Promise<User> {
    return this.prisma.user.create({
      data: input,
    });
  }

  async update(params: UpdateUser): Promise<User> {
    const { id, ...params_without_id } = params;

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}