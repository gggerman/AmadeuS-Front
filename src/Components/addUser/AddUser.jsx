import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { FormHelperText, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Typography, Container, Paper, Grid, TextField, Button, Snackbar } from '@material-ui/core';
import { Visibility, VisibilityOff, Check, Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { addUser, getAllUsers } from '../../redux/actions/users';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        marginTop:'1vh',
        // height:'100%',
        // alignItems:"center",
    },
    textField: {
        marginBottom: '2vh',
        minWidth:'24vw',
        // justifyContent:"center",
    },
    formHelper:{
        marginTop: '-1.5vh',
    },
    buttom: {
        backgroundColor: '#8e0000',
        color: '#ffffff',
        margin:'1vh',
    },
}))

export default function AddUser(){

    const classes = useStyles();

    const history = useHistory();
    const users = useSelector(({ app }) => app.usersLoaded);
    const dispatch = useDispatch();

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        name:'',
        surname:'',
        // document:'',
        phone:'',
        mail:'',
        password:'',
        showPassword: false,
    })

    useEffect(() => {
        dispatch(getAllUsers());
    },[dispatch])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpenSuccess(false);
        setOpenError(false);
    };

    function validateEmail(mail){
        // let equals = false;
        // users.forEach(user => {
        //     if(user.mail === mail){
        //         equals = true;
        //     }
        // })
        // return equals;
        return users.some(user => {
            return user.mail === mail;
        })
    }

    function validate(input){
        let error = {};

        if(!input.name){
            error.name = 'Debe ingresar su nombre'
        } else if(!/^[a-zA-Z ,.'-]+$/u.test(input.name)){
            error.name = 'El nombre no es válido'
        } else if(input.name.length < 3){
            error.name = 'El nombre debe tener un minimo de 3 letras'
        }

        if(!input.surname){
            error.surname = 'Debe ingresar su apellido'
        } else if(!/^[a-zA-Z ,.'-]+$/u.test(input.surname)){
            error.surname = 'El apellido no es válido'
        } else if(input.surname.length < 3){
            error.surname = 'El apellido debe tener un minimo de 3 letras'
        }

        // if(!input.document){
        //     error.document = 'Debe ingresar su número de documento'
        // } else if(!/^[0-9]+$/u.test(input.document)){
        //     error.document = 'Solo ingrese números'
        // } else if(input.document.length !== 8){
        //     error.document = 'El documento debe tener 8 números'
        // } else if(){
            // error.document = 'Ya hay un usuario registrado con ese número de documento'
        //}

        if(input.phone){
            if(!/^[0-9+ -]+$/u.test(input.phone)){
                error.phone = 'Formato no válido'
            }
        }

        if(!input.mail){
            error.mail = 'Debe ingresar su email'
        } else if(!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(input.mail)){
            error.mail = 'El email no es válido'
        }  else if(validateEmail(input.mail)){
            error.mail = 'El email ya esta registrado'
        }
        
        if(!input.password){
            error.password = 'Debe ingresar su contraseña'
        } else if(!/^[a-zA-Z0-9.-_()]+$/u.test(input.password)){
            error.password = 'Solo ingrese caracteres válidos'
        } else if(input.password.length < 8 || input.password.length > 16){
            error.password = 'La contraseña debe tener entre 8 y 16 caracteres'
        }

        return error;
    }

    function handleInput(e){
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(addUser(input));
        setInput({
            name:'',
            surname:'',
            // document:'',
            phone:'',
            mail:'',
            password:''
        });
        setOpenSuccess(true);
        // setOpenError(true);
    }

    function handleClick(e){
        setInput({
            name:'',
            surname:'',
            // document:'',
            phone:'',
            mail:'',
            password:''
        });
        history.push('/products');
    }

    function handleVisibilityPassword(){
        setInput({
            ...input,
            showPassword: !input.showPassword
        })
    }

    return (
    <Grid container component="main" className={classes.gridContainer}>
        <Container component={Paper} elevation={24} style={{ padding: '2vh', maxWidth: '26vw' }}>
            <Typography align='center' variant='h6' color='primary' style={{ marginBottom: '1vh' }}>Registrate</Typography>
            <form onSubmit={handleSubmit}>

                <TextField
                    className={classes.textField}
                    required
                    name="name"
                    value={input.name}
                    label="Nombre/s"
                    variant="outlined"
                    onChange={handleInput}
                    helperText={error.name}
                />

                <TextField
                    className={classes.textField}
                    required
                    name="surname"
                    value={input.surname}
                    label="Apellido/s"
                    variant="outlined"
                    onChange={handleInput}
                    helperText={error.surname}
                />

                {/* <TextField
                    className={classes.textField}
                    required
                    name="document"
                    value={input.document}
                    label="N° de documento"
                    variant="outlined"
                    onChange={handleInput}
                    helperText={error.document}
                /> */}

                <TextField
                    className={classes.textField}
                    name="phone"
                    value={input.phone}
                    label="N° de teléfono"
                    variant="outlined"
                    onChange={handleInput}
                    helperText={error.phone}
                />

                <TextField
                    className={classes.textField}
                    required
                    name="mail"
                    value={input.mail}
                    label="E-mail"
                    variant="outlined"
                    onChange={handleInput}
                    helperText={error.mail}
                />

                <FormControl variant="outlined">
                    <InputLabel htmlFor="contraseña">Contraseña *</InputLabel>
                    <OutlinedInput
                        id="contraseña"
                        className={classes.textField}
                        required
                        name="password"
                        value={input.password}
                        label="contraseña *"
                        type={input.showPassword ? "text" : "password"}
                        onChange={handleInput}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={handleVisibilityPassword}>
                                    {input.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="contraseña" className={classes.formHelper}>{error.password}</FormHelperText>
                </FormControl>

                <Grid container direction="row" justifyContent="center" alignItems="center">
                    {!error.name && !error.surname && !error.document && !error.mail && !error.password &&
                        <Button type="submit" variant="contained" color="primary" endIcon={<Check />}>
                            Crear cuenta
                        </Button>
                    }

                    <Snackbar open={openSuccess} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" variant="filled">
                            Cuenta creada exitosamente!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openError} autoHideDuration={5000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" variant="filled">
                            Hubo un error al crear la cuenta!
                        </Alert>
                    </Snackbar>

                    <Button className={classes.buttom} variant="contained" endIcon={<Close />} onClick={handleClick}>Cancelar</Button>
                </Grid>
            </form>
        </Container>
    </Grid>
    )
}
