# Chat-Application

## This is a project I made that is designed to be a chat room with login and admin functionality

Requirements for this code to work properly: 
* MongoDB (This projet was designed to work with mongoDB for storage of user data)
* Live Host Extension for Microsoft Visual Studio Code

Firstly you want to run the commmand npm i to install all necesssary dependencies for this project

When you get to the login part of this projectwich should be the first page you want to create an account. Accounts in this project will either have administration permmissions or they will not. When you create an account you will want to decide if that account will be an admin or not. If you want them to be an admin you will have to change the isAdmin boolean in the user schema from false (which is default) to true in the database. Once you do this it will update the account to be an admin which allows you to edit chatrooms created by other users, delete messages by users and more.
