import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function useRestauranrsData() {
    const [restaurantData, setRestaurantData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cusineData, setCusineData] = useState([]);
    const [unserviceableData, setUnserviceableData] = useState([]);
    const [topRestaurantTitle, setTopRestaurantTitle] = useState("");
    const [onlineRestaurantTitle, setOnlineRestaurantTitle] = useState("");
    const { lat, lng } = useSelector((state) => state.coordSlice);
    const filterVal = useSelector((state) => state.filterSlice.filterVal);

    async function fetchData() {
        try {
            const response = await fetch(
                `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
            );
            const result = await response.json();
            setUnserviceableData(result?.data);
            let maindata = result?.data?.cards.find(
                (data) => data?.card?.card?.id === "top_brands_for_you"
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            let maindata2 = result?.data?.cards.find(
                (data) => data?.card?.card?.id === "restaurant_grid_listing_v2"
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
            setRestaurantData(maindata || maindata2);
            let data2 = result?.data?.cards.find(
                (data) => data?.card?.card?.id === "whats_on_your_mind"
            ).card?.card?.imageGridCards?.info;
            setCusineData(data2);
            setTopRestaurantTitle(result?.data?.cards[1]?.card?.card?.header?.title || "");
            setOnlineRestaurantTitle(result?.data?.cards[2]?.card?.card?.title || "");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {
                await fetchData();
            } catch (error) {
                console.error("Failed to fetch:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, [lat, lng]);

    return [restaurantData, cusineData, unserviceableData, topRestaurantTitle, onlineRestaurantTitle, filterVal, isLoading];
}

export default useRestauranrsData