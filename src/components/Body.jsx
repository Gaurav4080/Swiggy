import Cusines from "./Cusines";
import TopRestaurants from "./TopRestaurants";
import OnlineRestaurants from "./OnlineRestaurants";
import Shimmer from "./Shimmer";
import useRestauranrsData from "../hooks/useRestauranrsData";
import useFilteredData from "../hooks/useFilteredData";
import UnserviceableLocation from "./UnserviceableLocation";

function Body() {

    const [restaurantData, cusineData, unserviceableData, topRestaurantTitle, onlineRestaurantTitle, filterVal, isLoading] = useRestauranrsData();
    const filteredData = useFilteredData(restaurantData, filterVal);

    if (isLoading) {
        return <Shimmer />;
    }

    if (unserviceableData?.communication || unserviceableData.tid === "") {
        return <UnserviceableLocation />;
    }

    if (restaurantData.length === 0) {
        return <UnserviceableLocation />;
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
