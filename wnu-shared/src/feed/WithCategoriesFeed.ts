import { Feed } from "./Feed"

export class WithCategoriesFeed extends Feed
{
    constructor(protected feed: string|any, protected readonly novel: string, protected readonly categories: string[])
    {
        super(feed, novel)
    }
    
    public extractChapters(): WithCategoriesFeed
    {
        super.extractChapters()
        this.filterByCategories()
        return this
    }

    private filterByCategories()
    {
        this.chapters = this.chapters.filter(ch =>
        {
            return this.categories.every(requiredCategory => ch.category.includes(requiredCategory))
        })
    }
}