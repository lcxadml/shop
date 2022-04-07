import request from './request'

export const login = (name, pwd) => {
    return request.post('/login', { name, pwd });
}