import React, { useState, useEffect } from 'react'

function Body() {

    const [data, setdata] = useState([])
    const [value, setvalue] = useState(0)

    async function fetchData() {
        const data = await fetch('https://proxy.corsfix.com/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
        const result = await data.json();
        console.log(result?.data?.cards[0].card?.card?.imageGridCards?.info);
        setdata(result?.data?.cards[0].card?.card?.imageGridCards?.info);
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleNext() {
        value >= 125 ? "" : setvalue((prev) => prev + 32)
    }

    function handlePrev() {
        value <= 0 ? "" : setvalue((prev) => prev - 32)
    }

    return (
        <div className='w-full'>
            <div className='w-[75%] mx-auto mt-2 overflow-hidden'>
                <div className='flex justify-between mt-5'>
                    <h1 className='font-bold text-4xl'>What's on your mind?</h1>
                    <div className='flex gap-3'>
                        <div onClick={handlePrev} className={`cursor-pointer rounded-full h-9 w-9 flex justify-center items-center ${value <= 0 ? "bg-gray-100" : "bg-gray-200"}`}>                            
                            <i class={`fi text-2xl mt-1 fi-rr-arrow-small-left ${value <= 0 ? "text-gray-400" : "text-gray-800"}`}></i>
                        </div>
                        <div onClick={handleNext} className={`cursor-pointer rounded-full h-9 w-9 flex justify-center items-center ${value >= 125 ? "bg-gray-100" : "bg-gray-200"}`}>
                            <i class={`fi text-2xl mt-1 fi-rr-arrow-small-right ${value >= 125 ? "text-gray-400" : "text-gray-800"}`}></i>
                        </div>
                    </div>
                </div>
                <div
                    style={{ translate: `-${value}%` }}
                    className={`flex mt-4 duration-1000`}>
                    {data.map((item) => (
                        <img className='w-40' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Body