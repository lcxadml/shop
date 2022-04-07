import React, { useState, memo, useEffect } from 'react';
import { Table, Input, InputNumber, 
         Popconfirm, Form, Typography,
          message } from 'antd';

import { getList, update } from '@/service/goods';
import "./index.css";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.id === editingKey;
  useEffect(async() => {
    const result = await getList();
    setData(result);
  }, [])
  const edit = (record) => {
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      classify: record.classify,
      count: record.count,
      des: record.des,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        const result = await update({...row, userId: item['user_id'], id: item['id']});
        if(result.affectedRows) {
          setData(newData);
          setEditingKey('');
          message.success('修改成功!')
        }
        
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
        message.error('修改失败!')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        width: '5%',
        editable: false,
      },
    {
      title: '姓名',
      dataIndex: 'name',
      width: '10%',
      editable: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      width: '10%',
      editable: true,
    },
    {
      title: '分类',
      dataIndex: 'classify',
      width: '10%',
      editable: true,
    },
    {
      title: '更商品描述',
      dataIndex: 'des',
      width: '20%',
      editable: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateAt',
      width: '20%',
      editable: false,
    },
    {
      title: '数量',
      dataIndex: 'count',
      width: '10%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              确定
            </Typography.Link>
            <Popconfirm title="确定要取消吗?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            修改
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'count' || col.dataIndex === "price" ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
      rowKey="id"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
const Change = memo(() => {
    return (
        <EditableTable />
    );
});

export default Change;