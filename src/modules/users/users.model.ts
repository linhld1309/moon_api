import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;
  userId: string;
  userName: string;
  avatarUrl: string;
  email: string;
  accountActivated: boolean;
  accessRole: string;
  role: string;
}
