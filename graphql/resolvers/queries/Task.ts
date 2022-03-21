import { extendType, nonNull, stringArg } from 'nexus'

export const TasksQuery = extendType({
  type: 'Query',
  definition(t) {
    //Tasks Query
    t.nonNull.list.field('tasks', {
      type: 'Task',
      resolve(_, __, ctx) {
        return ctx.prisma.task.findMany({})
      },
    })

    //Tasks by UserId

    t.field('task', {
      type: 'Task',
      args: {
        userId: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.task.findMany({
          where: { userId: args.userId },
        })
      },
    })
  },
})
