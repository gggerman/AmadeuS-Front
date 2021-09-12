import React, { useEffect, useState } from 'react'

const useLocalStorage = (localStorageKey, defaultValue) => {

    const initialValue = JSON.parse( localStorage.getItem( localStorageKey ) ) || defaultValue;
    const [value, setValue] = useState(initialValue)

    useEffect( () => {
        localStorage.setItem( localStorageKey, JSON.stringify( value ) )
    },[] )


    return [ value, setValue]
}

export default useLocalStorage
