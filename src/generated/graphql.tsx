import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Bundle = {
  __typename?: 'Bundle';
  id: Scalars['String'];
  name: Scalars['String'];
  highlightColor: Scalars['String'];
  imageUri: Scalars['String'];
  color: Scalars['String'];
  totalNumberOfItems: Scalars['Int'];
  visits: Scalars['Int'];
  wallpapers?: Maybe<Array<Maybe<Wallpaper>>>;
};

export type BundleCreateInput = {
  name: Scalars['String'];
  imageUri: Scalars['String'];
  highlightColor?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUri: Scalars['String'];
  totalNumberOfItems: Scalars['Int'];
  visits: Scalars['Int'];
  wallpapers?: Maybe<Array<Maybe<Wallpaper>>>;
};

export type CategoryCreateInput = {
  name: Scalars['String'];
  imageUri: Scalars['String'];
};

export type Color = {
  __typename?: 'Color';
  id: Scalars['String'];
  name: Scalars['String'];
  code: Scalars['String'];
  wallpapers?: Maybe<Array<Maybe<Wallpaper>>>;
  visits: Scalars['Int'];
  totalNumberOfItems: Scalars['Int'];
};

export type ColorCreateInput = {
  name: Scalars['String'];
  code: Scalars['String'];
};


export type HotSearchTerm = {
  __typename?: 'HotSearchTerm';
  term: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createWallpaper: Wallpaper;
  createUser: UserCreateResponse;
  createCategory: Category;
  createBundle: Bundle;
  createTag: Tag;
  createColor: Color;
  signIn: UserSignInResponse;
  addToFavourite?: Maybe<Wallpaper>;
  singleUpload?: Maybe<Scalars['String']>;
};


export type MutationCreateWallpaperArgs = {
  data?: Maybe<WallpaperCreateInput>;
};


export type MutationCreateUserArgs = {
  data?: Maybe<UserCreateInput>;
};


export type MutationCreateCategoryArgs = {
  data?: Maybe<CategoryCreateInput>;
};


export type MutationCreateBundleArgs = {
  data?: Maybe<BundleCreateInput>;
};


export type MutationCreateTagArgs = {
  data?: Maybe<TagCreateInput>;
};


export type MutationCreateColorArgs = {
  data?: Maybe<ColorCreateInput>;
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAddToFavouriteArgs = {
  id: Scalars['String'];
};


export type MutationSingleUploadArgs = {
  data: SingleUploadInput;
};

export type PageQuery = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  trending: Array<Maybe<Wallpaper>>;
  bundles: Array<Maybe<Bundle>>;
  categories: Array<Maybe<Category>>;
  wallpaper: Wallpaper;
  wallpapers: Array<Maybe<Wallpaper>>;
  recommended: Array<Maybe<Wallpaper>>;
  search: SearchResult;
  colors: Array<Maybe<Color>>;
  hotSearches: Array<Maybe<HotSearchTerm>>;
  getUserInfo?: Maybe<User>;
};


export type QueryBundlesArgs = {
  bundleId?: Maybe<Scalars['String']>;
  page: PageQuery;
};


export type QueryCategoriesArgs = {
  categoryId?: Maybe<Scalars['String']>;
  page: PageQuery;
};


export type QueryWallpaperArgs = {
  wallpaperId: Scalars['String'];
};


export type QueryWallpapersArgs = {
  data: WallpaperQueryInput;
  page: PageQuery;
};


export type QuerySearchArgs = {
  searchText: Scalars['String'];
};


export type QueryColorsArgs = {
  page: PageQuery;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  wallpapers: Array<Maybe<Wallpaper>>;
};

export type SingleUploadInput = {
  file: Scalars['Upload'];
  wallpaper?: Maybe<Scalars['Boolean']>;
  bundle?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Scalars['Boolean']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
  totalNumberOfItems: Scalars['Int'];
  visits: Scalars['Int'];
  wallpapers: Array<Maybe<Wallpaper>>;
};

export type TagCreateInput = {
  name: Scalars['String'];
};

