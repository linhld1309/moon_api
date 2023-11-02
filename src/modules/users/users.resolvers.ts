import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { User } from 'src/graphql.schema';
import { UsersService } from './users.service';
import { PubSub } from 'graphql-subscriptions';
import { NewUser, UpdateUser } from 'src/graphql.schema';
import * as bcrypt from 'bcrypt';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolvers {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query('user')
  async post(@Args('id') args: User[`id`]): Promise<User | null> {
    return this.userService.findOne(args);
  }

  @Mutation('createUser')
  async create(@Args('input') args: NewUser): Promise<User> {
    args.password = await bcrypt.hash(args.password, 10);
    const createdUser = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation('updateUser')
  async update(@Args('input') args: UpdateUser): Promise<User> {
    return this.userService.update(args);
  }

  @Mutation('deleteUser')
  async delete(@Args('id') args: User[`id`]): Promise<User> {
    return this.userService.delete(args);
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
