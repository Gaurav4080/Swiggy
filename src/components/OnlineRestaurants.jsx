import React from 'react'
import RestaurantCard from './RestaurantCard'

function OnlineRestaurants({ data, title }) {
    return (
        <div>
            <h1 className='font-bold text-2xl mt-10 my-5'>{title}</h1>
            <div className='grid grid-cols-4 gap-5'>
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