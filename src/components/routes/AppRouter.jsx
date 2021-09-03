import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductDetail from '../productdetail/ProductDetail';
import Home from '../home/Home';
import AdminPanel from '../adminPanel/AdminPanel';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';


const AppRouter = () => {
    return (
        <>
            <div>
            <ThemeProvider theme ={theme}>
                <Switch>
                    <Route exact path='/' component={ Home } />
                    <Route path='/detail/:id' component={ ProductDetail } />                                      
                    <Route path='/admin' component = {AdminPanel}/>
                    <Redirect to='/' />
                </Switch>
                </ThemeProvider>
            </div>
        </>
    )
}

export default AppRouter
