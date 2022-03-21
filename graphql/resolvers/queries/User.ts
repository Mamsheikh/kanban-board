import { extendType, nonNull, stringArg } from 'nexus'

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    //Get all Users
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_, __, ctx) {
        return ctx.prisma.user.findMany()
      },
    })

    //Get User by email

    t.nonNull.field('user', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { email: args.email },
        })
      },
    })
  },
})
