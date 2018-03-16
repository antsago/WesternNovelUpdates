import { Feed } from "./Feed"
import { GravityTalesFeed } from "./GravityTalesFeed"

export class FeedFactory
{
    static createFeed(feed, hostingSite, novelId): Feed
    {
        switch(hostingSite)
        {
            case "GravityTales":
            {
                return new GravityTalesFeed(feed, novelId)
            }
            default:
            {
                return new Feed(feed, novelId)
            }
        }
    }
}
