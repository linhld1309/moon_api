import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { User } from './users.model';
import { UsersService } from './users.service';
import { PubSub } from 'graphql-subscriptions';
import { NewUser, UpdateUser } from 'src/graphql.schema';

const pubSub = new PubSub();

@Resolver(() => User)
export class UsersResolvers {
  constructor(private readonly userService: UsersService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query('user')
  async post(@Args('id') args: number): Promise<User> {
    return this.userService.findOne(args);
  }

  @Mutation('createPost')
  async create(@Args('input') args: NewUser): Promise<User> {
    const createdPost = await this.userService.create(args);
    pubSub.publish('userCreated', { userCreated: createdPost });
    return createdPost;
  }

  @Mutation('updateUser')
  async update(@Args('input') args: UpdateUser): Promise<User> {
    return this.userService.update(args);
  }

  @Mutation('deleteUser')
  async delete(@Args('id') args: number): Promise<User> {
    return this.userService.delete(args);
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
