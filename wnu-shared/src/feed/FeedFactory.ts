import { Feed } from "./Feed"
import { RoyalRoadFeed } from "./RoyalRoadFeed"
import { WithCategoriesFeed } from "./WithCategoriesFeed"
import { SufficientVelocityFeed } from "./SufficientVelocityFeed"

export class FeedFactory
{
    static createFeed(feed, hostingSite, novelId, categoriesJSON, threadId): Feed
    {
        switch(hostingSite)
        {
            case "RoyalRoad":
            {
                return new RoyalRoadFeed(feed, novelId)
            }
            case "Personal-WithCategories":
            {
                return new WithCategoriesFeed(feed, novelId, JSON.parse(categoriesJSON))
            }
            case "SufficientVelocity":
            {
                return new SufficientVelocityFeed(feed, novelId, threadId)
            }
            case "GravityTales":
            case "Personal":
            default:
            {
                return new Feed(feed, novelId)
            }
        }
    }
}
