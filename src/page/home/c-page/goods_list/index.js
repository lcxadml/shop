import React, { memo, useEffect, useState } from 'react';
import { Table, Tag } from 'antd';

import { getList } from '@/service/goods'

const GoodsList = memo(() => {
    const [goodsList, setGoodsList] = useState([]);
    useEffect(async () => {
        const res = await getList();
        res.forEach((item, index) => {
            item.key = index;
        })
        setGoodsList(res);
    }, [])
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
            title: '创建时间',
            dataIndex: 'createAt',
            key: 'createAt',
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
      ];
    //   const data = [
    //   ];
    return (
        <div>
            <Table columns={columns} dataSource={goodsList} />
        </div>
    );
});

export default GoodsList;