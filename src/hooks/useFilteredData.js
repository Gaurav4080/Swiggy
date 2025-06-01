import { useMemo } from 'react'

function useFilteredData(restaurantData, filterVal) {
    const filteredData = useMemo(() => {
        if (restaurantData.length !== 0) {
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
        }
    }, [filterVal, restaurantData]);

    return filteredData;
}

export default useFilteredData