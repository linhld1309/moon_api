import { Injectable } from '@nestjs/common';
import { MSubscription, SubParams, UserSubscription, UserSubParams } from 'src/graphql.schema';
import { PrismaService } from '../../database/prisma.service';
import { AppException } from 'src/core/exceptions';
import { ErrorCode } from 'src/enums';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<MSubscription | null> {
    const subscription = await this.prisma.subscription.findUnique({
      where: {
        id,
      },
    });
    return subscription
  }

  async findAll(): Promise<MSubscription[]> {
    const subscriptions = await this.prisma.subscription.findMany({});
    return subscriptions
  }

  async findByQuery<T extends SubParams | undefined>(params: T): Promise<MSubscription[]> {
    const userSub = await this.findOneSub(params);
    if (!userSub) throw new AppException(ErrorCode.E110001); // TODO fix
    const { subscriptionId } = userSub

    const subscriptions = await this.prisma.subscription.findMany({
      where: {
        subscriptionId
      },
    });

    return subscriptions
  }

  async findOneSub(params: any): Promise<any> {
    const { userId } = params
    // TODO fix bug
    const queryGetUserSub = `SELECT * from public."UserSubscriptionPlan" as us JOIN public."User" as u ON u."userId" = us."userId" WHERE u."userId" = ?`
    const userSub = await this.prisma.$queryRawUnsafe(queryGetUserSub, userId)
    
    return userSub
  }
}
