export interface Novel
{
    chapters?: Chapter[]
    author: string
    homepage: string
    hostingSite: string
    rssFeed: string
    synopsis: string
    title: string
    id: string
}

export interface NovelRequest
{
    author: string
    homepage: string
    rssFeed: string
    synopsis: string
    title: string
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
