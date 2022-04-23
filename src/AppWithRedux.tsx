import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import CircularProgressBar from './components/CircularProgress/CircularProgressBar';
import { Login } from './components/Login/Login';
import { TodolistsList } from './components/TodolistsList';
import { initializeAppTC } from './state/app-reducer/app-reducer';
import { AppRootStateType } from './state/store';

export function AppWithRedux() {

    const isInitialized = useSelector< AppRootStateType, boolean >(state => state.app.isInitialized)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(initializeAppTC())
    }, [])

    if(!isInitialized){
        return <CircularProgressBar/>
    }


    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: Page not found</h1>}/>
                    <Redirect from={'*'} to={'/404'} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}






