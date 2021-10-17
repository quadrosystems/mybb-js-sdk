export type FormatType = 'json' | 'xml';
export type CharsetType = 'utf-8' | 'windows-1251';

export type MethodType = 'board.get'
  | 'board.getForums'
  | 'board.getFunds'
  | 'board.getSubscriptions'
  | 'board.getFileMetadata'
  | 'board.auth'
  | 'users.get'
  | 'users.getOnline'
  | 'users.getRespect'
  | 'topic.get'
  | 'topic.getRecent'
  | 'post.get'
  | 'post.getVotes'
  | 'storage.set'
  | 'storage.get'
  | 'storage.keys'
  | 'storage.delete'
  | 'storage.flush'
  | 'storage.stats';

export type Options = {
  format: FormatType,
  charset: CharsetType,
}

export type GetBoardParams = {
  fields?: string | string[]
}

export type GetForumParams = {
  id?: number | number[],
  cat_id?: number | number[],
  exclude?: string | string[],
  skip?: number,
  limit?: number,
}

export type GetSubscriptionsParams = {
  user_id?: number | number[],
  topic_id?: number | number[],
  sort_by?: 'id' | 'subject' | 'num_replies' | 'num_posts',
  sort_dir?: 'asc' | 'desc',
  skip?: number,
  limit?: number
}

export type GetFileMetadataParams = {
  filename?: string,
  admin: any
}

export type GetUsersParams = {
  user_id?: number | number[],
  username?: string | string[],
  fields?: string | string[],
  group_id?: number | number[],
  birth_month?: number,
  sort_by?: 'user_id' | 'username' | 'registered' | 'last_visit' | 'respect' | 'positive' | 'num_invites' | 'birthdate' | 'num_posts',
  sort_dir?: 'asc' | 'desc',
  skip?: number,
  limit?: number
}

export type GetOnlineUsersParams = {
  type?: 'all' | 'guests' | 'users'
  limit?: number
}

export type GetRespectParams = {
  user_id?: number | number[],
  sort_dir?: 'asc' | 'desc',
  skip?: number,
  limit?: number
}

export type GetTopicsParams = {
  forum_id?: number | number[],
  topic_id?: number | number[],
  exclude_forum?: number | number[],
  fields?: string | string[],
  sort_by?: 'id' | 'posted' | 'last_post' | 'sticky_first',
  sort_dir?: 'asc' | 'desc',
  skip?: number,
  limit?: number
}

export type GetRecentParams = GetTopicsParams & {
  interval: any
}

export type GetPostParams = {
  post_id?: number | number[],
  topic_id?: number | number[],
  fields?: string | string[],
  sort_by?: 'id' | 'posted',
  sort_dir?: 'asc' | 'desc',
  skip?: number,
  limit?: number
}

export type GetPostVotesParams = {
  post_id: number,
  fields?: string | string[],
  sort_dir?: 'asc' | 'desc',
}
