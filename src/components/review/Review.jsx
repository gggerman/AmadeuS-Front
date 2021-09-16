import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography, TextField, Button, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { useAuth0 } from "@auth0/auth0-react"; 
import getDetails from "../../redux/actions/getDetails";

const useStyles = makeStyles((theme) => ({
    button: {
        width:'100%',
    },
    textarea: {
        marginTop:'2vh',
        marginBottom:'2vh',
    },
}));

export default function Review() {

    const classes = useStyles();
    const { user } = useAuth0();
    const dispatch = useDispatch();
    const { data, success, loading } = useSelector(({ app }) => app.detail);
    const [opinion, setOpinion] = useState("");
    const [punctuation, setPunctuation] = useState(0);
    const [id, setId] = useState(1);
    const [idEdit, setIdEdit] = useState(0);
    const [edit, setEdit] = useState(false);
    // const [reviews, setReviews] = useState([]);

    let suma = 0;

    // useEffect(() => {
    //     dispatch(getDetails(data._id));
    // }, [data]);

    const handleInputChange = (e) => {
        setOpinion(e.target.value);
    };

    async function handleSubmit(){

        // e.preventDefault();
        let date = new Date();
        date = date.toLocaleString();
        // setReviews([
        //     {
        //         id,
        //         date,
        //         punctuation,
        //         opinion,
        //         user,
        //         modified: "",
        //     },
        //     ...reviews
        // ]);
        let review = {
            punctuation,
            opinion,
            date,
            modified: ""
        };
        let response = await axios.post(`http://localhost:3001/products/${data._id}/qualification/61433cfc16d026f00519d5c`, review);
        setId(id + 1);
        setOpinion('');
        setPunctuation(0);
        // console.log(reviews);
    };

    const handleDelete = (id) => {
        // setReviews(
        //     reviews.filter(review => review.id != id)
        // )
    }

    const handleEdit = (id) => {
        // let edit = reviews.find(review => review.id === id)
        // setIdEdit(id);
        // setEdit(true);
        // setPunctuation(edit.puntuacion);
        // setOpinion(edit.opinion);
    }

    const handleModification = () => {
        // let date = new Date();
        // date = DateRangeOutlined.toLocaleString();
        // setReviews(
        //     reviews.map(review => {
        //         return review.id !== idEdit ? review : {
        //             ... review,
        //             opinion: opinion,
        //             punctuation: punctuation,
        //             modified: date,
        //         }
        //     })
        // )
        // setEdit(false);
        // setIdEdit(0);
        // setOpinion('');
        // setPunctuation(0);
    }

    return (
        <>
            {data?.qualification?.forEach(review => suma += review.punctuation)}
            <Grid container component="main" direction="column" alignItems="center">
                <Box component="fieldset" mb={3} borderColor="primary" style={{width: '33vw'}}>
                    <Typography variant='h6' align="center">Calificación General</Typography>
                    <Grid container justifyContent="center" style={{marginTop:'2vh', marginBottom:'2vh'}}>
                        {suma / data.qualification.length >= 0 &&
                            <Typography variant='h6' style={{ marginRight: '1vw' }}>{(suma / data.qualification.length).toFixed(1)}</Typography>
                        }
                        <Rating value={suma / data.qualification.length} precision={0.1} size="large" readOnly />
                    </Grid>
                    {suma / data.qualification.length >= 0 &&
                        <Typography align="center">Promedio de {data.qualification.length} opiniones</Typography>
                    }
                </Box>
                {/* {user && */}
                    <Box component="fieldset" mb={3} borderColor="primary" style={{ width: '33vw' }}>
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
                            <Button variant="contained" color="primary" disabled={!opinion || !punctuation} onClick={() => handleSubmit()} className={classes.button}>
                                Enviar
                            </Button>
                            :
                            <Button variant="contained" color="primary" disabled={!opinion || !punctuation} onClick={() => handleModification()} className={classes.button}>
                                Modificar
                            </Button>
                        }
                    </Box>
                {/* } */}
                {data?.qualification?.map((review, index) => {
                    return <Box key={index} component="fieldset" mb={3} borderColor="primary" style={{ width: '33vw' }}>
                        <Typography component="legend">{review.date}</Typography>
                        <Grid container justifyContent="space-between">
                            <Avatar alt={review.idUser.name} src={review.idUser.picture} />
                            <Typography component="legend" style={{ marginTop: '1.5vh' }}>{review.idUser.name}</Typography>
                            <Rating value={review.punctuation} readOnly style={{ marginTop: '1.5vh' }} />
                        </Grid>
                        <Typography component="legend" style={{ marginTop: '3vh' }}>{review.opinion}</Typography>
                        <Grid container direction="row" justifyContent="flex-end">
                            {review.modified &&
                                <Typography component="legend" style={{ marginTop: '3.5vh'}}>Editado {review.modified}</Typography>
                            }
                            {/* {user.name === review.user.name && */}
                                <>
                                    <Button variant="contained" color="primary" size="small" style={{ marginTop: '3vh', marginRight:'2vh', marginLeft:'5vh'}} onClick={() => handleDelete(review._id)}>
                                        Eliminar
                                    </Button>
                                    <Button variant="contained" color="primary" size="small" style={{ marginTop: '3vh'}} onClick={() => handleEdit(review._id)}>
                                        Editar
                                    </Button>
                                </>
                            {/* } */}
                        </Grid>
                    </Box>
                })}
            </Grid>
        </>
    )
}
