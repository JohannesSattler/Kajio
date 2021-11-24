# Kajio

## Description: 
Kajio is an anonymous social media platform where you can post thoughts, pictures and ideas. With every post other users will be able to either upvote, downvote, or comment on the post. There will be other sections outside of the regular post feed that feature the most liked posts of the day, the most interacted with posts of a certain time frame, and the newest posts for those who like to be first on the scene. 

## MVP: 

Model/Schema (User / Post)
Routes
Read me
Name
general forum
sign in / sign up
post create
comment section
upvotes
hot / trendy / new posts
profile section (manage your posts)

## Backlog:
Random API chat forum
geographical forum
Dark mode
Nodemailer 
date tag for posts
search function/topic filter (if theres times….) by topic
leaderboard 
image posts

## Data Structure:
server.js
- Require the app
- port env
- app.listen for the port

app.js
- connect-mongo and express-sessions
- start handling the routes
- module.exports
- require hbs
- require config
- show project name here

## ROUTES
- GET/
	-renders login-signup.hbs
- GET/ auth/ register
	-redirect to / if user is logged in
	-renders add-register.hbs
	-redirect to /login if user clicks login here
- POST/auth/register
	-redirects to / if user is logged in
	body: email, password, guest, username, register with facebook, register with google
- POST/ auth/ login
  - redicts to / if user is logged in
	- body:username, password
	- redirects to /register if user clicks the register button
- POST/auth/ logout
	- body: empty
- GET/ 
  - renders homepage.hbs
- POST/homepage
	- trendy
	- hot
	- new
	- redirect to /comment when a comment is posted
	- redirect to /profile when the profile icon is clicked
- GET/homepage
	-renders homepage.hbs
	-includes trendy, hot, new
	-redirect to /newpost when the pen icon is clicked
- POST/ newpost
	-redirect /homepage when post is created
- GET/comment
	-redirect to /newpost when post icon is clicked
	- redirect to /profile when profile icon is clicked

## MODELS
- UserModel: 
  - user: 	String, Must be unique ( key for populating data )
  - email: 		String, Must be unique and validated
  - password: 	String ( hashed )
  - total Upvotes: 	Number
  - post created: 	ref to PostModel
  - post upvoted: 	ref to PostModel ( *optional )
  - comment: 	refs to CommentModel

- PostModel:
  - user: 		String ( key for populating data )
  - Sentence: 	String
  - upvotes: 	Number
  - timeCreated: 	Date?
  - comments: 	ref to CommentModel

- CommentModel: 
  - user: 	String ( key for populating data )
  - Sentence: 	String
  - timeCreated: 	Date?

# Links

[Github Repository](https://github.com/JohannesSattler/Kajio)

[Trello Board](https://trello.com/b/DZP4W8RC/kajio)

## Deploy
[Not working Github Pages](https://johannessattler.github.io/Kajio)
[Deploy link](https://kajio.herokuapp.com/)

