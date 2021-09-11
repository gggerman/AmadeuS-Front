import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, FormHelperText, Input, InputLabel, Button, Typography} from '@material-ui/core';
import SaveRounded from '@material-ui/icons/SaveRounded';
import ReplyRoundedIcon from '@material-ui/icons/ReplyRounded';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/actions/addCategory';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { HomeRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../redux/actions/getAllCategories';
import { useSelector } from 'react-redux';
import { validar } from '../../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
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
      msg: {
        fontStyle: 'italic'
      },

    }));     

export const AddCategory = ( { history} ) => {
    const classes = useStyles();
    
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [errors, setErrors] = useState(false)  
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false)

   const categories = useSelector(state => state.app.categoriesLoaded)


    console.log(categories)

    const handleInputChange = ( e ) => {
        setErrors(false)
        setName(e.target.value)            
    }

    useEffect( () =>{
      dispatch( getAllCategories() )
    }, [])
       
    const handleSubmit = ( e ) => {
      
      e.preventDefault();         
      if( name.trim().length > 3  ) {    
        if( validar( name, categories ) ){
          setOpenError(true)
        } else {        
          dispatch( addCategory( name.trim() ) )
          setOpen(true)
          setErrors(false)
          setName('')
          }
      } else {  
        setErrors( true )
      }             
    }

    const handleClose = () => {
        setOpen(false);
      };

      const handleCloseError = () => {
        setOpenError(false);
      };

    const handleReturn = () => {
        history.goBack()
    }

    return (
        <Box 
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            height='90vh'
            >
            <Typography  variant='h3' align='center' color='primary'>
                Crear nueva categoria
            </Typography>
            <br />

            <form  
                autoComplete="off"
                className={ classes.root }
                onSubmit={ handleSubmit }    
                > 
                <FormControl >
                    <InputLabel htmlFor='my-input'>nombre de la categoria</InputLabel>
                        <Input 
                            required
                            id="component-error"
                            aria-describedby='"component-error-text'
                            value={ name }
                            onChange={ handleInputChange }
                            error={errors}                   
                            />                            
                    <FormHelperText id="component-error"> 4 caracteres min</FormHelperText>
                </FormControl>
                
                <br/> 

                <Button m='2rem'
                variant="contained" 
                color="primary"
                endIcon={<SaveRounded/>}
                type='submit'
                >
                guardar
                </Button>

                <Button
                onClick={ handleReturn }
                variant="contained" 
                color="primary"
                endIcon={<ReplyRoundedIcon />}
                >
                regresar
                </Button>  

                <Button 
                    component={ Link } to='/'
                    variant='contained'
                    color='primary'
                    endIcon={<HomeRounded />}
                    >
                    Home
                </Button>             
            </form>
            
            {
                errors ? <Typography variant='h5' color='error' className={ classes.msg }>
                             El nombre debe ser mayor a 4 caracteres
                        </Typography> : null
            }           

            <div>      
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">Creacion exitosa</h2>            
                        </div>
                    </Fade>
                </Modal>
            </div>

            <div>      
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={openError}
                    onClose={handleCloseError}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={openError}>
                        <div className={classes.paper}>
                            <h2 id="transition-modal-title">La categoria ya existe!!</h2>
                            <p id="transition-modal-description">Click para cerrar</p>            
                        </div>
                    </Fade>
                </Modal>
            </div>
        </Box>      
      );
}
