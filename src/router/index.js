import React from "react"
import { Redirect } from "react-router-dom";
// import Login from "@/page/login";
// import Home from '@/page/home'
// import Add from '@/page/home/c-page/add_goods'
// import GoodsList from '@/page/home/c-page/goods_list'
// import ChangeGoods from '@/page/home/c-page/change_goods'
// import DelGoods from '@/page/home/c-page/del_goods'


const Login = React.lazy(() => import('@/page/login'));
const Home = React.lazy(() => import('@/page/home'));
const Add = React.lazy(() => import('@/page/home/c-page/add_goods'));
const GoodsList = React.lazy(() => import('@/page/home/c-page/goods_list'));
const ChangeGoods = React.lazy(() => import('@/page/home/c-page/change_goods'));
const DelGoods = React.lazy(() => import('@/page/home/c-page/del_goods'));

const routes = [
    {
        path: '/',
        exact: true,
        component: Login,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/home',
        component: Home,
        routes: [
            {
                path: "/home/",
                exact: true,
                render: () => {
                    return (
                        <Redirect to="/home/list"/>
                    )
                }
            },
            {
                path: '/home/add',
                exact: true,
                component: Add,
            },
            {
                path: '/home/list',
                exact: true,
                component: GoodsList,
            },
            {
                path: '/home/del',
                exact: true,
                component: DelGoods,
            },
            {
                path: '/home/change',
                exact: true,
                component: ChangeGoods,
            },
        ]
    }
]

export default routes;