export type TrendingWallpaper = {
  __typename?: 'TrendingWallpaper';
  id: Scalars['String'];
  downloads: Scalars['Int'];
  wallpaper: Wallpaper;
};


export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  fullName: Scalars['String'];
  email: Scalars['String'];
  favourites: Array<Maybe<Wallpaper>>;
  recentSearches: Array<Maybe<Scalars['String']>>;
};

export type UserCreateError = {
  __typename?: 'UserCreateError';
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserCreateResponse = {
  __typename?: 'UserCreateResponse';
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<UserCreateError>;
};

export type UserInfo = {
  __typename?: 'UserInfo';
  info?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
  isVerified: Scalars['Boolean'];
};

export type UserSignInResponse = {
  __typename?: 'UserSignInResponse';
  token?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type Wallpaper = {
  __typename?: 'Wallpaper';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUri: Scalars['String'];
  color: Color;
  bundle: Bundle;
  height: Scalars['Int'];
  width: Scalars['Int'];
  sizeInKB: Scalars['Int'];
  tags: Array<Maybe<Tag>>;
  publisher: Scalars['String'];
  createdAt: Scalars['DateTime'];
  likes: Scalars['Int'];
  downloads: Scalars['Int'];
  category: Category;
  highlightColor: Scalars['String'];
  favouriteOf: Array<Maybe<User>>;
  isUsersFavourite: Scalars['Boolean'];
};

export type WallpaperCreateInput = {
  name: Scalars['String'];
  imageUri: Scalars['String'];
  bundleId: Scalars['String'];
  height: Scalars['Int'];
  width: Scalars['Int'];
  sizeInKB: Scalars['Int'];
  tagsId: Array<Maybe<Scalars['String']>>;
  publisher: Scalars['String'];
  likes: Scalars['Int'];
  downloads: Scalars['Int'];
  categoryId: Scalars['String'];
  highlightColor?: Maybe<Scalars['String']>;
  colorId: Scalars['String'];
};

export type WallpaperQueryInput = {
  colorId?: Maybe<Scalars['String']>;
  tagsId?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  bundleId?: Maybe<Scalars['String']>;
};

export type TrendingQueryVariables = Exact<{ [key: string]: never; }>;


export type TrendingQuery = (
  { __typename?: 'Query' }
  & { trending: Array<Maybe<(
    { __typename?: 'Wallpaper' }
    & Pick<Wallpaper, 'id' | 'name' | 'imageUri' | 'sizeInKB' | 'downloads' | 'height' | 'width' | 'likes' | 'publisher' | 'createdAt' | 'isUsersFavourite'>
  )>> }
);

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'imageUri'>
  )>> }
);

export type BundlesScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type BundlesScreenQuery = (
  { __typename?: 'Query' }
  & { bundles: Array<Maybe<(
    { __typename?: 'Bundle' }
    & Pick<Bundle, 'id' | 'name' | 'highlightColor' | 'color' | 'imageUri'>
  )>> }
);

export type CategoriesDataQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesDataQuery = (
  { __typename?: 'Query' }
  & { categories: Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'imageUri' | 'totalNumberOfItems' | 'visits'>
  )>> }
);

export type GetUserFavouritesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFavouritesQuery = (
  { __typename?: 'Query' }
  & { getUserInfo?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { favourites: Array<Maybe<(
      { __typename?: 'Wallpaper' }
      & Pick<Wallpaper, 'name' | 'imageUri' | 'isUsersFavourite' | 'id' | 'likes' | 'downloads' | 'highlightColor'>
      & { color: (
        { __typename?: 'Color' }
        & Pick<Color, 'id' | 'name' | 'code'>
      ), bundle: (
        { __typename?: 'Bundle' }
        & Pick<Bundle, 'id' | 'name'>
      ), tags: Array<Maybe<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'name' | 'id'>
      )>>, category: (
        { __typename?: 'Category' }
        & Pick<Category, 'name' | 'id' | 'imageUri'>
      ) }
    )>> }
  )> }
);

