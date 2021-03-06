import { AnyPostId, AnySpaceId } from '@subsocial/types'

export type HttpRequestMethod = 'post' | 'get'

export type UseServerProps = {
  httpRequestMethod: HttpRequestMethod
}

export type SubsocialContext = {
  useServer?: UseServerProps
}

export type Visibility = 'onlyVisible' | 'onlyHidden' | 'onlyPublic' | 'onlyUnlisted'

export type VisibilityFilter = {
  visibility?: Visibility
}

export type ContentFilter = {
  withContentOnly?: boolean
}

export type Filters = VisibilityFilter & ContentFilter

export type PostDetailsOpts = VisibilityFilter & {
  withSpace?: boolean
  withOwner?: boolean
}

type IdsFilter<Id> = {
  ids: Id[]
}

type IdFilter<Id> = {
  id: Id
}

export type FindStructs<Id> = IdsFilter<Id> & Filters
export type FindStruct<Id> = IdFilter<Id> & Filters

export type FindPostsQuery = FindStructs<AnyPostId>
export type FindSpacesQuery = FindStructs<AnySpaceId>
export type FindPostQuery = FindStruct<AnyPostId>
export type FindSpaceQuery = FindStruct<AnySpaceId>

export type FindPostsWithDetailsQuery = FindPostsQuery & PostDetailsOpts
export type FindPostWithDetailsQuery = FindPostQuery & PostDetailsOpts

type CidAsStr = string

export type ContentResult<T> = Record<CidAsStr, T>
