import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nonVeg, veg } from '../utils/links';
import AddToCartButton from './AddToCartButton';
import { toggleDiffRes, toggleSimilarResDishes } from '../utils/toggleSlice';
import { clearCartData } from '../utils/cartSlice';
import toast from 'react-hot-toast';

function Dishes({
    data: {
        card: {
            card: {
                info,
                restaurant: { info: resInfo }
            }
        }
    }
}) {
    const { imageId = "", name, price, isVeg = 0 } = info;
    const { id, name: resName, avgRating, sla: { slaString } } = resInfo;

    const isDiffRes = useSelector((state) => state.toggleSlice.isDiffRes);
    const { id: cartResId } = useSelector((state) => state.cartSlice.resInfo)
    const dispatch = useDispatch();

    function handleIsDiffRes() {
        dispatch(toggleDiffRes());
    }

    function handleSimilarRes() {
        if (cartResId == id || !cartResId) {
            dispatch(toggleSimilarResDishes());
        }
    }

    function clearCartAndAddNewItem() {
        dispatch(clearCartData())
        toast.success("Cart cleared succesfully!")
        handleIsDiffRes()
    }

    return (
        <>
            <div className='bg-white rounded-2xl p-4 m-4'>
                <div className='flex justify-between text-sm'>
                    <div>
                        <p className='font-bold'>By {resName}</p>
                        <div className='flex gap-1 text-[8px] font-semibold'>
                            <i className="fi fi-ss-star text-sm mt-2"></i>
                            <p className='my-2 text-[12px]'>{avgRating} . </p>
                            <p className='my-2 text-[12px]'>{slaString} </p>
                        </div>
                    </div>
                    <i className='fi text-2xl mt-1 fi-rr-arrow-small-right'></i>
                </div>

                <hr className='text-slate-300 my-2' />

                <div className='my-3 flex justify-between'>
                    <div className='w-[50%]'>
                        <div className='w-4 h-4'>
                            <img src={isVeg ? veg : nonVeg} alt={isVeg ? "Veg" : "Non-Veg"} />
                        </div>
                        <p className='text-lg font-bold'>{name}</p>
                        <div className='flex gap-1 mt-1'>
                            <i className="fi text-sm fi-br-indian-rupee-sign mt-1" />
                            <p className='font-bold'>{price / 100}</p>
                        </div>
                        <button className='p-1 px-3 text-[10px] font-bold mt-6 bg-slate-100 border-slate-400 rounded-3xl border'>More Details</button>
                    </div>

                    <div className='w-[40%] md:w-[35%] relative h-full'>
                        {imageId && (
                            <img
                                className='rounded-xl object-cover aspect-square'
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                                alt={name}
                            />
                        )}
                        <div onClick={handleSimilarRes}>
                            <AddToCartButton info={info} resInfo={resInfo} />
                        </div>
                    </div>
                </div>
            </div>

            {isDiffRes && (
                <div className='w-[520px] h-[204px] left-[33%] p-6 bg-white z-50 bottom-10 border-2 fixed'>
                    <h1 className='font-bold mb-2 text-xl'>Items already in Cart</h1>
                    <p>Your cart contains items from another restaurant. Would you like to reset your cart to add items from this restaurant?</p>
                    <div className='flex justify-between w-full mt-5'>
                        <button onClick={handleIsDiffRes} className='text-green-600 border-2 hover:cursor-pointer font-semibold w-[48%] border-green-600 py-2'> NO </button>
                        <button onClick={clearCartAndAddNewItem} className='text-white w-[48%] hover:cursor-pointer font-semibold bg-green-600 py-2'> Yes, Start Fresh </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dishes;
