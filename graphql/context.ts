import { NextApiResponse, NextApiRequest } from 'next'
import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma'

export type Context = {
  prisma: PrismaClient
}
export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}): Promise<Context> {
  return {
    prisma,
  }
}
