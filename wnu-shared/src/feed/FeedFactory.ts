import { Feed } from "./Feed"
import { RoyalRoadFeed } from "./RoyalRoadFeed"
import { WithCategoriesFeed } from "./WithCategoriesFeed"
import { SufficientVelocityFeed } from "./SufficientVelocityFeed"
import { RedditFeed } from './RedditFeed'
import { Novel } from "../Interfaces"

export class FeedFactory
{
    static createFeed(feed: string, novel: Novel): Feed
    {
        switch(novel.hostingSite)
        {
            case "RoyalRoad":
            {
                return new RoyalRoadFeed(feed, novel.id)
            }
            case "Personal-WithCategories":
            {
                return new WithCategoriesFeed(feed, novel.id, novel.categories)
            }
            case "SufficientVelocity":
            {
                return new SufficientVelocityFeed(feed, novel.id, novel.threadId)
            }
            case "Reddit":
            {
                return new RedditFeed(feed, novel.id, novel.author)
            }
            case "GravityTales":
            case "Personal":
            default:
            {
                return new Feed(feed, novel.id)
            }
        }
    }
}
