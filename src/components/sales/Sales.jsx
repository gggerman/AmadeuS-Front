import React, {useEffect, useState} from 'react';
import axios from 'axios';
const { REACT_APP_SERVER } = process.env;

export default function Sales(){
    const [orders, setOrders] = useState()
    console.log(orders)

    const getOrders = async () => {      //me traigo las compras
        try{
           const response = await axios.get(`${REACT_APP_SERVER}/orders`)
            setOrders(response.data)
        }
        catch (error){
            console.log(error)
        }
      }


    useEffect(() => {
      getOrders()

    }, [])

    return (
        <div>

            Sales
        </div>
    )
}