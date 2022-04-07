import React, { memo, useEffect } from 'react';
import { Steps, Button, message } from 'antd';

import { addGoods } from '@/service/goods';

import AddContent from './c-cpns/AddContent';
import AddImage from './c-cpns/AddImage';
import Confirm from './c-cpns/Confirm';
import Result from './c-cpns/Result';
import "./index.css"
const { Step } = Steps;
const Add = memo(() => {
    const [current, setCurrent] = React.useState(0);
    const [ content, setContent ] = React.useState({});
    const [ goodsId, setGoodsId ] = React.useState('');
    const next = () => {
        let text = "";
        const keyCount = Object.keys(content);
        if(keyCount.length < 5) {
            text = '请填写完整信息！'
        }
        keyCount.forEach(item => {
            if(!content[item]) {
                text = `${item}不能为空`;
            }
        })
        if(text) {
            message.error(text);
        } else {
          if(current === 0) {
            submit();
          }
            setCurrent(current + 1);
        }
      };
    
      const prev = () => {
        setCurrent(current - 1);
      };
    const changeCard = () =>{
        if(current === 0) {
            return <AddContent content={content} setContent={setContent} />
        } else if(current === 1) {
            return <AddImage goodsId={goodsId} />
        } else if(current === 2){
            return <Confirm content={content}/>
        } else {
          return <Result />
        }
    };
    const submit = async() => {
        const result = await addGoods(content);
        setGoodsId(result.insertId);
        if(result.affectedRows > 0) {
            message.success('添加商品成功!');
        } else {
            message.error("添加商品失败,请重新尝试!");
        }
        
    }
    const steps = [
        {
          title: '内容',
          content: 'add_content',
        },
        {
          title: '图片',
          content: 'add_image',
        },
        {
          title: '确认',
          content: 'confire',
        },
      ];
      
    return (
        <div className='add_goods'>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{changeCard()}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              下一步
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={next}>
              提交
            </Button>
          )}
          {current > 0 && current < 3 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              上一步
            </Button>
          )}
        </div>
      </div>
    );
});

export default Add;