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
  JSON: any;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['String'];
  description: Scalars['String'];
  items: Array<MenuItem>;
  name: Scalars['String'];
};

export type CreateCategoryInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateMenuItemInput = {
  categoryId: Scalars['String'];
  description: Scalars['String'];
  imageID: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
};

export type CreateRestaurantInput = {
  contact?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  restaurantName: Scalars['String'];
};

export type CreateUserMutationResponse = {
  __typename?: 'CreateUserMutationResponse';
  restaurant?: Maybe<Restaurant>;
  user?: Maybe<User>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Menu = {
  __typename?: 'Menu';
  categories: Array<Category>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  description: Scalars['String'];
  imageID: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createItem: MenuItem;
  createRestaurant: Restaurant;
  createUser: CreateUserMutationResponse;
  login: Scalars['String'];
  updateFloorPlan: Restaurant;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateItemArgs = {
  input: CreateMenuItemInput;
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


export type MutationUpdateFloorPlanArgs = {
  newFloorPlan: Scalars['JSON'];
};

export type Query = {
  __typename?: 'Query';
  category: Category;
  getRestaurantMenu: Menu;
  me?: Maybe<User>;
  menu: Menu;
  myRestaurant?: Maybe<Restaurant>;
  restaurant?: Maybe<Restaurant>;
  restaurants: Array<Restaurant>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryGetRestaurantMenuArgs = {
  restaurantName: Scalars['String'];
};


export type QueryRestaurantArgs = {
  id: Scalars['String'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  _id: Scalars['String'];
  contact?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  floorPlan?: Maybe<Scalars['JSON']>;
  location?: Maybe<Scalars['String']>;
  menu?: Maybe<Menu>;
  name: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  email: Scalars['String'];
};

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', name: string, description: string } };

export type GetMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuQuery = { __typename?: 'Query', menu: { __typename?: 'Menu', categories: Array<{ __typename?: 'Category', _id: string, name: string, description: string, items: Array<{ __typename?: 'MenuItem', name: string, description: string, price: string, imageID: string }> }> } };

export type GetRestaurantMenuQueryVariables = Exact<{
  restaurantName: Scalars['String'];
}>;


export type GetRestaurantMenuQuery = { __typename?: 'Query', getRestaurantMenu: { __typename?: 'Menu', categories: Array<{ __typename?: 'Category', _id: string, name: string, description: string, items: Array<{ __typename?: 'MenuItem', name: string, description: string, price: string, imageID: string }> }> } };

export type CreateMenuItemMutationVariables = Exact<{
  input: CreateMenuItemInput;
}>;


export type CreateMenuItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'MenuItem', name: string, description: string, price: string, imageID: string } };

export type GetRestaurantQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRestaurantQuery = { __typename?: 'Query', restaurant?: { __typename?: 'Restaurant', name: string, email?: string | null, contact?: string | null, location?: string | null, floorPlan?: any | null } | null };

export type GetRestaurantsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRestaurantsQuery = { __typename?: 'Query', restaurants: Array<{ __typename?: 'Restaurant', name: string }> };

export type UpdateFloorPlanMutationVariables = Exact<{
  newFloorPlan: Scalars['JSON'];
}>;


export type UpdateFloorPlanMutation = { __typename?: 'Mutation', updateFloorPlan: { __typename?: 'Restaurant', floorPlan?: any | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserMutationResponse', user?: { __typename?: 'User', _id: string, email: string } | null, restaurant?: { __typename?: 'Restaurant', name: string } | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string } | null };

export type MyRestaurantQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRestaurantQuery = { __typename?: 'Query', myRestaurant?: { __typename?: 'Restaurant', name: string, location?: string | null, contact?: string | null, floorPlan?: any | null } | null };


export const CreateCategoryDocument = gql`
    mutation createCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    name
    description
  }
}
    `;
export const GetMenuDocument = gql`
    query getMenu {
  menu {
    categories {
      _id
      name
      description
      items {
        name
        description
        price
        imageID
      }
    }
  }
}
    `;
export const GetRestaurantMenuDocument = gql`
    query getRestaurantMenu($restaurantName: String!) {
  getRestaurantMenu(restaurantName: $restaurantName) {
    categories {
      _id
      name
      description
      items {
        name
        description
        price
        imageID
      }
    }
  }
}
    `;
export const CreateMenuItemDocument = gql`
    mutation createMenuItem($input: CreateMenuItemInput!) {
  createItem(input: $input) {
    name
    description
    price
    imageID
  }
}
    `;
export const GetRestaurantDocument = gql`
    query getRestaurant($id: String!) {
  restaurant(id: $id) {
    name
    email
    contact
    location
    floorPlan
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
export const UpdateFloorPlanDocument = gql`
    mutation updateFloorPlan($newFloorPlan: JSON!) {
  updateFloorPlan(newFloorPlan: $newFloorPlan) {
    floorPlan
  }
}
    `;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      _id
      email
    }
    restaurant {
      name
    }
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
export const MyRestaurantDocument = gql`
    query myRestaurant {
  myRestaurant {
    name
    location
    contact
    floorPlan
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createCategory(variables: CreateCategoryMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCategoryMutation>(CreateCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createCategory', 'mutation');
    },
    getMenu(variables?: GetMenuQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMenuQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMenuQuery>(GetMenuDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMenu', 'query');
    },
    getRestaurantMenu(variables: GetRestaurantMenuQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRestaurantMenuQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRestaurantMenuQuery>(GetRestaurantMenuDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRestaurantMenu', 'query');
    },
    createMenuItem(variables: CreateMenuItemMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateMenuItemMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMenuItemMutation>(CreateMenuItemDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createMenuItem', 'mutation');
    },
    getRestaurant(variables: GetRestaurantQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRestaurantQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRestaurantQuery>(GetRestaurantDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRestaurant', 'query');
    },
    getRestaurants(variables?: GetRestaurantsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRestaurantsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRestaurantsQuery>(GetRestaurantsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRestaurants', 'query');
    },
    updateFloorPlan(variables: UpdateFloorPlanMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateFloorPlanMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateFloorPlanMutation>(UpdateFloorPlanDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateFloorPlan', 'mutation');
    },
    createUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
    },
    currentUser(variables?: CurrentUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CurrentUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CurrentUserQuery>(CurrentUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'currentUser', 'query');
    },
    myRestaurant(variables?: MyRestaurantQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MyRestaurantQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MyRestaurantQuery>(MyRestaurantDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'myRestaurant', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;