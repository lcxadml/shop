import React, { memo, useEffect } from 'react';
import { Input } from 'antd';
import "./index.css"
const { TextArea } = Input;
const AddContent = memo((props) => {
    const getContent = (text) => (
        <h2 style={{textAlign: "left", width: '600px', margin: '15px auto'}}>{text}：</h2>
    )

    const setContent = props.setContent;
    const content = props.content;

    const onBlur = e => {
        const value = e.target.value;
        const id = e.target.id;
        switch(id) {
            case '0':
                setContent({...content, name: value});
                break;
            case '1':
                setContent({...content, price: value});
                break;
            case '2':
                setContent({...content, classify: value});
                break;
            case "3":
                setContent({...content, count: value});
                break;
            case "4":
                setContent({...content, des: value});
                break;
            default: 
                break;
        }
    }
    return (
        <div className='container'>
            <h3>添加商品</h3>
            {getContent('商品名称')}
            <Input placeholder="请输入商品名称" defaultValue={content['name']} id='0' onBlur={onBlur}/>
            {getContent('商品价格')}
            <Input placeholder="请输入商品价格" defaultValue={content['price']} type='number'  id='1' onBlur={onBlur} />
            {getContent('商品种类')}
            <Input placeholder="请输入商品种类" defaultValue={content['classify']}  id='2' onBlur={onBlur} />
            {getContent('商品库存')}
            <Input placeholder="请输入商品库存" defaultValue={content['count']} type='number'  id='3' onBlur={onBlur} />
            {getContent('添加描述')}
            <TextArea 
             defaultValue={content['des']}
            placeholder='请输入商品描述' 
            id='4' onBlur={onBlur} 
            showCount maxLength={100} 
            required
            />
        </div>
    );
});

export default AddContent;