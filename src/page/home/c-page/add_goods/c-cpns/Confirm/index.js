import React, { memo } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const Confirm = memo((props) => {
    const content = props.content;
    const getContent = (text) => (
        <h2 style={{textAlign: "left", width: '600px', margin: '15px auto'}}>{text}：</h2>
    )
    return (
        <div>
            <h2 style={{textAlign: "center"}}>商品确认</h2>
            {getContent('商品名称')}
            <Input placeholder="请输入商品名称" value={content.name} id='0'/>
            {getContent('商品价格')}
            <Input placeholder="请输入商品价格" value={content.price} id='1' />
            {getContent('商品种类')}
            <Input placeholder="请输入商品种类" value={content.classify} id='2' />
            {getContent('商品库存')}
            <Input placeholder="请输入商品库存" value={content.count} id='3' />
            {getContent('添加描述')}
            <TextArea 
            value={content.des}
            placeholder='请输入商品描述' 
            id='4' 
            showCount maxLength={100} 
            required
            />
        </div>
    );
});

export default Confirm;