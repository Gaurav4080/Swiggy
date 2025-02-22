import React from 'react'
import Cusines from './Cusines'
import TopRestaurants from './TopRestaurants'

function Body() {

    return (
        <div className='w-full'>
            <div className='w-[75%] mx-auto mt-2 overflow-hidden'>
                <Cusines />
                <TopRestaurants />
            </div>
        </div>
    )
}

export default Body