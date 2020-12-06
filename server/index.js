const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`

const Workout = mongoose.model('Workout', workoutSchema);

var userSchema = Schema({
    _id     : Number,
    workouts : [{ref:workout}]
});

var workout = Schema({ exercise: String, weight: Number});

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))