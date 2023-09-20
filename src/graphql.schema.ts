/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewUser {
  userId: string;
  userName: string;
  email: string;
}

export class UpdateUser {
  id: number;
  userName?: Nullable<string>;
  email?: Nullable<string>;
  accountActivated?: Nullable<boolean>;
}

export class User {
  id: number;
  userName: string;
  email: string;
  accountActivated: Nullable<boolean>;
}

export abstract class IQuery {
  abstract users(): User[] | Promise<User[]>;

  abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
  abstract createUser(input: NewUser): User | Promise<User>;

  abstract updateUser(
    input: UpdateUser,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract deleteUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
  abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
