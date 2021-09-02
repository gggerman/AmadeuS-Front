import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Detail from '../detail/Detail';
import Home from '../home/Home';
import Navbar from '../ui/Navbar';

const AppRouter = () => {
    return (
        <>
            <Navbar />

            <div>
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Route path='/detail/:id' component={ Detail } />                                      
                
                    <Redirect to='/' />
                </Switch>
            </div>
        </>
    )
}

export default AppRouter
