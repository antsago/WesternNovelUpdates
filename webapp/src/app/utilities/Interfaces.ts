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
    readChapters: string[]
    defaultList: string
    lists: DbList
}

export interface ListNovel
{
    novelTitle: string
    novelId: string
}

export interface DbList
{
    [listname: string]: ListNovel[]
}
