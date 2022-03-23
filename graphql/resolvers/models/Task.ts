import { objectType } from 'nexus'

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.string('id')
    t.string('title')
    t.string('status')
    t.string('description')
    t.string('userId')
    // t.nonNull.string('createdAt')
    t.list.field('user', {
      type: 'User',
      async resolve(parent, _, ctx) {
        return await ctx.prisma.task
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .user()
      },
    })
  },
})
