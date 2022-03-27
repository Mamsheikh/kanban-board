import { enumType, objectType } from 'nexus'

export const Project = objectType({
  name: 'Project',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('description')
    t.nullable.string('sourceCode')
    t.nullable.string('website')
    t.field('user', {
      type: 'User',
      async resolve(parent, _, ctx) {
        return await ctx.prisma.project
          .findUnique({
            where: { id: parent.id },
          })
          .user()
      },
    })
    t.list.field('tasks', {
      type: 'Task',
      async resolve(parent, _, ctx) {
        return await ctx.prisma.project
          .findUnique({
            where: { id: parent.id },
          })
          .tasks()
      },
    })
  },
})
