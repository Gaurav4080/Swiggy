import React, { useState, useEffect, useMemo } from "react";
import Cusines from "./Cusines";
import TopRestaurants from "./TopRestaurants";
import OnlineRestaurants from "./OnlineRestaurants";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";

function Body() {
    const [restaurantData, setRestaurantData] = useState([]);
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
        fetchData();
    }, [lat, lng]);

    const filteredData = useMemo(() => {
        return restaurantData.filter((item) => {
            const rating = item?.info?.avgRating;
            const discount = item?.info?.aggregatedDiscountInfoV3;
            const costString = item?.info?.costForTwo || "";
            const costNumber = parseInt(costString.replace(/\D/g, ""), 10);

            switch (filterVal) {
                case "Ratings 4.0+":
                    return rating > 4;
                case "Offers":
                    return !!discount;
                case "Rs.300 - Rs.600":
                    return costNumber >= 300 && costNumber <= 600;
                case "Less than Rs.300":
                    return costNumber < 300;
                default:
                    return true;
            }
        });
    }, [filterVal, restaurantData]);

    if (unserviceableData?.communication || unserviceableData.tid === "") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
                <img
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
                    alt="Location Unserviceable"
                    className="w-48 h-48 md:w-60 md:h-60 mb-4"
                />
                <p className="text-xl font-bold text-gray-800">Location Unserviceable!</p>
                <p className="text-gray-600 text-sm md:text-base max-w-sm mt-2">
                    We don't have any services here yet. Try changing your location.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {
                restaurantData.length ? (
                    <div className="w-[90%] mx-auto mt-2 overflow-hidden">
                        {
                            cusineData.length ?
                                <>
                                    <Cusines data={cusineData} />
                                    <TopRestaurants data={restaurantData} title={topRestaurantTitle} />
                                </> : ""
                        }
                        <OnlineRestaurants data={filterVal ? filteredData : restaurantData} title={onlineRestaurantTitle} />
                    </div>
                ) : <Shimmer />
            }
        </div>
    );
}

export default Body;
