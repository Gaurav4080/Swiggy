import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../utils/cartSlice'
import toast from 'react-hot-toast'
import { toggleDiffRes } from '../utils/toggleSlice'

function AddToCartButton({ info, resInfo, handleIsDiffRes }) {

    const cartData = useSelector((state) => state.cartSlice.cartItems)
    const getResInfoFromLocalStorage = useSelector((state) => state.cartSlice.resInfo)
    const dispatch = useDispatch()

    function handleIsDiffRes() {
        dispatch(toggleDiffRes())
    }

    function handleAddToCart() {
        const isAdded = cartData.some((data) => data.id === info.id);
        if (!isAdded) {
            if (getResInfoFromLocalStorage.name === resInfo.name || getResInfoFromLocalStorage.length === 0) {
                dispatch(addToCart({ info, resInfo }))
                toast.success("Item added to cart succesfully!")
            }
            else {
                handleIsDiffRes()
            }
        } else {
            toast.error("Item already added to Cart!")
        }
    }

    return (
        <button onClick={handleAddToCart} className={"bg-slate-100 text-lg left-1/2 -translate-x-1/2 font-bold border px-10 text-green-600 hover:cursor-pointer shadow-2xl shadow-slate-600 rounded-xl absolute py-2 bottom-[-20px]"}> ADD </button>

    )
}

export default AddToCartButton