import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Switch, Route, Redirect} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../router";
import {observer} from "mobx-react-lite";
import {HOME_ROUTE} from "../utils/consts";
import {useLocation} from "react-router-dom/cjs/react-router-dom";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();

    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {user.isAuth && user.role === "ADMIN" && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={HOME_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;