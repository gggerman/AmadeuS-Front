import { createTheme } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';


const theme = createTheme({
    palette: {
        primary: {
            light: green['A700'],
            main: green[900] ,
            dark: grey[900],
            contrastText: grey[50]
        }
    }
})

export default theme;