export type HomeScreenQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeScreenQuery = (
  { __typename?: 'Query' }
  & { trending: Array<Maybe<(
    { __typename?: 'Wallpaper' }
    & Pick<Wallpaper, 'id' | 'name' | 'imageUri'>
    & { bundle: (
      { __typename?: 'Bundle' }
      & Pick<Bundle, 'id'>
    ), category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id'>
    ) }
  )>>, categories: Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'imageUri' | 'totalNumberOfItems' | 'visits'>
  )>>, bundles: Array<Maybe<(
    { __typename?: 'Bundle' }
    & Pick<Bundle, 'id' | 'imageUri' | 'name' | 'highlightColor' | 'totalNumberOfItems' | 'color'>
  )>> }
);

export type SearchTextStringQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type SearchTextStringQuery = (
  { __typename?: 'Query' }
  & { search: (
    { __typename?: 'SearchResult' }
    & { wallpapers: Array<Maybe<(
      { __typename?: 'Wallpaper' }
      & Pick<Wallpaper, 'name' | 'imageUri' | 'downloads' | 'id'>
      & { tags: Array<Maybe<(
        { __typename?: 'Tag' }
        & Pick<Tag, 'name' | 'id'>
      )>> }
    )>> }
  ) }
);

export type ExtrasDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ExtrasDataQuery = (
  { __typename?: 'Query' }
  & { colors: Array<Maybe<(
    { __typename?: 'Color' }
    & Pick<Color, 'id' | 'name' | 'code' | 'visits' | 'totalNumberOfItems'>
  )>>, hotSearches: Array<Maybe<(
    { __typename?: 'HotSearchTerm' }
    & Pick<HotSearchTerm, 'term'>
  )>> }
);

export type RecommendedQueryVariables = Exact<{ [key: string]: never; }>;


export type RecommendedQuery = (
  { __typename?: 'Query' }
  & { recommended: Array<Maybe<(
    { __typename?: 'Wallpaper' }
    & Pick<Wallpaper, 'name' | 'imageUri' | 'downloads' | 'id'>
  )>> }
);

export type WallpapersQueryVariables = Exact<{
  bundleId?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  tagsId?: Maybe<Scalars['String']>;
  colorId?: Maybe<Scalars['String']>;
}>;


export type WallpapersQuery = (
  { __typename?: 'Query' }
  & { wallpapers: Array<Maybe<(
    { __typename?: 'Wallpaper' }
    & Pick<Wallpaper, 'name' | 'imageUri' | 'downloads' | 'isUsersFavourite' | 'id' | 'sizeInKB' | 'height' | 'width'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'name' | 'id'>
    ), tags: Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name' | 'id'>
    )>> }
  )>> }
);

export type AddToFavouriteMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type AddToFavouriteMutation = (
  { __typename?: 'Mutation' }
  & { addToFavourite?: Maybe<(
    { __typename?: 'Wallpaper' }
    & Pick<Wallpaper, 'name' | 'imageUri' | 'downloads' | 'isUsersFavourite' | 'id' | 'sizeInKB' | 'height' | 'width'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'name' | 'id'>
    ), tags: Array<Maybe<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'name' | 'id'>
    )>> }
  )> }
);

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = (
  { __typename?: 'Query' }
  & { getUserInfo?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'fullName' | 'email'>
  )> }
);

export type CreateUserMutationVariables = Exact<{
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserCreateResponse' }
    & Pick<UserCreateResponse, 'token'>
    & { errors?: Maybe<(
      { __typename?: 'UserCreateError' }
      & Pick<UserCreateError, 'fullName' | 'email' | 'password'>
    )> }
  ) }
);

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn: (
    { __typename?: 'UserSignInResponse' }
    & Pick<UserSignInResponse, 'token' | 'error'>
  ) }
);


export const TrendingDocument = gql`
    query trending {
  trending {
    id
    name
    imageUri
    sizeInKB
    downloads
    height
    width
    likes
    publisher
    createdAt
    isUsersFavourite
  }
}
    `;

/**
 * __useTrendingQuery__
 *
 * To run a query within a React component, call `useTrendingQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrendingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrendingQuery({
 *   variables: {
 *   },
 * });
 */
