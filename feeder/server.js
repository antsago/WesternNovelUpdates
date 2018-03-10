const express = require('express')
const axios = require('axios');
const app = express()
const port = process.env.PORT || 3000
const admin = require('firebase-admin')

const UpdateChaptersURL = "https://us-central1-westernnovelupdates.cloudfunctions.net/updateChapters"

admin.initializeApp(
{
    credential: admin.credential.cert(
    {
        projectId: process.env.ProjectId,
        clientEmail: process.env.ClientEmail,
        privateKey: JSON.parse(process.env.FirebasePrivateKey)
    }),
    databaseURL: process.env.FirebaseDatabaseURL
})

app.get('/collectFeeds', async (req, res) =>
{
    try
    {
        if(req.get("token") != process.env.token)
        {
            res.status(401).end()
            return
        } 

        let listOfCalls = [] 
        let snapshot = await admin.firestore().collection("novels").get()
        for (let novel of snapshot.docs)
        {
            let data = novel.data()
            await sendChapterFeed(data.rssFeed, novel.id, data.hostingSite)
        }
        
        res.status(200).send("Chapters feed saved")
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

async function sendChapterFeed(rssFeed, novelId, site)
{
    let feed = await axios.get(rssFeed)
    return axios.post(UpdateChaptersURL, feed.data, { headers: 
    { 
        "Content-Type": "text/plain", 
        "Novel-ID": novelId, 
        "Site": site, 
        "Token": process.env.token
    }})
}