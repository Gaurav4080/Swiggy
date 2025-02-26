import React, { useState, useEffect } from 'react'
import Cusines from './Cusines'
import TopRestaurants from './TopRestaurants'
import OnlineRestaurants from './OnlineRestaurants'

function Body() {

    const [restaurantData, setRestaurantData] = useState([])
    const [cusineData, setCusineData] = useState([])

    async function fetchData() {
        const data = await fetch('https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5355161&lng=77.3910265&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
        const result = await data.json();
        setRestaurantData(result?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants);
        setCusineData(result?.data?.cards[0].card?.card?.imageGridCards?.info);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='w-full'>
            <div className='w-[75%] mx-auto mt-2 overflow-hidden'>
                <Cusines data={cusineData} />
                <TopRestaurants data={restaurantData} />
                <OnlineRestaurants data={restaurantData} />
            </div>
        </div>
    )
}

export default Body