export function useTrendingQuery(baseOptions?: Apollo.QueryHookOptions<TrendingQuery, TrendingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrendingQuery, TrendingQueryVariables>(TrendingDocument, options);
      }
export function useTrendingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrendingQuery, TrendingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrendingQuery, TrendingQueryVariables>(TrendingDocument, options);
        }
export type TrendingQueryHookResult = ReturnType<typeof useTrendingQuery>;
export type TrendingLazyQueryHookResult = ReturnType<typeof useTrendingLazyQuery>;
export type TrendingQueryResult = Apollo.QueryResult<TrendingQuery, TrendingQueryVariables>;
export const CategoriesDocument = gql`
    query categories {
  categories(page: {}) {
    id
    name
    imageUri
  }
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesQueryResult = Apollo.QueryResult<CategoriesQuery, CategoriesQueryVariables>;
export const BundlesScreenDocument = gql`
    query BundlesScreen {
  bundles(page: {take: 50}) {
    id
    name
    highlightColor
    color
    imageUri
  }
}
    `;

/**
 * __useBundlesScreenQuery__
 *
 * To run a query within a React component, call `useBundlesScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useBundlesScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBundlesScreenQuery({
 *   variables: {
 *   },
 * });
 */
export function useBundlesScreenQuery(baseOptions?: Apollo.QueryHookOptions<BundlesScreenQuery, BundlesScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BundlesScreenQuery, BundlesScreenQueryVariables>(BundlesScreenDocument, options);
      }
export function useBundlesScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BundlesScreenQuery, BundlesScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BundlesScreenQuery, BundlesScreenQueryVariables>(BundlesScreenDocument, options);
        }
export type BundlesScreenQueryHookResult = ReturnType<typeof useBundlesScreenQuery>;
export type BundlesScreenLazyQueryHookResult = ReturnType<typeof useBundlesScreenLazyQuery>;
export type BundlesScreenQueryResult = Apollo.QueryResult<BundlesScreenQuery, BundlesScreenQueryVariables>;
export const CategoriesDataDocument = gql`
    query CategoriesData {
  categories(page: {take: 50}) {
    id
    name
    imageUri
    totalNumberOfItems
    visits
  }
}
    `;

