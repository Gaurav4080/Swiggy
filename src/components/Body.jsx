import React, { useState, useEffect, useContext } from 'react'
import Cusines from './Cusines'
import TopRestaurants from './TopRestaurants'
import OnlineRestaurants from './OnlineRestaurants'
import { Coordinates } from '../context/contextApi'

function Body() {

    const [restaurantData, setRestaurantData] = useState([])
    const [cusineData, setCusineData] = useState([])
    const [unserviceableData, setUnserviceableData] = useState([])
    const [topRestaurantTitle, setTopRestaurantTitle] = useState("")
    const [onlineRestaurantTitle, setOnlineRestaurantTitle] = useState("")
    const { coord: { lat, lng } } = useContext(Coordinates)

    async function fetchData() {
        const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        const result = await data.json();
        setUnserviceableData(result?.data);
        setRestaurantData(result?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants);
        setCusineData(result?.data?.cards[0].card?.card?.imageGridCards?.info);
        setTopRestaurantTitle(result?.data?.cards[1].card?.card?.header?.title);
        setOnlineRestaurantTitle(result?.data?.cards[2].card?.card?.title);
    }

    useEffect(() => {
        fetchData()
    }, [lat, lng])

    if (unserviceableData.communication) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
              <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="Location Unserviceable" className="w-48 h-48 md:w-60 md:h-60 mb-4" />
              <p className="text-xl font-bold text-gray-800">Location Unserviceable!</p>
              <p className="text-gray-600 text-sm md:text-base max-w-sm mt-2">We don't have any services here till now. Try changing location.</p>
            </div>
          );          
    }

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