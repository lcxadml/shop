import React, { memo } from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const ResultPage = memo(() => {
    const history = useHistory();

    const go = (path) => {
        history.push(path);
    }
    const goAdd = () => {
        history.go(0)
    }
    return (
        <Result
            status="success"
            title="添加商品成功！"
            subTitle="可以在商品列表中进行查看，在删除商品中可以进行删除！"
            extra={[
            <Button type="primary" key="console" onClick={goAdd}>
                继续添加
            </Button>,
            <Button key="buy"  onClick={() => {go('/home/list')}}>回到首页</Button>,
            ]}
        />
    );
});

export default ResultPage;