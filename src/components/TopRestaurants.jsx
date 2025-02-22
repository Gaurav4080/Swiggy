import React, { useEffect, useState } from 'react'

function TopRestaurants() {

    const [data, setdata] = useState([])
    const [value, setvalue] = useState(0)

    async function fetchData() {
        const data = await fetch('https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
        const result = await data.json();
        console.log(result?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants);
        setdata(result?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleNext() {
        value >= 400 ? "" : setvalue((prev) => prev + 50)
    }

    function handlePrev() {
        value <= 0 ? "" : setvalue((prev) => prev - 50)
    }

    return (
        <div className='mt-14 w-full'>
            <div className='flex justify-between mt-5'>
                <h1 className='font-bold text-3xl'>Top restaurant chains in Mumbai</h1>
                <div className='flex gap-3'>
                    <div onClick={handlePrev} className={`cursor-pointer rounded-full h-9 w-9 flex justify-center items-center ${value <= 0 ? "bg-gray-100" : "bg-gray-200"}`}>
                        <i className={`fi text-2xl mt-1 fi-rr-arrow-small-left ${value <= 0 ? "text-gray-400" : "text-gray-800"}`}></i>
                    </div>
                    <div onClick={handleNext} className={`cursor-pointer rounded-full h-9 w-9 flex justify-center items-center ${value >= 400 ? "bg-gray-100" : "bg-gray-200"}`}>
                        <i className={`fi text-2xl mt-1 fi-rr-arrow-small-right ${value >= 400 ? "text-gray-400" : "text-gray-800"}`}></i>
                    </div>
                </div>
            </div>

            <div className={`flex mt-4 my-10 gap-6 duration-300`} style={{translate: `-${value}%`}}>
                {
                    data.map((restaurant) => (
                        <div className='min-w-[295px] h-[182px]'>
                            <img className='w-full h-full rounded-2xl object-cover' key={restaurant.info.id} src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.info.cloudinaryImageId}`} alt="" />
                        </div>
                    ))
                }
            </div>

            <hr className='border text-gray-300' />
        </div>
    )
}

export default TopRestaurants