import React, { memo, useEffect, useState } from 'react';
import { Table, Tag, Button, message } from 'antd';

import { getList, deleteGoods } from '@/service/goods'

const DelGoods = memo(() => {
    const [goodsList, setGoodsList] = useState([]);
    useEffect(async() => {
        const res = await getList();
        res.forEach((item, index) => {
            item.key = index;
        })
        setGoodsList(res);
    }, []);
    const del = async(good) => {
        let list = [...goodsList];
        const result = await deleteGoods({id: good.id, userId: good['user_id']});
        if(result.affectedRows > 0) {
          list = list.filter(item => item.id !== good.id);
          message.success('删除商品成功！')
        } else {
          message.error('删除商品失败！')
        }
        setGoodsList(list);
    }
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id', 
          key: 'id',
          render: text => <a>{text}</a>,
        },
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '商品价格',
          dataIndex: 'price',
          key: 'price',
        },
        {
            title: '商品描述',
            dataIndex: 'des',
            key: 'des',
          },
        {
          title: '分类',
          key: 'classify',
          dataIndex: 'classify',
          render: tag => (
                <Tag color="geekblue" key={tag}>
                    {tag}
                </Tag>
          ),
        },
          {
            title: '修改时间',
            dataIndex: 'updateAt',
            key: 'updateAt',
          },
          {
            title: '库存',
            dataIndex: 'count',
            key: 'count',
          },
          {
            title: '操作',
            dataIndex: '',
            key: 'x',
            render: (tag) => {
                return (<Button type="primary" danger onClick={() => {del(tag)}}>
                    删除
                    </Button>)
            }
          },
      ];
    //   const data = [
    //   ];
    return (
        <div>
            <Table columns={columns} dataSource={goodsList} />
        </div>
    );
});

export default DelGoods;