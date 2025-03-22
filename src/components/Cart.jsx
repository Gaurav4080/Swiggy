import React, { useContext } from 'react'
import { CartContext } from '../context/contextApi'

function Cart() {
    const { cartData, setCartData } = useContext(CartContext);
    return (
        <div className='w-full'>
            <div className='w-[50%] mx-auto'>
                {
                    cartData.map((data, index) => (
                        <div key={`item-${index}`} className='flex justify-between my-5 p-2'>
                            <h2 className='w-[70%] text-3xl'>{data.name}</h2>
                            {data.imageId &&
                                <img className='w-[30%] rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${data.imageId}`} alt="" />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Cart