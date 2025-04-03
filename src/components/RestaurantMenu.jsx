import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartData } from '../utils/cartSlice'
import toast from 'react-hot-toast'
import AddToCartButton from './AddToCartButton'
import { toggleDiffRes } from '../utils/toggleSlice'

let veg = "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png"
let nonVeg = "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"

function RestaurantMenu() {
    const { id } = useParams();
    let mainId = id.split("-").at(-1).split("t").at(-1);

    const [resInfo, setResInfo] = useState([])
    const [discountData, setDiscountData] = useState([])
    const [menuData, setMenuData] = useState([])
    const [value, setValue] = useState(0)

    function handleNext() {
        value >= 90 ? "" : setValue((prev) => prev + 38)
    }

    function handlePrev() {
        value <= 0 ? "" : setValue((prev) => prev - 38)
    }

    async function fetchMenu() {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
        const result = await data.json()
        setResInfo(result?.data?.cards[2]?.card?.card?.info)
        setDiscountData(result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
        let actualMenu = (result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories)
        setMenuData(actualMenu)
    }

    useEffect(() => {
        fetchMenu();
    }, [])

    return (
        <div className='w-full'>
            <div className='w-[95%] md:w-[800px] mx-auto pt-8'>
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

                <div className='w-full overflow-hidden'>
                    <div className='flex justify-between mt-8'>
                        <h1 className='font-bold text-xl'>Deals for you</h1>
                        <div className='flex gap-3'>
                            <div onClick={handlePrev} className={`cursor-pointer rounded-full h-9 w-9 flex justify-center items-center ${value <= 0 ? "bg-gray-100" : "bg-gray-200"}`}>
                                <i className={`fi text-2xl mt-1 fi-rr-arrow-small-left ${value <= 0 ? "text-gray-400" : "text-gray-800"}`}></i>
                            </div>
                            <div onClick={handleNext} className={`cursor-pointer rounded-full h-9 w-9 flex justify-center items-center ${value >= 90 ? "bg-gray-100" : "bg-gray-200"}`}>
                                <i className={`fi text-2xl mt-1 fi-rr-arrow-small-right ${value >= 90 ? "text-gray-400" : "text-gray-800"}`}></i>
                            </div>
                        </div>
                    </div>
                    <div style={{ translate: `-${value}%` }}
                        className='flex gap-4 mt-5 duration-300'>
                        {
                            discountData.map((info) => {
                                return <Discount key={info.info.offerIds[0]} data={info} />
                            })
                        }
                    </div>
                </div>

                <h2 className='text-center mt-5 leading-5'>Menu</h2>

                <div className='w-full mt-5 relative cursor-pointer'>
                    <div className='w-full p-3 rounded-xl font-semibold text-sl text-slate-600 bg-slate-100 text-center'>Search for Dishes</div>
                    <i className="fi fi-br-search absolute text-slate-500 top-3 right-5"></i>
                </div>

                <div>
                    {menuData.map(({
                        card: { card } }) => {
                        return <MenuCard key={card.categoryId} card={card} resInfo={resInfo} />
                    })}
                </div>
            </div>
        </div>
    )
}

function Discount({ data: { info: { header, offerLogo, couponCode } } }) {
    return (
        <div className='flex gap-2 items-center min-w-[328px] h-[66px] border p-3 rounded-2xl'>
            <img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_46,h_46/${offerLogo}`} alt="" />
            <div>
                <h2 className='font-bold text-[18px]'>{header}</h2>
                <p className='text-[15px] text-slate-400 font-bold'>{couponCode ? couponCode : "Apply Now!"}</p>
            </div>
        </div>
    )
}

function MenuCard({ card, resInfo }) {

    let state = !!card["@type"];
    const [isOpen, setIsOpen] = useState(state)

    function toggleDropdown() {
        setIsOpen((prev) => !prev)
    }

    if (card.itemCards) {
        const { title, itemCards } = card;
        return (
            <>
                <div>
                    <div className='flex justify-between mt-7'>
                        <h1 className={'font-bold text-' + (card["@type"] ? 'xl' : 'base')}>{title} ({itemCards.length})</h1>
                        <i className={`fi text-2xl ${isOpen ? 'fi-br-angle-small-up' : 'fi-br-angle-small-down'}`} onClick={toggleDropdown}></i>
                    </div>
                    {
                        isOpen &&
                        <DetailMenu itemCards={itemCards} resInfo={resInfo} />
                    }
                </div>
                <hr className={`my-5 border-${card["@type"] ? '[10px]' : '[4px]'} text-slate-200`} />
            </>
        )
    } else {
        const { title, categories } = card;
        return (
            <div>
                <h1 className='font-bold text-[25px]'>{title}</h1>
                {
                    categories.map((data) => {
                        return <MenuCard key={data.categoryId} card={data} resInfo={resInfo} />
                    })
                }
            </div>
        )
    }
}

function DetailMenu({ itemCards, resInfo }) {
    return (
        <div className='m-5'>
            {itemCards.map(({ card: { info } }, index) => {
                const {
                    name,
                    defaultPrice,
                    price,
                    itemAttribute,
                    description,
                    imageId
                } = info;
                let trimDes = description ? description.substring(0, 130) + "..." : "";
                const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes)
                const dispatch = useDispatch()

                function handleIsDiffRes() {
                    dispatch(toggleDiffRes())
                }

                function clearCartAndAddNewItem() {
                    dispatch(clearCartData())
                    toast.success("Cart cleared succesfully!")
                    handleIsDiffRes()
                }

                const key = `item-${index}`;
                const [showMore, setShowMore] = useState(false);

                return (
                    <div key={key} className='relative'>
                        <div className='flex w-full justify-between min-h-[182px]'>
                            <div className='w-[60%] md:w-[70%]'>
                                <img className='w-5' src={itemAttribute && itemAttribute.vegClassifier === "veg" ? veg : nonVeg} alt="" />
                                <h2 className='font-bold text-lg'>{name}</h2>
                                <p className='font-bold text-lg italic'>₹ {defaultPrice / 100 || price / 100}</p>
                                {trimDes && (
                                    <div>
                                        <span className='line-clamp-2 md:line-clamp-none'>{showMore ? description : trimDes}</span>
                                        {trimDes.length >= 50 && (
                                            <button

                                                onClick={() => setShowMore(!showMore)}
                                                className="hidden md:block cursor-pointer mx-1 font-bold text-gray-600"
                                            >
                                                {showMore ? "less" : "more"}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className='w-[40%] md:w-[20%] relative h-full'>
                                {imageId &&
                                    <img className='rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`} alt="" />
                                }
                                <AddToCartButton info={info} resInfo={resInfo} handleIsDiffRes={handleIsDiffRes} />
                            </div>
                        </div>
                        <hr className='my-10 text-slate-300 border-1' />
                        {isDiffRes && (
                            <div className='w-[520px] h-[204px] left-[33%] p-6 bg-white z-50 bottom-10 border-2 fixed'>
                                <h1 className='font-bold mb-2 text-xl'>Items already in Cart</h1>
                                <p>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                                <div className='flex justify-between w-full mt-5'>
                                    <button onClick={handleIsDiffRes} className='text-green-600 border-2 hover:cursor-pointer font-semibold w-[48%] border-green-600 py-2'>NO</button>
                                    <button onClick={clearCartAndAddNewItem} className='text-white w-[48%] hover:cursor-pointer font-semibold bg-green-600 py-2'>Yest Start Afresh</button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default RestaurantMenu  