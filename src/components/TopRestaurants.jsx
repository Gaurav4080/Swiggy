import React, { useState } from 'react'

function TopRestaurants({ data }) {

    const [value, setvalue] = useState(0)

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

            <div className={`flex mt-4 my-10 gap-6 duration-300`} style={{ translate: `-${value}%` }}>
                {
                    data.map((restaurant) => (
                        <div key={restaurant.info.id} className='min-w-[295px] h-[182px] relative'>
                            <img className='w-full h-full rounded-2xl object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${restaurant.info.cloudinaryImageId}`} alt="" />
                            <div className='bg-gradient-to-t from-black from-1% to-transparent to-40% rounded-2xl w-full h-full absolute top-0'></div>
                        </div>
                    ))
                }
            </div>

            <hr className='border text-gray-300' />
        </div>
    )
}

export default TopRestaurants