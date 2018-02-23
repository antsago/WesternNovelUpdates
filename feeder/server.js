const express = require('express')
const axios = require('axios');
const app = express()
const port = process.env.PORT || 3000

const randidlyFeedURL = "http://royalroadl.com/fiction/syndication/11209"
const UpdateChaptersURL = "https://us-central1-westernnovelupdates.cloudfunctions.net/updateChapters"

app.get('*', async (req, res) =>
{
    try
    {
        let randidlyFeed = await axios.get(randidlyFeedURL)
        let updatedChaptersResponse = await axios.post(UpdateChaptersURL, randidlyFeed.data, 
            {headers:{"Content-Type": "text/plain"}})

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