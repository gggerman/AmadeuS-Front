import { ADD_ORDER_ID,  } from "."

 const addOrder = ( id ) => {
            return  {
                type: ADD_ORDER_ID,
                payload: id
            }
        }
export default addOrder;