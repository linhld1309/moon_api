
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class MovieParams {
    id: number;
    movieId: string;
    title?: Nullable<string>;
    releaseDate?: Nullable<GraphQLTimestamp>;
    duration?: Nullable<GraphQLTimestamp>;
    synopsis?: Nullable<string>;
    posterUrl?: Nullable<string>;
    trailerUrl: string;
    documentedBy: string;
}

export class SubParams {
    id: number;
    subscriptionId: string;
    type?: Nullable<string>;
    description?: Nullable<string>;
    amount?: Nullable<number>;
    timeDurationAmount?: Nullable<number>;
    timeDurationUnit?: Nullable<string>;
}

export class UserSubParams {
    id: number;
    userId: string;
    subscriptionId: string;
}

export class NewUser {
    userId: string;
    userName: string;
    avatarUrl?: Nullable<string>;
    email: string;
    accountActivated?: Nullable<boolean>;
    role: string;
    password: string;
}

export class UpdateUser {
    id: number;
    userId: string;
    userName: string;
    avatarUrl?: Nullable<string>;
    email: string;
    accountActivated?: Nullable<boolean>;
    role: string;
}

export class LoginBody {
    userName: string;
    email: string;
    password: string;
}

export class AccessRole {
    id: number;
    roleType?: Nullable<string>;
    level?: Nullable<number>;
    description?: Nullable<string>;
    users?: Nullable<User[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
}

export class Movie {
    id: number;
    movieId: string;
    title?: Nullable<string>;
    releaseDate?: Nullable<GraphQLTimestamp>;
    duration?: Nullable<GraphQLTimestamp>;
    synopsis?: Nullable<string>;
    posterUrl?: Nullable<string>;
    trailerUrl: string;
    documentedBy: string;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
}

export class MSubscription {
    id: number;
    subscriptionId: string;
    type?: Nullable<string>;
    description?: Nullable<string>;
    amount?: Nullable<number>;
    timeDurationAmount?: Nullable<number>;
    timeDurationUnit?: Nullable<string>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
}

export class UserSubscription {
    id: number;
    userId: string;
    subscriptionId: string;
    startDate?: Nullable<GraphQLTimestamp>;
    endDate?: Nullable<GraphQLTimestamp>;
    subscriptionStatus?: Nullable<string>;
    expired?: Nullable<boolean>;
    expiredAt?: Nullable<GraphQLTimestamp>;
    canceledAt?: Nullable<GraphQLTimestamp>;
    suspendedAt?: Nullable<GraphQLTimestamp>;
    subscriptionAutoRenewal?: Nullable<boolean>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
}

export class User {
    id: number;
    userId: string;
    userName: string;
    avatarUrl?: Nullable<string>;
    email: string;
    accountActivated?: Nullable<boolean>;
    role: string;
    password: string;
    movies?: Nullable<Movie[]>;
    subscriptions?: Nullable<MSubscription[]>;
    createdAt?: Nullable<GraphQLTimestamp>;
    updatedAt?: Nullable<GraphQLTimestamp>;
}

export abstract class IQuery {
    abstract users(): Nullable<User[]> | Promise<Nullable<User[]>>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(input: NewUser): User | Promise<User>;

    abstract updateUser(input: UpdateUser): User | Promise<User>;

    abstract deleteUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export type GraphQLTimestamp = any;
type Nullable<T> = T | null;
