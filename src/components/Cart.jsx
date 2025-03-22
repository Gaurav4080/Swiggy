import React, { useContext, useState } from 'react';
import { CartContext } from '../context/contextApi';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartData, setCartData } = useContext(CartContext);
    const [showMoreStates, setShowMoreStates] = useState({});

    if (cartData.length <= 0) {
        return (
            <div className="flex flex-col items-center mt-12 justify-center min-h-[60vh] text-center p-6">
                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="Cart Empty" className="w-75 h-75 md:w-80 md:h-80 mb-4" />
                <p className="text-xl font-bold text-gray-800">Your Cart is Empty!</p>
                <p className="text-gray-600 text-sm md:text-base max-w-sm mt-2">You can go to home page to view more restaurants</p>
                <Link to={"/"}><button className='m-3 text-white hover:cursor-pointer font-bold bg-orange-600 p-3 w-[300px]'>Restaurants near you!</button></Link>
            </div>
        );
    }

    function handleRemoveFromCart(index) {
        setCartData(cartData.filter((_, i) => i !== index));
    }

    function toggleShowMore(index) {
        setShowMoreStates((prev) => ({ ...prev, [index]: !prev[index] }));
    }

    return (
        <div className='w-full'>
            <div className='w-[50%] mx-auto'>
                {cartData.map((data, index) => {
                    let trimDes = data.description ? data.description.substring(0, 130) + "..." : "";
                    const showMore = showMoreStates[index] || false;
                    return (
                        <div key={`item-${index}`} className='flex justify-between my-5 p-2'>
                            <div className='w-[70%] mt-2'><h2 className='font-bold text-lg'>{data.name}</h2><p className='font-bold text-lg italic'>₹ {data.defaultPrice / 100 || data.price / 100}</p>{trimDes && (<div><span>{showMore ? data.description : trimDes}</span>{trimDes.length >= 50 && (<button onClick={() => toggleShowMore(index)} className="cursor-pointer mx-1 font-bold text-gray-600">{showMore ? "less" : "more"}</button>)}</div>)}</div>
                            <div className='w-[23%] relative'>{data.imageId && (<img className='rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`} alt="" />)}<button onClick={() => handleRemoveFromCart(index)} className={`bg-slate-100 text-lg font-bold border px-10 text-green-600 hover:cursor-pointer drop-shadow-2xl rounded-xl absolute left-4 py-2 ${data.imageId ? 'bottom-[-20px]' : 'top-[30px]'}`}> Remove </button></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Cart;