/**
 * __useCategoriesDataQuery__
 *
 * To run a query within a React component, call `useCategoriesDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesDataQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesDataQuery, CategoriesDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoriesDataQuery, CategoriesDataQueryVariables>(CategoriesDataDocument, options);
      }
export function useCategoriesDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesDataQuery, CategoriesDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoriesDataQuery, CategoriesDataQueryVariables>(CategoriesDataDocument, options);
        }
export type CategoriesDataQueryHookResult = ReturnType<typeof useCategoriesDataQuery>;
export type CategoriesDataLazyQueryHookResult = ReturnType<typeof useCategoriesDataLazyQuery>;
export type CategoriesDataQueryResult = Apollo.QueryResult<CategoriesDataQuery, CategoriesDataQueryVariables>;
export const GetUserFavouritesDocument = gql`
    query GetUserFavourites {
  getUserInfo {
    id
    favourites {
      name
      imageUri
      isUsersFavourite
      id
      color {
        id
        name
        code
      }
      bundle {
        id
        name
      }
      tags {
        name
        id
      }
      likes
      downloads
      category {
        name
        id
        imageUri
      }
      highlightColor
    }
  }
}
    `;

/**
 * __useGetUserFavouritesQuery__
 *
 * To run a query within a React component, call `useGetUserFavouritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFavouritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFavouritesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserFavouritesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFavouritesQuery, GetUserFavouritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFavouritesQuery, GetUserFavouritesQueryVariables>(GetUserFavouritesDocument, options);
      }
export function useGetUserFavouritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFavouritesQuery, GetUserFavouritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFavouritesQuery, GetUserFavouritesQueryVariables>(GetUserFavouritesDocument, options);
        }
export type GetUserFavouritesQueryHookResult = ReturnType<typeof useGetUserFavouritesQuery>;
export type GetUserFavouritesLazyQueryHookResult = ReturnType<typeof useGetUserFavouritesLazyQuery>;
export type GetUserFavouritesQueryResult = Apollo.QueryResult<GetUserFavouritesQuery, GetUserFavouritesQueryVariables>;
export const HomeScreenDocument = gql`
    query HomeScreen {
  trending {
    id
    name
    imageUri
    bundle {
      id
    }
    category {
      id
    }
  }
  categories(page: {}) {
    id
    name
    imageUri
    totalNumberOfItems
    visits
  }
  bundles(page: {}) {
    id
    imageUri
    name
    highlightColor
    totalNumberOfItems
    color
  }
}
    `;

/**
 * __useHomeScreenQuery__
 *
 * To run a query within a React component, call `useHomeScreenQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeScreenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeScreenQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeScreenQuery(baseOptions?: Apollo.QueryHookOptions<HomeScreenQuery, HomeScreenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeScreenQuery, HomeScreenQueryVariables>(HomeScreenDocument, options);
      }
export function useHomeScreenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeScreenQuery, HomeScreenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeScreenQuery, HomeScreenQueryVariables>(HomeScreenDocument, options);
        }
export type HomeScreenQueryHookResult = ReturnType<typeof useHomeScreenQuery>;
export type HomeScreenLazyQueryHookResult = ReturnType<typeof useHomeScreenLazyQuery>;
export type HomeScreenQueryResult = Apollo.QueryResult<HomeScreenQuery, HomeScreenQueryVariables>;
export const SearchTextStringDocument = gql`
    query SearchTextString($searchText: String!) {
  search(searchText: $searchText) {
    wallpapers {
      name
      imageUri
      downloads
      tags {
        name
        id
      }
      id
    }
  }
}
    `;

/**
 * __useSearchTextStringQuery__
 *
 * To run a query within a React component, call `useSearchTextStringQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTextStringQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTextStringQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useSearchTextStringQuery(baseOptions: Apollo.QueryHookOptions<SearchTextStringQuery, SearchTextStringQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTextStringQuery, SearchTextStringQueryVariables>(SearchTextStringDocument, options);
      }
export function useSearchTextStringLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTextStringQuery, SearchTextStringQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTextStringQuery, SearchTextStringQueryVariables>(SearchTextStringDocument, options);
        }
export type SearchTextStringQueryHookResult = ReturnType<typeof useSearchTextStringQuery>;
export type SearchTextStringLazyQueryHookResult = ReturnType<typeof useSearchTextStringLazyQuery>;
export type SearchTextStringQueryResult = Apollo.QueryResult<SearchTextStringQuery, SearchTextStringQueryVariables>;
export const ExtrasDataDocument = gql`
    query ExtrasData {
  colors(page: {take: 5}) {
    id
    name
    code
    visits
    totalNumberOfItems
  }
  hotSearches {
    term
  }
}
    `;

/**
 * __useExtrasDataQuery__
 *
 * To run a query within a React component, call `useExtrasDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtrasDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtrasDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useExtrasDataQuery(baseOptions?: Apollo.QueryHookOptions<ExtrasDataQuery, ExtrasDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExtrasDataQuery, ExtrasDataQueryVariables>(ExtrasDataDocument, options);
      }
export function useExtrasDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExtrasDataQuery, ExtrasDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExtrasDataQuery, ExtrasDataQueryVariables>(ExtrasDataDocument, options);
        }
export type ExtrasDataQueryHookResult = ReturnType<typeof useExtrasDataQuery>;
export type ExtrasDataLazyQueryHookResult = ReturnType<typeof useExtrasDataLazyQuery>;
export type ExtrasDataQueryResult = Apollo.QueryResult<ExtrasDataQuery, ExtrasDataQueryVariables>;
export const RecommendedDocument = gql`
    query Recommended {
  recommended {
    name
    imageUri
    downloads
    id
  }
}
    `;

/**
 * __useRecommendedQuery__
 *
 * To run a query within a React component, call `useRecommendedQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendedQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecommendedQuery(baseOptions?: Apollo.QueryHookOptions<RecommendedQuery, RecommendedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendedQuery, RecommendedQueryVariables>(RecommendedDocument, options);
      }
export function useRecommendedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendedQuery, RecommendedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendedQuery, RecommendedQueryVariables>(RecommendedDocument, options);
        }
export type RecommendedQueryHookResult = ReturnType<typeof useRecommendedQuery>;
export type RecommendedLazyQueryHookResult = ReturnType<typeof useRecommendedLazyQuery>;
export type RecommendedQueryResult = Apollo.QueryResult<RecommendedQuery, RecommendedQueryVariables>;
export const WallpapersDocument = gql`
    query wallpapers($bundleId: String, $categoryId: String, $tagsId: String, $colorId: String) {
  wallpapers(
    data: {bundleId: $bundleId, categoryId: $categoryId, tagsId: $tagsId, colorId: $colorId}
    page: {take: 20}
  ) {
    name
    imageUri
    downloads
    isUsersFavourite
    id
    sizeInKB
    height
    width
    category {
      name
      id
    }
    tags {
      name
      id
    }
  }
}
    `;

/**
 * __useWallpapersQuery__
 *
 * To run a query within a React component, call `useWallpapersQuery` and pass it any options that fit your needs.
 * When your component renders, `useWallpapersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWallpapersQuery({
 *   variables: {
 *      bundleId: // value for 'bundleId'
 *      categoryId: // value for 'categoryId'
 *      tagsId: // value for 'tagsId'
 *      colorId: // value for 'colorId'
 *   },
 * });
 */
