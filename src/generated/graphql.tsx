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
};

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUri: Scalars['String'];
  highlightColor: Scalars['String'];
  wallpapers?: Maybe<Array<Maybe<Wallpaper>>>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  color: Scalars['String'];
  highlightColor: Scalars['String'];
  wallpapers?: Maybe<Array<Maybe<Wallpaper>>>;
};


export type Mutation = {
  __typename?: 'Mutation';
  createWallpaper: Wallpaper;
};


export type MutationCreateWallpaperArgs = {
  data?: Maybe<WallpaperCreateInput>;
};

export type Query = {
  __typename?: 'Query';
  trending: Array<Maybe<Wallpaper>>;
  brands: Array<Maybe<Brand>>;
  categories: Array<Maybe<Category>>;
  wallpaper: Wallpaper;
  wallpapersWith: Array<Maybe<Wallpaper>>;
};


export type QueryBrandsArgs = {
  brandId?: Maybe<Scalars['String']>;
};


export type QueryCategoriesArgs = {
  categoryId?: Maybe<Scalars['String']>;
};


export type QueryWallpaperArgs = {
  wallpaperId: Scalars['String'];
};


export type QueryWallpapersWithArgs = {
  tagsId?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  brandId?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
  totalNumberOfItems: Scalars['Int'];
  wallpapers?: Maybe<Array<Maybe<Wallpaper>>>;
};

export type TrendingWallpaper = {
  __typename?: 'TrendingWallpaper';
  id: Scalars['String'];
  downloads: Scalars['Int'];
  wallpaper: Wallpaper;
};

export type Wallpaper = {
  __typename?: 'Wallpaper';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUri: Scalars['String'];
  brand: Brand;
  height: Scalars['Int'];
  width: Scalars['Int'];
  sizeInKB: Scalars['Int'];
  tags: Array<Maybe<Tag>>;
  publisher: Scalars['String'];
  createdAt: Scalars['DateTime'];
  likes: Scalars['Int'];
  downloads: Scalars['Int'];
  category?: Maybe<Category>;
  highlightColor: Scalars['String'];
};

export type WallpaperCreateInput = {
  name: Scalars['String'];
  imageUri: Scalars['String'];
  brandId: Scalars['String'];
  height: Scalars['Int'];
  width: Scalars['Int'];
  sizeInKB: Scalars['Int'];
  tagsId: Array<Maybe<Scalars['String']>>;
  publisher: Scalars['String'];
  likes: Scalars['Int'];
  downloads: Scalars['Int'];
  categoryId: Scalars['String'];
  highlightColor?: Maybe<Scalars['String']>;
};

export type TrendingQueryVariables = Exact<{ [key: string]: never; }>;


export type TrendingQuery = (
  { __typename?: 'Query' }
  & { trending: Array<Maybe<(
    { __typename?: 'Wallpaper' }
    & Pick<Wallpaper, 'id' | 'name' | 'imageUri' | 'sizeInKB' | 'downloads' | 'height' | 'width' | 'likes' | 'publisher' | 'createdAt'>
  )>> }
);

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'color' | 'highlightColor'>
  )>> }
);

export type HomeScreenDataQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeScreenDataQuery = (
  { __typename?: 'Query' }
  & { trending: Array<Maybe<(
    { __typename?: 'Wallpaper' }
    & Pick<Wallpaper, 'id' | 'name' | 'imageUri'>
    & { brand: (
      { __typename?: 'Brand' }
      & Pick<Brand, 'id'>
    ), category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id'>
    )> }
  )>>, categories: Array<Maybe<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'color' | 'highlightColor'>
  )>>, brands: Array<Maybe<(
    { __typename?: 'Brand' }
    & Pick<Brand, 'id' | 'name' | 'imageUri' | 'highlightColor'>
  )>> }
);

export type WallpapersWithQueryVariables = Exact<{
  brandId?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  tagsId?: Maybe<Scalars['String']>;
}>;


export type WallpapersWithQuery = (
  { __typename?: 'Query' }
  & { wallpapersWith: Array<Maybe<(
    { __typename?: 'Wallpaper' }
    & Pick<Wallpaper, 'name' | 'imageUri' | 'downloads' | 'id'>
  )>> }
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
  categories {
    id
    name
    color
    highlightColor
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
export const HomeScreenDataDocument = gql`
    query homeScreenData {
  trending {
    id
    name
    imageUri
    brand {
      id
    }
    category {
      id
    }
  }
  categories {
    id
    name
    color
    highlightColor
  }
  brands {
    id
    name
    imageUri
    highlightColor
  }
}
    `;

/**
 * __useHomeScreenDataQuery__
 *
 * To run a query within a React component, call `useHomeScreenDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeScreenDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeScreenDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeScreenDataQuery(baseOptions?: Apollo.QueryHookOptions<HomeScreenDataQuery, HomeScreenDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeScreenDataQuery, HomeScreenDataQueryVariables>(HomeScreenDataDocument, options);
      }
export function useHomeScreenDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeScreenDataQuery, HomeScreenDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeScreenDataQuery, HomeScreenDataQueryVariables>(HomeScreenDataDocument, options);
        }
export type HomeScreenDataQueryHookResult = ReturnType<typeof useHomeScreenDataQuery>;
export type HomeScreenDataLazyQueryHookResult = ReturnType<typeof useHomeScreenDataLazyQuery>;
export type HomeScreenDataQueryResult = Apollo.QueryResult<HomeScreenDataQuery, HomeScreenDataQueryVariables>;
export const WallpapersWithDocument = gql`
    query wallpapersWith($brandId: String, $categoryId: String, $tagsId: String) {
  wallpapersWith(brandId: $brandId, categoryId: $categoryId, tagsId: $tagsId) {
    name
    imageUri
    downloads
    id
  }
}
    `;

/**
 * __useWallpapersWithQuery__
 *
 * To run a query within a React component, call `useWallpapersWithQuery` and pass it any options that fit your needs.
 * When your component renders, `useWallpapersWithQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWallpapersWithQuery({
 *   variables: {
 *      brandId: // value for 'brandId'
 *      categoryId: // value for 'categoryId'
 *      tagsId: // value for 'tagsId'
 *   },
 * });
 */
export function useWallpapersWithQuery(baseOptions?: Apollo.QueryHookOptions<WallpapersWithQuery, WallpapersWithQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WallpapersWithQuery, WallpapersWithQueryVariables>(WallpapersWithDocument, options);
      }
export function useWallpapersWithLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WallpapersWithQuery, WallpapersWithQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WallpapersWithQuery, WallpapersWithQueryVariables>(WallpapersWithDocument, options);
        }
export type WallpapersWithQueryHookResult = ReturnType<typeof useWallpapersWithQuery>;
export type WallpapersWithLazyQueryHookResult = ReturnType<typeof useWallpapersWithLazyQuery>;
export type WallpapersWithQueryResult = Apollo.QueryResult<WallpapersWithQuery, WallpapersWithQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    