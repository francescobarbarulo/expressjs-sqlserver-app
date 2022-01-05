const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const data = [
    {
        title: "Hello World!",
        content: "As usually the first post must be dedicated to the world.",
        published: true
    },
    {
        title: "Welcome to the PaaS for Beginners course",
        content: "We are excited to invite you to join the brand new Azure PaaS solutions course.",
        published: true
    },
    {
        title: "Thank you for having joined the course",
        content: "We hope the course was interesting. Give us a feedback!",
        published: false
    }
]

async function main() {
    for (const post of data) {
        await prisma.post.create({
            data: post
        })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })