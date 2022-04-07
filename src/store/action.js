import { ADD_USER } from './constant'
export const adduserAction = (data) => {
    return {
        type: ADD_USER,
        data,
    }
};