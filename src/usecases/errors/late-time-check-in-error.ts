export class LateTimeCheckInError extends Error{
    constructor(){
        super('Exceeded check-in wait time')
    }
}