import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, TextField, Button, Snackbar } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        marginTop:'5vh',
    },
    textField: {
        marginBottom: '2vh',
        width:'24vw',
    },
    buttom: {
        backgroundColor: '#8e0000',
        color: '#ffffff',
        marginLeft:'1vh',
    },
}))

export default function AddUser(){

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState({});
    const [input, setInput] = useState({
        firstName:'',
        lastName:'',
        document:'',
        email:'',
        password:''
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };

    function validate(input){
        let error = {};

        if(!input.firstName){
            error.firstName = 'Debe ingresar su nombre'
        } else if(!/^[a-zA-Z,.'-]+$/u.test(input.firstName)){
            error.firstName = 'El nombre no es válido'
        } else if(input.firstName.length < 3){
            error.firstName = 'El nombre debe tener un minimo de 3 letras'
        }

        if(!input.lastName){
            error.lastName = 'Debe ingresar su apellido'
        } else if(!/^[a-zA-Z,.'-]+$/u.test(input.lastName)){
            error.lastName = 'El apellido no es válido'
        } else if(input.lastName.length < 3){
            error.lastName = 'El apellido debe tener un minimo de 3 letras'
        }

        if(!input.document){
            error.document = 'Debe ingresar su número de documento'
        } else if(!/^[0-9]+$/u.test(input.document)){
            error.document = 'Solo ingrese los numeros'
        } else if(input.document.length !== 8){
            error.document = 'El documento debe tener 8 números'
        } // else if(){
            // error.document = 'Ya hay un usuario registrado con ese número de documento'
        //}

        if(!input.email){
            error.email = 'Debe ingresar su email'
        } //else if(!/^[a-zA-Z,.'-]+$/u.test(input.email)){
        //     error.email = 'El apellido no es válido'
        // } else if(input.email.length < 3){
        //     error.email = 'El apellido debe tener un minimo de 3 letras'
        // } // else if(){
            // error.email = 'Ya hay un usuario registrado con ese email'
        //}
        

        if(!input.password){
            error.password = 'Debe ingresar su contraseña'
        } else if(!/^[a-zA-Z0-9()-_.]+$/u.test(input.password)){
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
        <Snackbar open={true} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
            Cuenta creada exitosamente!
        </Alert>
        </Snackbar>
    }

    return <form onSubmit={handleSubmit}>
    <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.gridContainer}>
        {/* <form submit={handleSubmit}> */}
        <TextField
            className={classes.textField}
            required
            name="firstName"
            value={input.firstName}
            label="Nombre/s"
            variant="outlined"
            onChange={handleInput}
            helperText={error.firstName}
        />
        <TextField
            className={classes.textField}
            required
            name="lastName"
            value={input.lastName}
            label="Apellido/s"
            variant="outlined"
            onChange={handleInput}
            helperText={error.lastName}
        />
        <TextField
            className={classes.textField}
            required
            name="document"
            value={input.document}
            label="N° de documento"
            variant="outlined"
            onChange={handleInput}
            helperText={error.document}
        />
        <TextField
            className={classes.textField}
            required
            name="email"
            value={input.email}
            label="E-mail"
            variant="outlined"
            onChange={handleInput}
            helperText={error.email}
        />
        <TextField
            className={classes.textField}
            required
            name="password"
            value={input.password}
            label="Contraseña"
            type="password"
            variant="outlined"
            onChange={handleInput}
            helperText={error.password}
        />
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Button type="submit" variant="contained" color="primary" endIcon={<Check />}>
                Crear cuenta
            </Button>
                
            {/* <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled">
                    Cuenta creada exitosamente!
                </Alert>
            </Snackbar> */}
            <Button className={classes.buttom} variant="contained" endIcon={<Close />}>Cancelar</Button>
        </Grid>
        {/* </form> */}
    </Grid>
    </form>
}
