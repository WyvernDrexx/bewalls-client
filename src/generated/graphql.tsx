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

export type Bundle = {
  __typename?: 'Bundle';
  id: Scalars['String'];
  name: Scalars['String'];
  highlightColor: Scalars['String'];
  imageUri: Scalars['String'];
  color: Scalars['String'];
  totalNumberOfItems: Scalars['Int'];
  wallpapers?: Maybe<Array<Maybe<Wallpaper>>>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  imageUri: Scalars['String'];
  totalNumberOfItems: Scalars['Int'];
  wallpapers?: Maybe<Array<Maybe<Wallpaper>>>;
};

export type Color = {
  __typename?: 'Color';
  id: Scalars['String'];
  name: Scalars['String'];
  code: Scalars['String'];
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
  bundles: Array<Maybe<Bundle>>;
  categories: Array<Maybe<Category>>;
  wallpaper: Wallpaper;
  wallpapers: Array<Maybe<Wallpaper>>;
  search: SearchResult;
  colors: Array<Maybe<Color>>;
};


export type QueryBundlesArgs = {
  bundleId?: Maybe<Scalars['String']>;
};


export type QueryCategoriesArgs = {
  categoryId?: Maybe<Scalars['String']>;
};


export type QueryWallpaperArgs = {
  wallpaperId: Scalars['String'];
};


export type QueryWallpapersArgs = {
  data: WallpaperQueryInput;
};


export type QuerySearchArgs = {
  searchText: Scalars['String'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  wallpapers: Array<Maybe<Wallpaper>>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
  totalNumberOfItems: Scalars['Int'];
  wallpapers: Array<Maybe<Wallpaper>>;
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
    & Pick<Wallpaper, 'id' | 'name' | 'imageUri' | 'sizeInKB' | 'downloads' | 'height' | 'width' | 'likes' | 'publisher' | 'createdAt'>
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
    & Pick<Category, 'id' | 'name' | 'imageUri' | 'totalNumberOfItems'>
  )>> }
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
    & Pick<Category, 'id' | 'name' | 'imageUri'>
  )>>, bundles: Array<Maybe<(
    { __typename?: 'Bundle' }
    & Pick<Bundle, 'id' | 'imageUri' | 'name' | 'highlightColor' | 'color'>
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
    )>> }
  ) }
);

export type ColorsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type ColorsAllQuery = (
  { __typename?: 'Query' }
  & { colors: Array<Maybe<(
    { __typename?: 'Color' }
    & Pick<Color, 'id' | 'name' | 'code'>
  )>> }
);

export type WallpapersQueryVariables = Exact<{
  bundleId?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  tagsId?: Maybe<Scalars['String']>;
}>;


export type WallpapersQuery = (
  { __typename?: 'Query' }
  & { wallpapers: Array<Maybe<(
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
  bundles {
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
  categories {
    id
    name
    imageUri
    totalNumberOfItems
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
  categories {
    id
    name
    imageUri
  }
  bundles {
    id
    imageUri
    name
    highlightColor
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
export const ColorsAllDocument = gql`
    query ColorsAll {
  colors {
    id
    name
    code
  }
}
    `;

/**
 * __useColorsAllQuery__
 *
 * To run a query within a React component, call `useColorsAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useColorsAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useColorsAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useColorsAllQuery(baseOptions?: Apollo.QueryHookOptions<ColorsAllQuery, ColorsAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ColorsAllQuery, ColorsAllQueryVariables>(ColorsAllDocument, options);
      }
export function useColorsAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ColorsAllQuery, ColorsAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ColorsAllQuery, ColorsAllQueryVariables>(ColorsAllDocument, options);
        }
export type ColorsAllQueryHookResult = ReturnType<typeof useColorsAllQuery>;
export type ColorsAllLazyQueryHookResult = ReturnType<typeof useColorsAllLazyQuery>;
export type ColorsAllQueryResult = Apollo.QueryResult<ColorsAllQuery, ColorsAllQueryVariables>;
export const WallpapersDocument = gql`
    query wallpapers($bundleId: String, $categoryId: String, $tagsId: String) {
  wallpapers(
    data: {bundleId: $bundleId, categoryId: $categoryId, tagsId: $tagsId}
  ) {
    name
    imageUri
    downloads
    id
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    