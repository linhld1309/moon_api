/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class NewUser {
  title: string;
  text: string;
}

export class UpdateUser {
  id: number;
  title?: Nullable<string>;
  text?: Nullable<string>;
  isPublished?: Nullable<boolean>;
}

export class User {
  id: number;
  title: string;
  text: string;
  isPublished: boolean;
}

export abstract class IQuery {
  abstract posts(): User[] | Promise<User[]>;

  abstract post(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
  abstract createPost(input: NewUser): User | Promise<User>;

  abstract updatePost(
    input: UpdateUser,
  ): Nullable<User> | Promise<Nullable<User>>;

  abstract deletePost(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
  abstract postCreated(): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
