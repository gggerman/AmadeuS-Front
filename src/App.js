import Home from './components/home/Home';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


function App() {
  return (
    <BrowserRouter>
     <ThemeProvider theme ={theme}>
    
        <Route path= ""> <Home /> </Route>

    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
