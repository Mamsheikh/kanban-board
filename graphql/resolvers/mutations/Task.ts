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
            user: { connect: { id: args.userId } },
          },
        })
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
              user: { connect: { id: args.userId } },
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
