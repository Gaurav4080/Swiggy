import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dishes from './Dishes';
import SearchRestaurantCard, { withHOC } from './SearchRestaurantCard';
import { setSearchQuery } from '../utils/searchSlice';

function Search() {

    const dispatch = useDispatch();

    const searchQuery = useSelector((state) => state.searchSlice.query)
    const filterOptions = [
        { filterName: "Restaurants" },
        { filterName: "Dishes" },
    ];

    const [activeButton, setActiveButton] = useState("Dishes");
    const [dishes, setDishes] = useState([])
    const [restaurantData, setRestaurantData] = useState([])
    const { lat, lng } = useSelector((state) => state.coordSlice);

    const PromotedRestaurant = withHOC(SearchRestaurantCard)

    function handleFilterBtn(filterName) {
        setActiveButton(prev => (prev === filterName ? activeButton : filterName));
    }

    async function fetchDishes() {
        let data = await fetch(`https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=1c586c03-a7a3-455c-347a-694fa0ed34b7`);
        let res = await data.json();
        let finalData = res?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.DISH?.cards || [];
        finalData = finalData.filter(data => data?.card?.card?.info);
        setDishes(finalData);
    }

    async function fetchRestaurantData() {
        let data = await fetch(`https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=1c586c03-a7a3-455c-347a-694fa0ed34b7&selectedPLTab=RESTAURANT`);
        let res = await data.json();
        let finalData = res?.data?.cards?.[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards || [];
        finalData = finalData.filter(data => data?.card?.card?.info);
        setRestaurantData(finalData);
    }

    function handleSearchQuery(e) {
        let val = e.target.value;
        if (e.keyCode === 13) {
            dispatch(setSearchQuery(val));
            setDishes([]);
        }
    }

    useEffect(() => {
        if (searchQuery === "") {
            return
        }
        fetchDishes()
        fetchRestaurantData()
    }, [searchQuery])


    return (
        <div className='w-full md:w-[800px] mx-auto'>
            <input
                onKeyDown={handleSearchQuery}
                type="text"
                placeholder={searchQuery ? searchQuery : "Search for Restaurants and Food!"}
                className="w-full rounded-xl mt-10 border p-3 bg-slate-100 font-semibold focus:outline-none focus:shadow-lg"
            />

            {
                <div className="my-4 flex flex-wrap gap-3">
                    {filterOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleFilterBtn(option.filterName)}
                            className={`border hover:cursor-pointer shadow-2xl p-1 px-2 flex gap-1 text-[15px] rounded-xl font-semibold 
                    ${activeButton === option.filterName ? "bg-slate-600 text-white border-slate-400" : "bg-slate-100 border-slate-200"}`}
                        >
                            <p>{option.filterName}</p>
                        </button>
                    ))}
                </div>
            }

            <div className='w-full md:w-[800px] mt-5 grid grid-cols-1 md:grid-cols-2 bg-slate-100'>
                {
                    activeButton === "Dishes"
                        ? dishes.map((data, index) => <Dishes key={index} data={data.card.card} />)
                        : restaurantData.map((data, index) => (
                            data?.card?.card?.info?.promoted ? <PromotedRestaurant key={index} data={data} /> : <SearchRestaurantCard key={index} data={data} />
                        ))
                }
            </div>
        </div>

    )
}

export default Search