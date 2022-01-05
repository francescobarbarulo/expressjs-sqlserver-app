require('dotenv').config()
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const app = express()

const port = process.env.PORT || 3000

const prisma = new PrismaClient()

app.get('/', async (req, res) => {
    res.type('html')
    res.send('<p>ExpressJS server + SQL Server</p><p>> <a href="/posts">Get some data</a></p>')
})

app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    })
    res.json(posts)
})

app.get('*', async (req, res) => {
    res.status(404).send()
})

app.listen(port, () => {
  console.log(`🚀 Server ready on port ${port}`)
})