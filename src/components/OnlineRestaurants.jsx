import React from 'react'
import RestaurantCard from './RestaurantCard'

function OnlineRestaurants({ data }) {
    return (
        <div>
            <h1 className='font-bold text-3xl my-10'>Restaurants with online food delivery in Mumbai</h1>
            <div className='grid grid-cols-4 gap-10'>
                {
                    data.map((restaurant) => {
                        const { link } = restaurant.cta; // Destructure link from restaurant.cta
                        return (
                            <div key={restaurant.info.id} className='hover:scale-95 duration-300'>
                                <RestaurantCard {...restaurant} link={link} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default OnlineRestaurants