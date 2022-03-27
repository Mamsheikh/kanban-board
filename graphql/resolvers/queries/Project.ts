import { extendType, nonNull, stringArg } from 'nexus'

export const ProjectQuery = extendType({
  type: 'Query',
  definition(t) {
    //Tasks Query

    t.nonNull.list.field('projects', {
      type: 'Project',
      resolve(_, __, ctx) {
        return ctx.prisma.project.findMany({})
      },
    })

    t.nonNull.field('project', {
      type: 'Project',
      args: {
        projectId: nonNull(stringArg()),
      },
      resolve(_, args, ctx) {
        try {
          const project = ctx.prisma.project.findUnique({
            where: { id: args.projectId },
          })

          return project
        } catch (error) {
          console.log(error)
        }
      },
    })
  },
})
