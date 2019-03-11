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