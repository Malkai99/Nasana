const mongoose = require('mongoose');

const CardSchema = new 	mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true,
	},
	comments: {
		type: String
	}
	expired: {
		type: Date
	}


})

module.exports = mongoose.model('Card', CardSchema);