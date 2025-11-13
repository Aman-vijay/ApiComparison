import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

let users = [{ id: 1, name: "Alice" }];

const typeDefs = `
  type User {
    id: ID!
    name: String!
  }
  type Query {
    users: [User]
    getUser(id:ID!): User
  }
  type Mutation {
    addUser(name: String!): User
  }
`;

const resolvers = {
    Query: {
        users: () => users,
        getUser: (_, { id }) => users.find(u => String(u.id) === String(id)) || null,
    },
    Mutation: {
        addUser: (_, { name }) => {
            const newUser = { id: Date.now(), name };
            users.push(newUser);
            return newUser;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);

