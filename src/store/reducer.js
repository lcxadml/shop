import { ADD_USER } from './constant'
const initState = {
    user: {}
}

function reducer(state = initState, action) {
    switch(action.type) {
        case ADD_USER:
            return {...state.user, ...action.data};
        default:
            return state;
    }
}
export default reducer;