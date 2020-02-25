const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
    Query: {
      listPosts: (_, args, context, info) => {
        return context.prisma.query.posts(
          {
            where: {
              OR: [
                { title_contains: args.searchString },
                { content_contains: args.searchString },
              ],
            },
          },
          info,
        )
      },
      listUsers: (_, args, context, info) => {
        return context.prisma.query.users(
          {
            where: {
              OR: [
                { email_contains: args.searchString },
                { name_contains: args.searchString },
                { username_contains: args.searchString },
              ],
            },
          },
          info,
        )
      },
      listComments: (_, args, context, info) => {
        return context.prisma.query.comments(
          {
            where: {
              OR: [
                { id_contains: args.searchString },
                { body_contains: args.searchString },
              ],
            },
          },
          info,
        )
      },
      listAlbums: (_, args, context, info) => {
        return context.prisma.query.albums(
          {
            where: {
              OR: [
                { id_contains: args.searchString },
                { title_contains: args.searchString },
              ],
            },
          },
          info,
        )
      },
      listPhotos: (_, args, context, info) => {
        return context.prisma.query.photos(
          {
            where: {
              OR: [
                { id_contains: args.searchString },
                { title_contains: args.searchString },
              ],
            },
          },
          info,
        )
      },
      getUser: (_, args, context, info) => {
        return context.prisma.query.user(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      getComment: (_, args, context, info) => {
        return context.prisma.query.comment(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      getPost: (_, args, context, info) => {
        return context.prisma.query.post(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      getPhoto: (_, args, context, info) => {
        return context.prisma.query.photo(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      getAlbum: (_, args, context, info) => {
        return context.prisma.query.album(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
    },
    Mutation: {
      createPost: (_, args, context, info) => {
        return context.prisma.mutation.createPost(
          {
            data: {
              title: args.title,
              content: args.content,
              author: {
                connect: {
                  id: args.authorId,
                },
              },
            },
          },
          info,
        )
      },
      publishPost: (_, args, context, info) => {
        return context.prisma.mutation.updatePost(
          {
            where: {
              id: args.id,
            },
            data: {
              published: true,
            },
          },
          info,
        )
      },
      deletePost: (_, args, context, info) => {
        return context.prisma.mutation.deletePost(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      createUser: (_, args, context, info) => {
        return context.prisma.mutation.createUser(
          {
            data: {
              name: args.name,
              email: args.email
            },
          },
          info,
        )
      },
      updateUser: (_, args, context, info) => {
        return context.prisma.mutation.updateUser(
            {
                where: {
                  id: args.id,
                },
                data: {
                  email: args.input.email,
                  name: args.input.name,
                  username:args.input.username,
                  company:args.input.company,
                  gender:args.input.gender,
                },
              },
              info,
        )
      },
      updateAlbumTitle: (_, args, context, info) => {
        return context.prisma.mutation.updateAlbum(
            {
                where: {
                  id: args.id,
                },
                data: {
                  title: args.title,
                },
              },
              info,
        )
      },
      updatePhoto: (_, args, context, info) => {
        return context.prisma.mutation.updatePhoto(
            {
                where: {
                  id: args.id,
                },
                data: {
                  title: args.input.title,
                  url: args.input.url,
                },
              },
              info,
        )
      },
      deleteUser: (_, args, context, info) => {
        return context.prisma.mutation.deleteUser(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      deleteAlbum: (_, args, context, info) => {
        return context.prisma.mutation.deleteAlbum(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      deletePhoto: (_, args, context, info) => {
        return context.prisma.mutation.deletePhoto(
          {
            where: {
              id: args.id,
            },
          },
          info,
        )
      },
      createComment: (_, args, context, info) => {
        return context.prisma.mutation.createComment(
          {
            data: {
              body: args.body,
              post: {
                connect: {
                  id: args.postId,
                },
              },
            },
          },
          info,
        )
      },
      createAlbum: (_, args, context, info) => {
        return context.prisma.mutation.createAlbum(
          {
            data: {
              title: args.input.title,
              user: {
                connect: {
                  id: args.input.userId,
                },
              },
            },
          },
          info,
        )
      },
      createPhoto: (_, args, context, info) => {
        return context.prisma.mutation.createPhoto(
          {
            data: {
              title: args.input.title,
              url: args.input.url,
              album: {
                connect: {
                  id: args.input.albumId,
                },
              },
            },
          },
          info,
        )
      },
    },
  }

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    prisma: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
    }),
  }),
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`))