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
			console.log(user);
			return user;

		},	

		getBoard: async (_, args, { Board, User, currentUser }) => {
			var boards = [];
			/*const user = await User.findOne({username: currentUser.username}).populate({
				path: 'board',
				model: 'Board',
			});
			if (user) {
				boards = user.board;
			}
			return boards;*/
			const user = await User.findOne({username: currentUser.username});
			if (user) {
				boards = await Board.find({createdBy: user._id}).sort({ created_at: 'desc'}).populate({
					path: 'createdBy',
					model: 'User'
				});
			}
			
			return boards;
		},
		getBoardId: async (_, {boardId}, { Board }) => {
			const board = await Board.findOne({_id: boardId}).populate({
				path: 'list.card',
				model: "Card"
			});
			return board; 
		}
	},

	Mutation: {
		addBoard: async (_, {title,imageUrl,createdBy}, { Board, User }) => {
			const newBoard = await new Board({
				title,
				imageUrl,
				createdBy : createdBy
			}).save();

			const user = await User.findOne({ _id: createdBy});
			if(!user){
				throw new Error('User not found');
			}
			if(user.board){
				const indexFounded = user.board.findIndex(item => newBoard._id.toString() === item.toString());
				if(indexFounded >= 0){
					throw new Error('Board is already exists');
				}
			}
			user.board.push(newBoard._id);
			user.save();
		
			return newBoard;
		},

		addBoardsUser: async (_, {userId, boardId }, {User}) => {
			const user = await User.findOne({ _id: userId});
			if(!user){
				throw new Error('User not found');
			}
			if(user.board){
				const indexFounded = user.board.findIndex(item => boardId.toString() === item.toString());
				if(indexFounded >= 0){
					throw new Error('Board is already exists');
				}
			}
			user.board.push(boardId);
			user.save();
			return user;
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


