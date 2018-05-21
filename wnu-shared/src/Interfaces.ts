export interface Novel
{
    chapters?: Chapter[]
    author: string
    homepage: string
    hostingSite: Site
    rssFeed: string
    synopsis: string
    title: string
    id: string
    categories?: string[]
    threadId?: string
    bookId?: string
}

export type Site = 'GravityTales' | 'RoyalRoad' | 'Reddit'
    | 'Personal-WithCategories' | 'SufficientVelocity' | 'Personal' | 'Quidian'

export interface NovelRequest
{
    id?: string
    author: string
    homepage: string
    rssFeed: string
    synopsis: string
    title: string
    hostingSite?: Site
    categories?: string[]
    threadId?: string
}

export interface Chapter
{
    guid: string
    link: string
    novel: string
    publicationDate: Date
    title: string
}

export interface User
{
    defaultList: List
    isAdmin?: boolean
    bookmarks: Bookmarks
}

export type ChapterState = 'Read' | 'Unread' | 'Bookmarked' 

export interface Bookmarks
{
    [key: string]: Bookmark
}

export interface Bookmark
{
    chapterId: string
    publicationDate: Date
}

export interface ListNovel
{
    novelTitle: string
    novelId: string
}

export interface List
{
    listId: string,
    listName: string,
    novels?: ListNovel[]
}
