const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "typeDefs.gql");
const jwt = require('jsonwebtoken');


//IMPORT TYPEDEFS & RESOLVERS
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require("./resolvers");

//ENVIROMENT CONFIG
require('dotenv').config({ path: 'variables.env'});

//REQUIRED MODELS
const User = require('./models/User.js');
const Board = require('./models/Board.js');
const Card = require('./models/Card.js');

//MONGOOSE DATABASE CONNECTION MLAB DATABASE
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true})
	.then(() => console.log('DB connected'))
	.catch(err => console.error(err));

mongoose.set('useCreateIndex', true);

// Verificacion JWT token
const getUser = async token => {
	if(token){
		try{
			// let user = await jwt.verify(token, process.env.SECRET);
			// console.log(user);
			return await jwt.verify(token, process.env.SECRET);
		}catch(err){
			throw new AuthenticationError(
				"Sesion terminada. Por favor vuelve a iniciar sesion."
				);
			// console.error(err);
		}
	}
}


//APOLLO/GRAPHQL SERVER
const server = new ApolloServer({ 
	typeDefs,
	resolvers,
	formatError: error => ({
		name: error.name, 
		message: error.message.replace('Context creation failed:', '')
	}),
	context: async ({ req }) => {
			const token= req.headers["authorization"];
			return { User, Board, currentUser: await getUser(token)};	
	}
});



//STARTING SERVER
server.listen().then(({ url }) => {
  console.log(` Server  at ${url}`)
});