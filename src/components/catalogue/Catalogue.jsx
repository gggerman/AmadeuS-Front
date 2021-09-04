import React, { useState, useEffect } from 'react'
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import ProductCard from '../productcard/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import getAllProducts, { sortByName, sortByPrice, filterByCategory } from '../../redux/actions/getAllProducts';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    gridContainer: {
        marginTop:'5vh',
        margin: 'auto',
        maxWidth: '200vh'
    },
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Catalogue() {
    const products = useSelector(({ app }) => app.productsLoaded);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, []);

    let categorys = ['All','Instrumentos eléctricos','Cuerda','Electronica/audio',
        'categories','Percusion']

    // Para renderizar cuando hay ordenamientos y filtrado
    const [render, setRender] = useState('');

    // Control del paginado
    const [page, setPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);
    const indexLastProduct = page * productsPerPage;
    const indexFirstProduct = indexLastProduct - productsPerPage;
    const currentProducts = products.slice(indexFirstProduct, indexLastProduct);

    const classes = useStyles();

    function handleSortName(e){
        dispatch(sortByName(e.target.value));
        setRender(`Sort ${e.target.value}`);
        setPage(1)
    }

    function handleSortPrice(e){
        dispatch(sortByPrice(e.target.value));
        setRender(`Sort ${e.target.value}`);
        setPage(1);
    }

    function handleFilterCategory(e){
        dispatch(filterByCategory(e.target.value))
        setRender(`Filter ${e.target.value}`);
        setPage(1)
    }

    function handleChange(event, value) {
        setPage(value);
    };

    return (
        <>
        <Grid container
            direction="row"
            justifyContent="center"
        >
            <FormControl className={classes.formControl}>
                <InputLabel>Filter by Category</InputLabel>
                <Select onChange={(e) => handleFilterCategory(e)}>
                    {categorys?.map((category, index) => <MenuItem key={index} value={category}>{category}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel>Sort by Name</InputLabel>
                <Select onChange={(e) => handleSortName(e)}>
                    <MenuItem value='A - Z'>A - Z</MenuItem>
                    <MenuItem value='Z - A'>Z - A</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel>Sort by Price</InputLabel>
                <Select onChange={(e) => handleSortPrice(e)}>
                    <MenuItem value='Lower to Higher'>Lower to Higher</MenuItem>
                    <MenuItem value='Higher to Lower'>Higher to Lower</MenuItem>
                </Select>
            </FormControl>
            </Grid>

            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.gridContainer}
            >
                {currentProducts?.map(product => {
                    return <ProductCard key={product.id} name={product.name} description={product.description} image={product.image} price={product.price}/>
                })}
            </Grid>

            <Grid container 
                direction="row"
                justifyContent="center"
                className={classes.root}
            >
                <Pagination count={Math.ceil(products.length/productsPerPage)}
                    page={page} onChange={handleChange}
                    variant="outlined" shape="rounded"
                    color='primary'
                    />
            </Grid>
        </>
    )
}