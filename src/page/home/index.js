import React, { memo, Suspense } from 'react';
import { renderRoutes } from 'react-router-config'
import { useSelector, shallowEqual } from 'react-redux'

import Header from '../../commponents/Header'
import LeftNav from '../../commponents/Left';
import "./index.css";
const Home = memo((props) => {

    const user = useSelector(state => state, shallowEqual);
    return (
        <div>
            <Header user={user} />
            <div className="body">
                <LeftNav className="left"/>
                <div className="right">
                    <Suspense fallback={<h2></ h2>}>
                    { renderRoutes(props.route.routes) }
                    </Suspense>
                </div>
            </div>
        </div>
    );
});

export default Home;