import {gql } from "apollo-boost";

// BOARD QUERIES

export const GET_BOARDS = gql`
	query {
		getBoard{
				_id
				title
				imageUrl
				createdBy{
				username
						 }
				}
			}
`;

export const GET_BOARDID = gql` 
	query($boardId: ID!) {
		getBoardId(boardId: $boardId){
			_id
			title
			imageUrl
			createdBy{
				_id
			}
			favorite
			created_at
		}
	}
`;

// USERS QUERIES
export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			_id
			username
			email
			password
			avatar
		}
	}
`

// BOARDS MUTATIONS

export const ADD_BOARD = gql` 
	mutation($title: String!, $imageUrl: String!, $createdBy: ID!) {
  		addBoard(title: $title, imageUrl: $imageUrl, createdBy: $createdBy) {
		    _id
		    title
		    imageUrl
		    favorite
		    createdBy {
      			_id
    		}
   			 created_at
 		 }
	} 
`;

// USER MUTATIONS
export const SIGNIN_USER = gql`
	mutation($username:String!, $password:String!){
  		signinUser(username: $username, password: $password){
			token
  		}
	}
`;

export const SIGNUP_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
  		signupUser(username: $username, email: $email, password: $password) {
   			 token
  		}
	}
`;