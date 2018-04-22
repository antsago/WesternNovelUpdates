import { Feed } from "./Feed"
import { NoPermalinkFeed } from "./NoPermalinkFeed"
import { RoyalRoadFeed } from "./RoyalRoadFeed"
import { WithCategoriesFeed } from "./WithCategoriesFeed"
import { SufficientVelocityFeed } from "./SufficientVelocityFeed"

export class FeedFactory
{
    static createFeed(feed, hostingSite, novelId, categoriesJSON, threadId): Feed
    {
        switch(hostingSite)
        {
            case "Personal-NoPermalink":
            case "GravityTales":
            {
                return new NoPermalinkFeed(feed, novelId)
            }
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
            case "Personal":
            default:
            {
                return new Feed(feed, novelId)
            }
        }
    }
}
