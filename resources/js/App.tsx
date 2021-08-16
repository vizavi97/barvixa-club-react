import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Main} from "./pages/main/Main";
import {CabinetLayout} from "./components/layout/cabinet/CabinetLayout";
import {Invest} from "./pages/invest/Invest";
import {Contacts} from "./pages/contacs/Contacts";
import {Wallet} from "./pages/wallet/Wallet";
import {AuthLayout} from "./components/layout/auth/AuthLayout";
import {Register} from "./pages/auth/Register";
import {Login} from "./pages/auth/Login";
import {RestorePassword} from "./pages/auth/RestorePassword";
import {RestorePasswordField} from "./pages/auth/RestorePasswordField";
import {Mining} from "./pages/mining/Mining";
import {Settings} from "./pages/settings/Settings";
import {Stacking} from "./pages/stacking/Stacking";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {meQuery} from "./store/actions/user.action";
import {PreLoader} from "./components/PreLoader";
import {useToast} from "@chakra-ui/react";
import {Exchange} from "./pages/exchange/Exchange";

function App() {
    const toast = useToast()
    const {user, loader, message, error,renderCounter} = useSelector((state: RootStateOrAny) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {dispatch(meQuery())}, [dispatch])
    useEffect(() => {
        if (message) {
            toast({
                title: error ? "Error" : "Success",
                position: "top",
                description: message,
                status: error ? "error" : "success",
                duration: 2000,
                isClosable: true,
            })
        }
    }, [renderCounter, toast,error,message]);

    if (loader) {return (<PreLoader/>)}

    if (user) {
        return (
            <BrowserRouter>
                <Switch>
                    <CabinetLayout>
                        <Route exact path='/' component={Main}/>
                        <Route exact path='/invest' component={Invest}/>
                        <Route exact path='/contacts' component={Contacts}/>
                        <Route exact path='/wallet' component={Wallet}/>
                        <Route exact path='/mining' component={Mining}/>
                        <Route exact path='/exchange' component={Exchange}/>
                        <Route exact path='/stacking' component={Stacking}/>
                        <Route exact path='/settings' component={Settings}/>
                        {/*<Redirect from='*' to='/' />*/}
                    </CabinetLayout>
                </Switch>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
            <AuthLayout>
                <Switch>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/restore-password' component={RestorePassword}/>
                    <Route exact path='/restore-message' component={RestorePasswordField}/>
                    <Route exact path='/*' component={Login}/>
                </Switch>
            </AuthLayout>
        </BrowserRouter>
    );
}

export default App;
