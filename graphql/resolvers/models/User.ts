import { enumType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('email')
    t.nonNull.string('image')
    t.nonNull.boolean('isAdmin')
    t.nonNull.field('role', {
      type: Role,
    })
    t.list.field('tasks', {
      type: 'Task',
      async resolve(parent, _, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: { id: parent.id },
          })
          .tasks()
      },
    })
  },
})

const Role = enumType({
  name: 'Role',
  members: ['FREE', 'SUBSCRIBED'],
})