export function useWallpapersQuery(baseOptions?: Apollo.QueryHookOptions<WallpapersQuery, WallpapersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WallpapersQuery, WallpapersQueryVariables>(WallpapersDocument, options);
      }
export function useWallpapersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WallpapersQuery, WallpapersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WallpapersQuery, WallpapersQueryVariables>(WallpapersDocument, options);
        }
export type WallpapersQueryHookResult = ReturnType<typeof useWallpapersQuery>;
export type WallpapersLazyQueryHookResult = ReturnType<typeof useWallpapersLazyQuery>;
export type WallpapersQueryResult = Apollo.QueryResult<WallpapersQuery, WallpapersQueryVariables>;
export const AddToFavouriteDocument = gql`
    mutation AddToFavourite($id: String!) {
  addToFavourite(id: $id) {
    name
    imageUri
    downloads
    isUsersFavourite
    id
    sizeInKB
    height
    width
    category {
      name
      id
    }
    tags {
      name
      id
    }
  }
}
    `;
export type AddToFavouriteMutationFn = Apollo.MutationFunction<AddToFavouriteMutation, AddToFavouriteMutationVariables>;

/**
 * __useAddToFavouriteMutation__
 *
 * To run a mutation, you first call `useAddToFavouriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToFavouriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToFavouriteMutation, { data, loading, error }] = useAddToFavouriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddToFavouriteMutation(baseOptions?: Apollo.MutationHookOptions<AddToFavouriteMutation, AddToFavouriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToFavouriteMutation, AddToFavouriteMutationVariables>(AddToFavouriteDocument, options);
      }
export type AddToFavouriteMutationHookResult = ReturnType<typeof useAddToFavouriteMutation>;
export type AddToFavouriteMutationResult = Apollo.MutationResult<AddToFavouriteMutation>;
export type AddToFavouriteMutationOptions = Apollo.BaseMutationOptions<AddToFavouriteMutation, AddToFavouriteMutationVariables>;
export const GetUserInfoDocument = gql`
    query GetUserInfo {
  getUserInfo {
    id
    fullName
    email
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($fullName: String!, $email: String!, $password: String!) {
  createUser(data: {fullName: $fullName, email: $email, password: $password}) {
    token
    errors {
      fullName
      email
      password
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      fullName: // value for 'fullName'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($email: String!, $password: String!) {
  signIn(email: $email, password: $password) {
    token
    error
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    