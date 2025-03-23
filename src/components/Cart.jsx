import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCartData, deleteItem } from '../utils/cartSlice';
import toast from 'react-hot-toast';

function Cart() {
    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const dispatch = useDispatch()
    const [showMoreStates, setShowMoreStates] = useState({});
    const userData = useSelector((state) => state.authSlice.UserData)
    const navigate = useNavigate()
    let totalPrize = cartData.reduce((acc, currVal) => acc + (currVal.price ? currVal.price / 100 : currVal.defaultPrice / 100), 0);

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
        dispatch(deleteItem(index))
        toast.success("Item removed from cart!")
    }

    function clearCart() {
        dispatch(clearCartData())
        toast.success("Cart cleared succesfully!")
    }

    function toggleShowMore(index) {
        setShowMoreStates((prev) => ({ ...prev, [index]: !prev[index] }));
    }

    function handlePlaceOrder() {
        if (!userData) {
            toast.error("You need to login to place an order")
            navigate("/SignIn")
            return
        }
        toast.success("Order Placed Successfully")
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
                <h1>Total price: {totalPrize}</h1>
                <div className='flex justify-between'>
                    <button onClick={clearCart} className='`bg-slate-100 text-lg font-bold border px-10 mt-5 text-green-600 hover:cursor-pointer drop-shadow-2xl rounded-xl py-2'>Clear Cart</button>
                    <button onClick={handlePlaceOrder} className='`bg-slate-100 text-lg font-bold border px-10 mt-5 text-green-600 hover:cursor-pointer drop-shadow-2xl rounded-xl py-2'>Place Order</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
