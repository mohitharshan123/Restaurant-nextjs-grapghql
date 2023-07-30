import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateMenuInput = {
  items: Array<MenuItemInput>;
  restaurantId: Scalars['String'];
};

export type CreateRestaurantInput = {
  contact: Scalars['String'];
  email: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type GetMenuInput = {
  restaurantId: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Menu = {
  __typename?: 'Menu';
  items: Array<MenuItem>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
};

export type MenuItemInput = {
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMenu: Menu;
  createRestaurant: Restaurant;
  createUser: User;
  login: Scalars['String'];
};


export type MutationCreateMenuArgs = {
  input: CreateMenuInput;
};


export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  menu: Menu;
  restaurant?: Maybe<Restaurant>;
  restaurants: Array<Restaurant>;
};


export type QueryMenuArgs = {
  id: GetMenuInput;
};


export type QueryRestaurantArgs = {
  id: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id: Scalars['String'];
  contact: Scalars['String'];
  email: Scalars['String'];
  location: Scalars['String'];
  menu?: Maybe<Menu>;
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type GetRestaurantQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRestaurantQuery = { __typename?: 'Query', restaurant?: { __typename?: 'Restaurant', name: string, email: string, contact: string, location: string, menu?: { __typename?: 'Menu', items: Array<{ __typename?: 'MenuItem', name: string, description: string }> } | null } | null };

export type GetRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRestaurantsQuery = { __typename?: 'Query', restaurants: Array<{ __typename?: 'Restaurant', name: string }> };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, name: string, email: string } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string } | null };


export const GetRestaurantDocument = gql`
    query getRestaurant($id: String!) {
  restaurant(id: $id) {
    name
    email
    contact
    location
    menu {
      items {
        name
        description
      }
    }
  }
}
    `;
export const GetRestaurantsDocument = gql`
    query getRestaurants {
  restaurants {
    name
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    _id
    name
    email
  }
}
    `;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input)
}
    `;
export const CurrentUserDocument = gql`
    query currentUser {
  me {
    email
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getRestaurant(variables: GetRestaurantQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRestaurantQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRestaurantQuery>(GetRestaurantDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRestaurant', 'query');
    },
    getRestaurants(variables?: GetRestaurantsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRestaurantsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRestaurantsQuery>(GetRestaurantsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRestaurants', 'query');
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
    },
    currentUser(variables?: CurrentUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentUserQuery>(CurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'currentUser', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;