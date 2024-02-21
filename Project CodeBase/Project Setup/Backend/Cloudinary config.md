---
To Do: false
trello_plugin_note_id: j6EZzagxph7mMBJdEHW27
trello_board_card_id: 65c220bf14f6c41810a2283e;65c31a46914946ce85669f69
---
1. **User Fills Form**: The user fills out the form to create a new article. This form includes fields for the article title, text, and an option to upload an image.
    
2. **Upload Image**: When the user selects an image to upload, your front-end code triggers a function to handle the file upload using Apollo Client.
    
3. **Send Mutation to Server**: Apollo Client sends a GraphQL mutation to the server, passing along the selected image file as a variable.
    
4. **Server Handles Upload**: The server receives the mutation request and handles the file upload logic. This includes uploading the image to Cloudinary using the Cloudinary API.
    
5. **Get Cloudinary URL**: Once the image is successfully uploaded to Cloudinary, the server generates the Cloudinary URL for the uploaded image and returns it as a response to the client.
    
6. **Set Image URL**: Back in the front-end code, the Cloudinary URL returned by the server is received as a response. This URL is then set as the value of the `imageUrl` state in the form.
    
7. **User Submits Form**: After filling out the entire form, including the image URL, the user clicks a button to submit the form.
    
8. **Send Mutation to Create Article**: Apollo Client sends another GraphQL mutation to the server, this time passing all the form data, including the article title, text, and the Cloudinary URL of the image.
    
9. **Server Creates Article**: The server receives the mutation request, validates the input data, and creates a new article in the MongoDB database with the provided details, including the Cloudinary URL of the image.
    
10. **Confirmation to User**: Optionally, the server can send a response confirming that the article has been successfully created.