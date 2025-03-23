import React, { useState } from 'react'

function Cusines({ data }) {

    const [value, setvalue] = useState(0)

    function handleNext() {
        value >= 125 ? "" : setvalue((prev) => prev + 32)
    }

    function handlePrev() {
        value <= 0 ? "" : setvalue((prev) => prev - 32)
    }

    return (
        <div>
            <div className='flex justify-between mt-5'>
                <h1 className='font-bold text-3xl'>What's on your mind?</h1>
                <div className='flex gap-3'>
                    <div onClick={handlePrev} className={`cursor-pointer rounded-full h-9 w-9 flex justify-center items-center ${value <= 0 ? "bg-gray-100" : "bg-gray-200"}`}>
                        <i className={`fi text-2xl mt-1 fi-rr-arrow-small-left ${value <= 0 ? "text-gray-400" : "text-gray-800"}`}></i>
                    </div>
                    <div onClick={handleNext} className={`cursor-pointer rounded-full h-9 w-9 flex justify-center items-center ${value >= 125 ? "bg-gray-100" : "bg-gray-200"}`}>
                        <i className={`fi text-2xl mt-1 fi-rr-arrow-small-right ${value >= 125 ? "text-gray-400" : "text-gray-800"}`}></i>
                    </div>
                </div>
            </div>
            <div
                style={{ translate: `-${value}%` }}
                className={`flex my-3 duration-300`}>
                {data.map((item) => (
                    <img key={item.imageId} className='w-40 hover:scale-80 hover:cursor-pointer duration-300' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" />
                ))}
            </div>
            <hr className='border text-gray-300' />
        </div>
    )
}

export default Cusines