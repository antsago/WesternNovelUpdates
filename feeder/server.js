const express = require('express')
const axios = require('axios');
const app = express()
const port = process.env.PORT || 3000
const novelList = require('./novelList.json')
const keys = require('./keys')


const UpdateChaptersURL = "https://us-central1-westernnovelupdates.cloudfunctions.net/updateChapters"

app.get('/collectFeeds', async (req, res) =>
{
    try
    {
        let listOfCalls = novelList.map( novel => { return sendChapterFeed(novel) })
        res.status(200).send("Chapters feed sent")
        await Promise.all(listOfCalls)
    }
    catch(err)
    {
        console.error(err)
        res.status(500).end()
    }
})

app.listen(port, () =>
{
    console.log(`Feeder running at ${port}`)
})

async function sendChapterFeed(novel)
{
    let feed = await axios.get(novel["FeedUrl"])
    return axios.post(UpdateChaptersURL, feed.data, { headers: 
    { 
        "Content-Type": "text/plain", 
        "Novel-ID": novel["ID"], 
        "Site": novel["Site"], 
        "Token": keys.TOKEN 
    }})
}