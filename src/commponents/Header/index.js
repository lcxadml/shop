import React, { memo } from 'react';
import { PageHeader, Button, Tag } from 'antd';
import "./index.css";
import { useHistory } from 'react-router-dom';

const Header = memo((props) => {
    const history = useHistory();
    const user = props.user;

    const btnLogout = () => {
        sessionStorage.setItem('token', '');
        history.push('/login');
    }

    return (
        <PageHeader
        title={user.name}
        className="site-page-header"
        subTitle="这个人很懒，什么都没留下~"
        tags={<Tag color="blue">商家</Tag>}
        extra={[
        <Button key="1" type="danger" onClick={btnLogout}>
            注销
        </Button>,
        ]}
        avatar={{ src: user['avatar_url'] }}
    >
  </PageHeader>
    );
});

export default Header;