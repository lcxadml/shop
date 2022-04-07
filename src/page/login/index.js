import React, { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { message, Input, Button, Checkbox  } from 'antd';
import { useHistory } from 'react-router-dom'
import { UserOutlined, LockOutlined  } from '@ant-design/icons';

import { adduserAction } from '../../store/action'
import { login } from '@/service/login'
import bgimg from '../../assets/image/dog.jpg'
import "./index.css"

const Login = memo(() => {
    const isRember = sessionStorage.getItem('pwd') ? true : false;
    const userRef = useRef();
    const pwdRef = useRef();
    const rememberRef = useRef();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.input.value = sessionStorage.getItem('name');
        pwdRef.current.input.value = sessionStorage.getItem('pwd');
    }, [])

  
    const loginClick = () => {
        const name = userRef.current.input.value;
        const pwd = pwdRef.current.input.value;
        const isRe = rememberRef.current.input.checked;
        login(name, pwd).then(res => {
            if(res.result) {
                // 判断是否记住密码
                if(isRe) {
                    saveUser(name, pwd);
                } else {
                    saveUser();
                }
                dispatch(adduserAction(res.user));
                sessionStorage.setItem('token', res.token);
                history.push('/home');
            } else {
                message.error(res.message);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    const saveUser = (user = "", pwd = "") => {
        sessionStorage.setItem('name', user);
        sessionStorage.setItem('pwd', pwd);
    }

    return (
        <div className='login_container'>
            <img className='image' src={bgimg} alt="" />
            <div className="login_form">
                <div className="title">
                    后台管理系统登录界面
                </div>
                <div className="username">
                    <Input size="large" ref={userRef} placeholder="请输入用户名" prefix={<UserOutlined />} />
                </div>
                <div className="password">
                    <Input.Password size="large" ref={pwdRef} placeholder="请输入密码" prefix={<LockOutlined />} />
                </div>
                <div className="remember">
                 <Checkbox ref={rememberRef} defaultChecked={isRember}>记住密码</Checkbox>
                </div>
                <div className="submit">
                <Button className='login_btn' type="primary" block onClick={loginClick}>登录</Button>
                <Button block>注册</Button>
                </div>
            </div>
        </div>
    );
});

export default Login;