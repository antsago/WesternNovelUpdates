const express = require('express')
const axios = require('axios');
const app = express()
const port = process.env.PORT || 3000
const novelList = require('./novelList.json')


const UpdateChaptersURL = "https://us-central1-westernnovelupdates.cloudfunctions.net/updateChapters"

app.get('*', async (req, res) =>
{
    try
    {
        let novel = novelList[0]
        let feed = await axios.get(novel["FeedUrl"])
        let updatedChaptersResponse = await axios.post(UpdateChaptersURL, feed.data, 
            { headers: { "Content-Type": "text/plain", "Novel-ID": novel["ID"] }})

        res.status(updatedChaptersResponse.status).send(updatedChaptersResponse.data)
    }
    catch(err)
    {
        res.status(500).send(err)
    }
})

app.listen(port, () =>
{
    console.log(`Feeder running at ${port}`)
})