import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { User } from 'src/graphql.schema';
import { UsersService } from './users.service';
import { PubSub } from 'graphql-subscriptions';
import { NewUser, UpdateUser } from 'src/graphql.schema';
import * as bcrypt from 'bcrypt';
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { GqlAuthGuard } from 'src/guards';

const pubSub = new PubSub();

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
@ApiTags("Users")
@ApiBearerAuth()
export class UsersResolvers {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User])
  @ApiOperation({ summary: "Get all list users" })
  async users() {
    const users = this.userService.findAll();
    return users;
  }

  @Query('user')
  @ApiOperation({ summary: "Get user find by id" })
  async post(@Args('id') args: User[`id`]): Promise<User | null> {
    return this.userService.findOne(args);
  }

  @Mutation('createUser')
  @ApiOperation({ summary: "Register User" })
  async create(@Args('input') args: NewUser): Promise<User> {
    args.password = await bcrypt.hash(args.password, 10);
    const createdUser = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation('updateUser')
  @ApiOperation({ summary: "Update User" })
  async update(@Args('input') args: UpdateUser): Promise<User> {
    return this.userService.update(args);
  }

  @Mutation('deleteUser')
  @ApiOperation({ summary: "Delete User" })
  async delete(@Args('id') args: User[`id`]): Promise<User> {
    return this.userService.delete(args);
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
