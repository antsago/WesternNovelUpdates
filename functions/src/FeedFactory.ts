import { Feed } from "./Feed"
import { NoPermalinkFeed } from "./NoPermalinkFeed"
import { RoyalRoadFeed } from "./RoyalRoadFeed"
import { WithCategoriesFeed } from "./WithCategoriesFeed"

export class FeedFactory
{
    static createFeed(feed, hostingSite, novelId, categoriesJSON): Feed
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
            case "Personal":
            default:
            {
                return new Feed(feed, novelId)
            }
        }
    }
}
