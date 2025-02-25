import React from 'react'
import RestaurantCard from './RestaurantCard'

function OnlineRestaurants({ data }) {
    return (
        <div>
            <h1 className='font-bold text-3xl my-10'>Restaurants with online food delivery in Mumbai</h1>
            <div className='grid grid-cols-4 gap-25'>
                {
                    data.map(({ info, cta: { link } }) => {
                        return (
                            <div className='hover:scale-95 duration-300' key={info.id} >
                                <RestaurantCard {...info} link={link} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default OnlineRestaurants