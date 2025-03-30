import React, { useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard'
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../utils/filterSlice';

function OnlineRestaurants({ data, title }) {

    const filterOptions = [
        { filterName: "Ratings 4.0+" },
        { filterName: "Offers" },
        { filterName: "Rs.300 - Rs.600" },
        { filterName: "Less than Rs.300" }
    ];

    const [activeButton, setActiveButton] = useState(null);
    const dispatch = useDispatch();

    function handleFilterBtn(filterName) {
        setActiveButton(prev => (prev === filterName ? null : filterName));
    }

    useEffect(() => {
        dispatch(setFilterValue(activeButton));
    }, [activeButton, dispatch]);

    return (
        <div>
            <h1 className="font-bold text-2xl mt-10 my-5">{title}</h1>

            <div className="my-4 flex flex-wrap gap-3">
                {filterOptions.map((option) => (
                    <button
                        key={option.filterName}
                        onClick={() => handleFilterBtn(option.filterName)}
                        className={`border hover:cursor-pointer shadow-2xl p-1 px-2 flex gap-1 text-[15px] rounded-xl font-semibold 
                            ${activeButton === option.filterName ? "bg-slate-200 border-slate-400" : "bg-slate-100 border-slate-200"}`}>
                        <p>{option.filterName}</p>
                        <i className={`fi text-sm mt-0.5 fi-rr-cross-small ${activeButton === option.filterName ? "block" : "hidden"}`}></i>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {data.map(({ info, cta: { link } }) => (
                    <div className="hover:scale-95 duration-300" key={info.id}>
                        <RestaurantCard {...info} link={link} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OnlineRestaurants;
