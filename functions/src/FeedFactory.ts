import { Feed } from "./Feed"
import { NoPermalinkFeed } from "./GravityTalesFeed"
import { RoyalRoadFeed } from "./RoyalRoadFeed"

export class FeedFactory
{
    static createFeed(feed, hostingSite, novelId): Feed
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
            default:
            {
                return new Feed(feed, novelId)
            }
        }
    }
}
