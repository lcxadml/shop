import React, { memo } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import './index.css';
const { Dragger } = Upload;

const getProps = (goodsId) => ({
  name: 'picture',
  multiple: true,
  action: 'http://localhost:8888/upload/picture?goodsId='+goodsId,
  headers: {
    Authorization: sessionStorage.getItem('token')
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') { 
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
});

const uploadShop = memo((props) => {
    return (
        <div className='dragger_container'>
            <Dragger {...getProps(props.goodsId)}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或者拖拽添加你的商品图片</p>
                <p className="ant-upload-hint">
                    请您将每张图片的大小控制在1M以内，并且最多上传6张图片
                </p>
        </Dragger>
        </div>
    );
});

export default uploadShop;