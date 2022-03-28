import { getSession } from 'next-auth/react'
import { extendType, nonNull, stringArg } from 'nexus'

export const TaskMutations = extendType({
  type: 'Mutation',
  definition(t) {
    //Create Task
    t.field('createTask', {
      type: 'Task',
      args: {
        projectId: nonNull(stringArg()),
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        status: nonNull(stringArg()),
      },
      async resolve(_, args, ctx) {
        const req = ctx.req
        const session = await getSession({ req })
        const user = await ctx.prisma.user.findUnique({
          where: { email: session?.user.email },
        })
        try {
          return ctx.prisma.task.create({
            data: {
              project: { connect: { id: args.projectId } },
              title: args.title,
              description: args.description,
              status: args.status,
              user: { connect: { id: user.id } },
            },
          })
        } catch (error) {
          throw new Error(`failed to create task: ${error}`)
        }
      },
    }),
      //Update Task
      t.field('updateTask', {
        type: 'Task',
        args: {
          id: nonNull(stringArg()),
          title: stringArg(),
          description: stringArg(),
          status: stringArg(),
          userId: stringArg(),
        },
        resolve(_, args, ctx) {
          return ctx.prisma.task.update({
            where: { id: args.id },
            data: {
              title: args.title,
              description: args.description,
              status: args.status,
              userId: args.userId,
              // user: { connect: { id: args.userId } },
            },
          })
        },
      }),
      // Delete a Task
      t.field('deleteTask', {
        type: 'Task',
        args: {
          id: nonNull(stringArg()),
        },
        resolve(_, args, ctx) {
          return ctx.prisma.task.delete({
            where: { id: args.id },
          })
        },
      })
  },
})
