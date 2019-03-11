const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//TOKEN
const createToken = (user, secret, expiresIn) => {
	const { username, email } =  user;
	return jwt.sign({ username, email}, secret, { expiresIn });
}

module.exports = {
	Query: {
		getCurrentUser: async (_, args, { User, currentUser }) => {
			if(!currentUser){
				return null;
			}

			const user = await User.findOne({username: currentUser.username}).populate({
				path: 'board',
				model: 'Board'
			});
			return user;

		},
		getBoard: async (_, args, { Board }) => {
			const boards = await Board.find({}).sort({ created_at: 'desc'}).populate({
				path: 'createdBy',
				model: 'User'
			});
			return boards;
		}
	},

	Mutation: {
		addBoard: async (_, {title, creatorId}, { Board }) => {
			const newBoard = await new Board({
				title,
				createdBy : creatorId
			}).save();
			return newBoard;
		},
		signinUser: async (_, {username, password}, {User}) => {
			const user = await User.findOne({ username });
			if(!user){
				throw new Error('User not found');
			}
			const isValidPassword = await bcrypt.compare(password, user.password);
			if(!isValidPassword){
				throw new Error('Invalid password');
			}
			return {token: createToken(user, process.env.SECRET, '1hr')};
		},
		signupUser: async (_, { username, email, password }, { User }) => {
			const user = await User.findOne({ username});
			if(user){
				throw new Error('Usuario ya esta registrado');
			}

			const newUser = await new User({
				username,
				email,
				password
			}).save();
			return {token: createToken(newUser, process.env.SECRET, '1hr')};
		}
	}
}