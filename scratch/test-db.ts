import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function test() {
  console.log('Testing DB connection...')
  try {
    const users = await prisma.user.findMany({ take: 1 })
    console.log('Success!', users)
  } catch (err) {
    console.error('Failed!', err)
  } finally {
    await prisma.$disconnect()
  }
}

test()
