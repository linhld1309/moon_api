import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Mutation, Args, Subscription, Parent, ResolveField } from '@nestjs/graphql';
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PubSub } from 'graphql-subscriptions';
import { User, NewUser, UpdateUser, Movie, MSubscription, MovieParams, SubParams } from 'src/graphql.schema';
import { UsersService } from './users.service';
import { GqlAuthGuard } from 'src/guards';
import { SubscriptionsService } from "../subscriptions/subscriptions.service";
import { MoviesService } from "../movies/movies.service";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";

const pubSub = new PubSub();

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
@ApiTags("Users")
@ApiBearerAuth()
export class UsersResolvers {
  postsService: any;
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
    @Inject(MoviesService) private readonly moviesService: MoviesService,
    @Inject(SubscriptionsService) private readonly subsService: SubscriptionsService
  ) {}

  @Query(() => [User])
  @ApiOperation({ summary: "Get all list users" })
  async users() {
    const users = this.userService.findAll();
    return users;
  }

  @Query('user')
  @ApiOperation({ summary: "Get user find by id" })
  async user(@Args('id') args: User[`id`]): Promise<User | null> {
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

  @ResolveField(returns => [Movie])
  async movies(@Parent() user: User, @Args('input') args: MovieParams): Promise<Movie[]> {
    if (!user) throw new AppException(ErrorCode.E110001);

    const { userId } = user;
    return this.moviesService.findByQuery({
      // TODO fix problem
      ...args,
      documentedBy: userId
    });
  }

  @ResolveField(returns => [MSubscription])
  async subscriptions(@Parent() user: User, @Args('input') args: SubParams): Promise<MSubscription[]> {
    const { userId } = user;
    return this.subsService.findByQuery({ 
      // TODO fix problem
      ...args,
      userId: userId
    });
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }
}
