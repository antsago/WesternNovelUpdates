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

const UpdateChaptersURL = "https://us-central1-westernnovelupdates.cloudfunctions.net/updateChapters"
const BatchSize = 10
const MsBetweenBatchs = 100000
const InitialBatchCount = 0

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
            res.status(401).end()
            return
        }

        let snapshot = await admin.firestore().collection("novels").get()

        res.status(200).write("Novel list retrieved\n")

        let batchCounter = InitialBatchCount
        for (let novel of snapshot.docs)
        {
            if (batchCounter >= BatchSize)
            {
                await waitBetweenBatches()
                batchCounter = InitialBatchCount
            }
            let data = novel.data()
            await sendChapterFeed(data.rssFeed, novel.id, data.hostingSite)
            res.write(`Updated novel ${novel.id}\n`)    
            batchCounter++
        }
        
        res.end("Chapters feed saved\n")
    }
    catch(err)
    {
        console.error(err)
        res.status(500).end()
    }
})

const server = app.listen(port, () =>
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
        "Token": token
    }})
}

function waitBetweenBatches()
{
    return new Promise(resolve =>
    { 
        setTimeout(resolve, MsBetweenBatchs)
    })
 }