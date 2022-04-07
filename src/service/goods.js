import request from './request';

export const getList = async() => {
    return new Promise((resolve, reject) => {
        request.get('/goods/list').then(res => {
            res.forEach(item => {
                item.price = `￥${item.price.toFixed(2)}`;
            });
            resolve(res);
        }).catch(err => {
            reject(err);
        })
    });
}
export const addGoods = async (data) => {
    return request.post('/goods', data);
}
export const update = async (data) => {
    return request.patch('/goods', data);
}
export const deleteGoods = async ({id, userId}) => {
    return request.delete(`/goods/${id}/${userId}`);
} 