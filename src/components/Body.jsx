import React, { useState, useEffect, useContext } from 'react'
import Cusines from './Cusines'
import TopRestaurants from './TopRestaurants'
import OnlineRestaurants from './OnlineRestaurants'
import { Coordinates } from '../context/contextApi'

function Body() {

    const [restaurantData, setRestaurantData] = useState([])
    const [cusineData, setCusineData] = useState([])
    const [topRestaurantTitle, setTopRestaurantTitle] = useState("")
    const [onlineRestaurantTitle, setOnlineRestaurantTitle] = useState("")
    const {coord: {lat, lng}} = useContext(Coordinates)

    async function fetchData() {
        const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        const result = await data.json();
        setRestaurantData(result?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants);
        setCusineData(result?.data?.cards[0].card?.card?.imageGridCards?.info);
        setTopRestaurantTitle(result?.data?.cards[1].card?.card?.header?.title);
        setOnlineRestaurantTitle(result?.data?.cards[2].card?.card?.title);
    }

    useEffect(() => {
        fetchData()
    }, [lat, lng])

    return (
        <div className='w-full'>
            <div className='w-[75%] mx-auto mt-2 overflow-hidden'>
                <Cusines data={cusineData} />
                <TopRestaurants data={restaurantData} title={topRestaurantTitle} />
                <OnlineRestaurants data={restaurantData} title={onlineRestaurantTitle} />
            </div>
        </div>
    )
}

export default Body