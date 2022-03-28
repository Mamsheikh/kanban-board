import { getSession } from 'next-auth/react'
import { extendType, nonNull, stringArg } from 'nexus'

export const ProjectMutations = extendType({
  type: 'Mutation',
  definition(t) {
    //Create Task
    t.field('createProject', {
      type: 'Project',
      args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        website: stringArg(),
        sourceCode: stringArg(),
        // userId: stringArg(),
      },
      async resolve(_, args, ctx) {
        // console.log(user)
        try {
          const req = ctx.req
          const session = await getSession({ req })
          // console.log(session)
          const user = await ctx.prisma.user.findUnique({
            where: { email: session?.user.email },
          })
          return ctx.prisma.project.create({
            data: {
              name: args.name,
              description: args.description,
              website: args.website,
              user: { connect: { id: user.id } },
              sourceCode: args.sourceCode,
            },
          })
        } catch (error) {
          console.log(error)
        }
      },
    })
    //Update Task
    // t.field('updateTask', {
    //   type: 'Task',
    //   args: {
    //     id: nonNull(stringArg()),
    //     title: stringArg(),
    //     description: stringArg(),
    //     status: stringArg(),
    //     userId: stringArg(),
    //   },
    //   resolve(_, args, ctx) {
    //     return ctx.prisma.task.update({
    //       where: { id: args.id },
    //       data: {
    //         title: args.title,
    //         description: args.description,
    //         status: args.status,
    //         userId: args.userId,
    //         // user: { connect: { id: args.userId } },
    //       },
    //     })
    //   },
    // }),
  },
})
