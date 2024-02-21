---
To Do: false
trello_plugin_note_id: Ct3PHnyvyHodlU7SOQrUG
trello_board_card_id: 65c220bf14f6c41810a2283e;65c3185e162cee943ec8d960
---


username: {
	type: String,
	required: true
	},
email: {
	type: String,
	required: true

},
passwordHash: {
	type: String,
	required: true
},

projects: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Project'
},
articles: {
	authored: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	}],
	liked: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	}],

}
	

