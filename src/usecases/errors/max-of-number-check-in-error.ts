export class MaxOfNumberCheckInError extends Error{
    constructor(){
        super('Max of number check-ins exceeded')
    }
}