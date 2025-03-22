import React, { useContext, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { CartContext, Coordinates, Visibility } from '../context/contextApi'
import Cart from './Cart'

function Head() {

  const navItems = [
    {
      name: "Swiggy Corporate",
      image: "fi-rr-shopping-bag",
      path: "/corporate"
    },
    {
      name: "Search",
      image: "fi-rr-search",
      path: "/search"
    },
    {
      name: "Offers",
      image: "fi-rr-badge-percent",
      path: "/offers"
    },
    {
      name: "Help",
      image: "fi-rr-info",
      path: "/help"
    },
    {
      name: "Sign In",
      image: "fi-bs-user",
      path: "/sign_in"
    },
    {
      name: "Cart",
      image: "fi-rr-shopping-cart-add",
      path: "/cart"
    }
  ]

  const [searchResult, setSearchResult] = useState([])
  const [address, setAddress] = useState("")
  const { cartData, setCartData } = useContext(CartContext)
  const { visible, setVisible } = useContext(Visibility)
  const { setCoord } = useContext(Coordinates)
  const [headerLocation, setHeaderLocation] = useState("Others")

  function handleVisbility() {
    setVisible(prev => !prev)
  }

  async function searchResultData(val) {
    if (val == "") return
    const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`);
    const data = await res.json();
    setSearchResult(data?.data)
  }

  async function fetchlatAndLong(id) {
    if (id == "") return
    handleVisbility()
    const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`);
    const data = await res.json();
    setCoord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng
    })
    setAddress(data.data[0].formatted_address)
    setHeaderLocation(data?.data[0]?.address_components[0]?.long_name)
  }

  return (
    <div className='relative w-full'>

      <div className='w-full'>
        <div onClick={handleVisbility} className={"w-full bg-black/50 h-full z-30 absolute " + (visible ? "visible " : "invisible")}></div>
        <div className={'bg-white w-[40%] flex justify-end h-full p-5 absolute z-40 duration-500 ' + (visible ? "left-0" : "-left-[100%]")}>
          <div className='flex flex-col gap-4 w-[70%] mr-6'>
            <i className="fi fi-rr-cross-small text-3xl text-gray-600" onClick={handleVisbility}></i>
            <input type="text" className="border p-5 focus:outline-none focus:shadow-lg" onChange={(e) => searchResultData(e.target.value)} />
            <div className='p-5 pt-2'>
              <ul>
                {searchResult.map((data, index) => {
                  const isLast = index === searchResult.length - 1;
                  return (
                    <div className="my-5" key={data.place_id}>
                      <div className="flex gap-3">
                        <i className="mt-1 fi fi-rr-marker"></i>
                        <li className='hover:cursor-pointer hover:text-orange-600' onClick={() => fetchlatAndLong(data.place_id)}>
                          {data.structured_formatting.main_text}
                          <p className="text-sm opacity-65">{data.structured_formatting.secondary_text}</p>
                        </li>
                      </div>
                      {!isLast && <p className="opacity-40">---------------------------------------------------------</p>}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full sticky bg-white z-20 top-0 shadow-md h-18 flex justify-center items-center'>
        <div className=' w-[75%] flex justify-between'>

          <div className='flex items-center'>
            <Link to={"/"}>
              <img className='w-20' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="" />
            </Link>
            <div className='flex items-center gap-1' onClick={handleVisbility}>
              <p><span className="font-semibold text-[15px] hover:cursor-pointer mr-1 border-b-2 border-black">{headerLocation}</span> <span className={address ? "text-[15px] hover:cursor-pointer hover:text-orange-600" : ""}>{address && (address.length > 30 ? address.substring(0, 30) + "..." : address)}</span></p>
              <i className="fi text-1.5xl text-gray-900 mt-2 fi-rr-angle-small-down"></i>
            </div>
          </div>

          <div className='flex items-center gap-12'>
            {
              navItems.map((data) => (
                <Link key={data.name} to={data.path}>
                  <div className='flex items-center gap-2'>
                    <i className={`mt-1 fi font-semibold text-black ${data.image}`}></i>
                    <p className='text-l font-semibold text-black'>{data.name}</p>
                    {data.name === "Cart" && cartData.length > 0 && cartData.length}
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default Head