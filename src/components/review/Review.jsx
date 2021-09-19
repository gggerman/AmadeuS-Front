import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography, TextField, Button, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useAuth0 } from "@auth0/auth0-react"; 
import getAllReviews from "../../redux/actions/getAllReviews";
const { REACT_APP_SERVER } = process.env;

const useStyles = makeStyles((theme) => ({
    button: {
        width:'100%',
    },
    textarea: {
        marginTop:'2vh',
        marginBottom:'2vh',
    },
}));

export default function Review({product}) {

    const classes = useStyles();
    const { user } = useAuth0();
    const dispatch = useDispatch();
    const reviews = useSelector(({ app }) => app.reviewsLoaded);
    const [opinion, setOpinion] = useState("");
    const [punctuation, setPunctuation] = useState(0);
    const [edit, setEdit] = useState(false);
    const [review, setReview] = useState({});

    let suma = 0;
    let cant = 0;

    useEffect(() => {
        dispatch(getAllReviews());
    }, [dispatch]);

    const handleInputChange = (e) => {
        setOpinion(e.target.value);
    };

    async function handleSubmit(e){
        e.preventDefault();
        let date = new Date();
        date = date.toLocaleString();
        let review = {
            punctuation,
            opinion,
            date,
            modified: "",
            user:{
                name: user.name,
                mail: user.email,
                picture: user.picture,
            },
        };
        await axios.post(`${REACT_APP_SERVER}/reviews/${product._id}`, review);
        setOpinion('');
        setPunctuation(0);
        dispatch(getAllReviews());
    };

    async function handleDelete(id){
        await axios.delete(`${REACT_APP_SERVER}/reviews/${id}`);
        dispatch(getAllReviews());
    }

    function handleEdit(review){
        setReview(review);
        setPunctuation(review.punctuation);
        setOpinion(review.opinion);
        setEdit(true);
    }

    async function handleModification(){
        let date = new Date();
        date = date.toLocaleString();
        let reviewEdit = {
            ... review,
            punctuation: punctuation,
            opinion: opinion,
            modified: date
        };
        setOpinion('');
        setPunctuation(0);
        setEdit(false);
        await axios.put(`${REACT_APP_SERVER}/reviews/${review._id}`, reviewEdit);
        dispatch(getAllReviews());
    }

    return (
        <>
            {reviews?.forEach(review => {
                if(review.product._id === product._id){
                    suma += review.punctuation;
                    cant++;
                }
            })}
            <Grid container component="main" direction="column" alignItems="center">
                <Box component="fieldset" mb={3} borderColor="primary" style={{width: '33vw'}}>
                    <Typography variant='h6' align="center">Calificación General</Typography>
                    <Grid container justifyContent="center" style={{marginTop:'2vh', marginBottom:'2vh'}}>
                        {suma / cant >= 0 &&
                            <Typography variant='h6' style={{ marginRight: '1vw' }}>{(suma / cant).toFixed(1)}</Typography>
                        }
                        <Rating value={suma / cant} precision={0.1} size="large" readOnly />
                    </Grid>
                    {suma / cant >= 0 &&
                        <Typography align="center">Promedio de {cant} opiniones</Typography>
                    }
                </Box>
                {user &&
                    <Box component="fieldset" mb={3} borderColor="primary" style={{ width: '33vw' }}>
                        {console.log(user)}
                        <Typography component="legend">Dejanos tu valoración del producto</Typography>
                        <Grid container justifyContent="space-around" style={{marginTop:'1vh'}}>
                            <Typography component="legend">Puntuación</Typography>
                            <Rating
                                value={punctuation}
                                onChange={(event, newValue) => {
                                    setPunctuation(newValue);
                                }}
                            />
                        </Grid>
                        <TextField
                            id="standard-multiline-static"
                            name="opinion"
                            label="Comentario"
                            value={opinion}
                            multiline
                            variant="outlined"
                            rows={4}
                            fullWidth
                            className={classes.textarea}
                            onChange={handleInputChange}
                        />
                        {!edit ?
                            <Button variant="contained" color="primary" disabled={!opinion || !punctuation} onClick={handleSubmit} className={classes.button}>
                                Enviar
                            </Button>
                            :
                            <Button variant="contained" color="primary" disabled={!opinion || !punctuation} onClick={() => handleModification()} className={classes.button}>
                                Modificar
                            </Button>
                        }
                    </Box>
                }
                {reviews?.map((review, index) => { 
                    return review.product._id === product._id ?
                        <Box key={index} component="fieldset" mb={3} borderColor="primary" style={{ width: '33vw' }}>
                            <Typography component="legend">{review.date}</Typography>
                            <Grid container justifyContent="space-between">
                                <Avatar alt={review.user?.name} src={review.user?.picture} />
                                <Typography component="legend" style={{ marginTop: '1.5vh' }}>{review.user?.name}</Typography>
                                <Rating value={review.punctuation} readOnly style={{ marginTop: '1.5vh' }} />
                            </Grid>
                            <Typography component="legend" style={{ marginTop: '3vh' }}>{review.opinion}</Typography>
                            <Grid container direction="row" justifyContent="flex-end">
                                {review.modified &&
                                    <Typography component="legend" style={{ marginTop: '3.5vh' }}>Editado {review.modified}</Typography>
                                }
                                {user?.name === review.user?.name &&
                                    <>
                                        <Button variant="contained" color="primary" size="small" style={{ marginTop: '3vh', marginRight: '2vh', marginLeft: '5vh' }} onClick={() => handleDelete(review._id)}>
                                            Eliminar
                                        </Button>
                                        <Button variant="contained" color="primary" size="small" style={{ marginTop: '3vh' }} onClick={() => handleEdit(review)}>
                                            Editar
                                        </Button>
                                    </>
                                }
                            </Grid>
                        </Box>
                    : <></>             
                })}
            </Grid>
        </>
    )
}
