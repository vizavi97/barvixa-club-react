import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Login} from "./pages/auth/Login";
import {Waiter} from "./pages/private/Main";
import {PreLoader} from "./components/PreLoader";
import {meQuery} from "./store/actions/user.action";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {useToast} from "@chakra-ui/react";
import {AuthLayout} from "./components/layout/auth/AuthLayout";
import {Register} from "./pages/auth/Register";
import {WaiterLayout} from "./components/layout/WaiterLayout";
import {Accountant} from "./pages/private/Accountant/Accountant";


function App() {
  const toast = useToast()
  const {user, loader, message, error, renderCounter} = useSelector((state: RootStateOrAny) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(meQuery())
  }, [dispatch])
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
  }, [renderCounter, toast, error, message]);

  if (loader) return <PreLoader/>

  if (user && user.is_activated && user.role.code === "waiter") {
    return (
      <BrowserRouter>
        <WaiterLayout>
          <Switch>
            <Route exact path='/' component={Waiter}/>
          </Switch>
        </WaiterLayout>
      </BrowserRouter>
    )
  }
  if (user && user.is_activated && user.role.code === "accountant") {
    return (
      <BrowserRouter>
        <WaiterLayout>
          <Switch>
            <Route exact path='/' component={Accountant}/>
          </Switch>
        </WaiterLayout>
      </BrowserRouter>
    )
  }
  return (
    <BrowserRouter>
      <AuthLayout>
        <Switch>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/*' component={Login}/>
        </Switch>
      </AuthLayout>
    </BrowserRouter>
  )
}

export default App;
