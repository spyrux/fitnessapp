const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
  
`







const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}



const server = new ApolloServer({
  typeDefs,
  resolvers
});


mongoose
.connect( MONGODB, {useNewUrlParser: true})
  .then(() =>{
  return server.listen( {port: 5000})})
  .then((res) =>{
    console.log(` Server running at ${res.url} `);
});

