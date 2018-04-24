const express = require('express')
const axios = require('axios')
const app = express()
const admin = require('firebase-admin')

const InHeroku = process.env.InHeroku

const serviceAccount = InHeroku ? undefined : require('./serviceAccount.json')
    
const token = InHeroku ? process.env.token : serviceAccount.security_token
const databaseURL = InHeroku ? process.env.FirebaseDatabaseURL : serviceAccount.database_url
const certificate = InHeroku ? 
{
    projectId: process.env.ProjectId,
    clientEmail: process.env.ClientEmail,
    privateKey: JSON.parse(process.env.FirebasePrivateKey)
} : serviceAccount
const port = InHeroku ? process.env.PORT : 3000
const batchSize = 50
const beetwenBatchWait = 100000
const UpdateChaptersURL = "https://us-central1-westernnovelupdates.cloudfunctions.net/updateChapters"

admin.initializeApp(
{
    credential: admin.credential.cert(certificate),
    databaseURL: databaseURL
})

app.get('/collectFeeds', async (req, res) =>
{
    try
    {
        if(req.get("token") != token )
        {
            res.status(401).send()
            return
        }

        let snapshot = await admin.firestore().collection("novels").get()

        res.status(200).send("Novel list retrieved\n")

        let batchCount = 0
        for (let novel of snapshot.docs)
        {
            if(batchCount >= batchSize)
            {
                await timeout(beetwenBatchWait)
                batchCount = 0
            }

            try
            {
                await sendChapterFeed(novel.data())
            }
            catch(err)
            {
                console.error(err)
            }
            finally
            {
                batchCount++
            }
        }
        
    }
    catch(err)
    {
        console.error(err)
        res.status(500).send()
    }
})

const server = app.listen(port, () =>
{
    console.log(`Feeder running at ${port}`)
})

async function sendChapterFeed(novel)
{
    let feed = await axios.get(novel.rssFeed)
    return axios.post(UpdateChaptersURL, feed.data, { headers: 
    { 
        "Content-Type": "text/plain", 
        "Token": token,
        "Novel": JSON.stringify(novel)
    }})
}

async function timeout(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms))
}