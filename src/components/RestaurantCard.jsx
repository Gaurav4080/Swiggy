import React from 'react'
import { Link } from 'react-router-dom'

function RestaurantCard(restaurant) {
    return (
        <Link to={`/RestaurantMenu/${restaurant.link.split("/").at(-1)}`}>
            <div className='min-w-[295px] h-[182px] relative'>
                <img className='w-full h-full rounded-2xl object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.cloudinaryImageId}`} alt="" />
                <div className='bg-gradient-to-t from-black from-1% to-transparent to-40% rounded-2xl w-full h-full absolute top-0'></div>
                <p className='absolute bottom-0 text-white text-2xl ml-2 mb-1 font-bold'>
                    {
                        restaurant?.aggregatedDiscountInfoV3?.header ? restaurant?.aggregatedDiscountInfoV3?.header + " " + restaurant?.aggregatedDiscountInfoV3?.subHeader : "Offers for you"
                    }
                </p>
            </div>
            <div className='mt-3'>
                <h2 className='text-xl font-bold text-green-1000'>{restaurant.name}</h2>
                <p className='flex items-center mt-1 gap-1 font-bold text-green-700'><i className="fi fi-ss-circle-star text-green-600 text-lg"></i> {restaurant.avgRating}<span className='mb-2 text'> . </span><span>{restaurant?.sla?.slaString}</span></p>
                <p className='line-clamp-1 overflow-hidden text-ellipsis'>{restaurant?.cuisines?.join(", ")}</p>
                <p className='line-clamp-1 overflow-hidden text-ellipsis font-semibold'>{restaurant.locality}</p>
            </div>
        </Link>
    )
}

export default RestaurantCard