import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function RestaurantMenu() {
    const { id } = useParams();
    let mainId = id.split("-").at(-1).split("t").at(-1);

    const [resInfo, setResInfo] = useState([])
    const [discountData, setDiscountData] = useState([])
    const [menuData, setMenuData] = useState([])

    console.log(resInfo);


    async function fetchMenu() {
        const data = await fetch(`https://proxy.corsfix.com/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
        const result = await data.json()

        setResInfo(result?.data?.cards[2]?.card?.card?.info)
        setDiscountData(result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
        setMenuData(result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card)
    }

    useEffect(() => {
        fetchMenu();
    }, [])

    return (
        <div className='w-full'>
            <div className='w-[800px] mx-auto pt-8'>
                <p className='text-[12px] text-slate-400 font-bold'><Link to={"/"}><span className='hover:text-slate-700 hover:cursor-pointer'>Home</span></Link> / <Link to={"/"}><span className='hover:text-slate-700 hover:cursor-pointer'>{resInfo.city}</span></Link> / <span className='text-slate-800'>{resInfo.name}</span></p>
                <h1 className='font-bold ml-6 pt-6 text-2xl'>{resInfo.name}</h1>
                <div className='w-full h-[180px] bg-gradient-to-t px-5 pb-5 from-slate-300/70 mt-3 rounded-4xl'>
                    <div className='w-full border-slate-200 rounded-3xl h-full bg-white'>
                        <div className='px-5 pt-5'>
                            <div className='flex items-center font-bold text-black'>
                                <i className="fi fi-ss-circle-star text-green-600 text-lg mt-1"></i>
                                <span className='ml-1 gap-1'>{resInfo.avgRating}</span>
                                <span>({resInfo.totalRatingsString})</span>
                                <span className='mb-2 text-xl mx-1'>.</span>
                                <span>{resInfo.costForTwoMessage}</span>
                            </div>
                            <p className='underline text-red-500 font-bold text-[13px]'>{resInfo?.cuisines?.join(", ")}</p>
                            <div className='flex gap-3 my-3'>
                                <div className='flex flex-col items-center w-2 my-2'>
                                    <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
                                    <div className='w-[1px] h-6 bg-gray-300'></div>
                                    <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
                                </div>
                                <div className='flex flex-col gap-2 mt-0.5 font-bold text-black text-[14px]'>
                                    <p>Outlet <span className='ml-2 text-slate-400'>{resInfo.city}</span></p>
                                    <p>{resInfo?.sla?.slaString}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantMenu