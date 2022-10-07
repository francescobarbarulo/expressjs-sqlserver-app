require('dotenv').config()
const express = require('express')
const path = require('path')
const ejs = require('ejs')
const { PrismaClient } = require('@prisma/client')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000

const prisma = new PrismaClient()

app.get('/', async (req, res) => {
    const posts = await prisma.post.findMany({
        where: {
            published: true
        },
        orderBy: [
            {
                createdAt: 'desc'
            }
        ]
    })
    res.render('index', { 'posts': posts })
})

app.get('*', async (req, res) => {
    res.status(404).send()
})

app.listen(port, () => {
  console.log(`🚀 Server ready on port ${port}`)
})