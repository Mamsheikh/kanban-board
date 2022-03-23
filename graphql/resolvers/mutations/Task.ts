import { extendType, nonNull, stringArg } from 'nexus'

export const TaskMutations = extendType({
  type: 'Mutation',
  definition(t) {
    //Create Task
    t.field('createTask', {
      type: 'Task',
      args: {
        title: nonNull(stringArg()),
        description: nonNull(stringArg()),
        status: nonNull(stringArg()),
        userId: stringArg(),
      },
      resolve(_, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            title: args.title,
            description: args.description,
            status: args.status,
            userId: args.userId,
          },
        })
      },
    })
  },
})
