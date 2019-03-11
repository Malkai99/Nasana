const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	favorite: {
		type: Boolean,
		default: false
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
	// collaborators: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	required: true,
	// 	ref: 'User'
	// },
	// list: [{
	// 	title: {
	// 		type: String,
	// 		required: true
	// 	},
	// 	card: {
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		required: true,
	// 		ref: 'Card'
	// 	}
	// }]

});

module.exports = mongoose.model('Board', BoardSchema);