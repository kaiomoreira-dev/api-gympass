export class InvalidUsersCredentialsError extends Error{
    constructor(){
        super('Invalid user credentials!')
    }
}