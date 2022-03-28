import { NextApiResponse, NextApiRequest } from 'next'
import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'

export type Context = {
  prisma: PrismaClient
  req: NextApiRequest
  res: NextApiResponse
  // userId: string
  // email: string;
  // user: User;
}
// const user = await prisma.user.findUnique({
//   where:{email:session.user.email}
// })
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}): Promise<Context> {
  // const session = await getSession({ req })
  // const user = await prisma.user.findUnique({
  //   where: { email: session.user.email },
  // })
  return {
    prisma,
    req,
    res,
    // userId: user.id,
    // email: session.user.email,
    // user,
  }
}
