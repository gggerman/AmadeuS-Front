import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getAllUsers } from '../../redux/actions/users';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Grid, Container, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Modal, Snackbar } from '@material-ui/core';
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: '#8e0000',
        color: '#ffffff',
    },
    tableCell:{
        padding:'1vw',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export default function UserManagement(){

    const classes = useStyles();

    const users = useSelector(({ app }) => app.usersLoaded);
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(getAllUsers());
    },[users])

    async function handlePrivileges(user){
        user.isAdmin = !user.isAdmin;
        await axios.put(`${REACT_APP_SERVER}/users/${user._id}`, user);
        dispatch(getAllUsers());
    }

    async function handleDelete(id){
        await axios.delete(`${REACT_APP_SERVER}/users/${id}`);
        dispatch(getAllUsers());
        setOpenModal(false);
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        setOpen(false);
    };

    function handleOpenModal(){
        setOpenModal(true);
    }

    function handleCloseModal(){
        setOpenModal(false);
    }


    return (
        <Grid container component="main">
            <Container component={Paper} style={{ maxWidth: '80vw', minWidth: '50vw' }}>
                <Grid container justifyContent="center">
                    <Button onClick={() => (history.push('/'))}>Home</Button>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell} style={{ backgroundColor: '#000000', color: '#ffffff' }}>Apellido/s</TableCell>
                            <TableCell className={classes.tableCell} align="left" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Nombre/s</TableCell>
                            <TableCell className={classes.tableCell} align="left" style={{ backgroundColor: '#000000', color: '#ffffff' }}>E-mail</TableCell>
                            <TableCell className={classes.tableCell} align="center" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Privilegios</TableCell>
                            <TableCell className={classes.tableCell} align="center" style={{ backgroundColor: '#000000', color: '#ffffff' }}>Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map(user => (
                            <TableRow key={user._id}>
                                <TableCell className={classes.tableCell} component="th" scope="row">{user.surname}</TableCell>
                                <TableCell className={classes.tableCell} align="left">{user.name}</TableCell>
                                <TableCell className={classes.tableCell} align="left">{user.mail}</TableCell>
                                <TableCell className={classes.tableCell} align="center">
                                    {user.isAdmin ?
                                        <Button variant="contained" color="secondary" onClick={() => handlePrivileges(user)}>
                                            Quitar privilegios
                                        </Button>
                                        :
                                        <Button variant="contained" color="primary" onClick={() => handlePrivileges(user)}>
                                            Dar privilegios
                                        </Button>
                                    }
                                </TableCell>
                                <TableCell className={classes.tableCell} align="center">
                                    <Button variant="contained" className={classes.button} onClick={() => handleOpenModal()}>
                                        Eliminar
                                    </Button>
                                    <Modal
                                        open={openModal}
                                        onClose={handleCloseModal}
                                        aria-labelledby="title"
                                        aria-describedby="description"
                                        className={classes.modal}
                                    >
                                        <div className={classes.paper}>
                                            <h2 id="title" style={{display:'flex', justifyContent:'center'}}>¡ATENCIÓN!</h2>
                                            <p id="description">¿Seguro que deseas eliminar este usuario?</p>
                                            <Grid container justifyContent="center">
                                                <Button variant="contained" color="primary" style={{marginRight:'1vh'}} onClick={() => handleDelete(user._id)}>Confirmar</Button>
                                                <Button variant="contained" className={classes.button} style={{marginLeft:'1vh'}} onClick={handleCloseModal}>Cancelar</Button>
                                            </Grid>
                                        </div>
                                    </Modal>
                                </TableCell>
                            </TableRow>
                        ))}
                        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" variant="filled">
                                Usuario eliminado exitosamente!
                            </Alert>
                        </Snackbar>
                    </TableBody>
                </Table>
            </Container>
        </Grid>
    )
}