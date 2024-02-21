---
To Do: false
trello_plugin_note_id: V9FvDcq7XyH9KWg2jNRUU
trello_board_card_id: 65c220bf14f6c41810a2283e;65c3185e162cee943ec8d960
---

imageUrl: {
	type: String,
},
title: {
	type: String,
	required: true
},
text: {
	type: String,
	required: true
},
externalLink: {
	type: String
}
createdBy: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
}
linkedProjects :  {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Project',
} ==> Article can show in which projects it's being referenced