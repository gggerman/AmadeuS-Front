import React from 'react';
import { Container } from '@material-ui/core';


export default function Footer(){
    return (
        <footer style = {{backgroundColor: 'rgb(0, 23, 20)', height: '20vh', color: 'white', paddingBottom: '2vh'}}>
            <p>About</p>
            <p>Team</p>
            <p>Contact</p>
            <p>FAQ</p>
        </footer>    
    )
}