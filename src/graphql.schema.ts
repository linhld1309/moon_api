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
    accountActivated?: Nullable<boolean>;
    accessRole?: Nullable<string>;
    role?: Nullable<string>;
}

export class UpdateUser {
    id: number;
    userId: string;
    userName: string;
    email: string;
    accountActivated?: Nullable<boolean>;
    accessRole?: Nullable<string>;
    role?: Nullable<string>;
}

export class User {
    id: number;
    userId: string;
    userName: string;
    avatarUrl?: Nullable<string>;
    email: string;
    accountActivated?: Nullable<boolean>;
    accessRole?: Nullable<string>;
    role?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(input: NewUser): User | Promise<User>;

    abstract updateUser(input: UpdateUser): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
