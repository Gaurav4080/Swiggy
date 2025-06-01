import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLogIn, toggleSearchBar } from '../utils/toggleSlice'
import { updateCoord } from "../utils/coordSlice";
import SignInBtn from './SignInBtn'

function Head() {

  const navItems = [
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
      path: "/SignIn"
    },
    {
      name: "Cart",
      image: "fi-rr-shopping-cart-add",
      path: "/cart"
    }
  ]

  const [searchResult, setSearchResult] = useState([])
  const [address, setAddress] = useState("")
  const cartData = useSelector((state) => state.cartSlice.cartItems)
  const userData = useSelector((state) => state.authSlice.UserData)
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)
  const logInvisible = useSelector((state) => state.toggleSlice.logInToggle)
  const dispatch = useDispatch()
  const [headerLocation, setHeaderLocation] = useState("Noida")

  function handleVisbility() {
    dispatch(toggleSearchBar());
  }

  function handleLogin() {
    dispatch(toggleLogIn());
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
    dispatch(updateCoord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng
    }));
    setAddress(data.data[0].formatted_address)
    setHeaderLocation(data?.data[0]?.address_components[0]?.long_name)
  }

  return (
    <>
      <div className='w-full'>
        <div onClick={handleVisbility} className={"w-full bg-black/50 h-full z-30 absolute " + (visible ? "visible " : "invisible")}></div>
        <div className={'bg-white w-full md:w-[35%] flex justify-end h-full p-5 absolute z-40 duration-500 ' + (visible ? "left-0" : "-left-[100%]")}>
          <div className='flex flex-col gap-4 w-[70%] mr-6'>
            <i className="fi fi-rr-cross-small text-3xl text-gray-600" onClick={handleVisbility}></i>
            <input type="text" placeholder='Search for location' className="border p-3 bg-slate-100 focus:outline-none focus:shadow-lg" onChange={(e) => searchResultData(e.target.value)} />
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
                      {!isLast && <hr className="opacity-100 mt-4" />}
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div onClick={handleLogin} className={"w-full bg-black/50 h-full z-30 absolute " + (logInvisible ? "visible " : "invisible")}></div>
        <div className={'bg-slate-100 w-full md:w-[35%] flex h-full p-9 fixed z-40 duration-500 ' + (logInvisible ? "right-0" : "-right-[100%]")}>
          <div className='gap-4 w-[70%]'>
            <i className="fi fi-rr-cross-small text-3xl text-gray-600" onClick={handleLogin}></i>
            <div className='flex items-center justify-between'>
              <h2 className='text-3xl font-semibold'>{userData ? "Logout" : "Login"}</h2>
              <img className='w-32' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" />
            </div>
            <SignInBtn />
            <p className='mt-1 font-semibold text-[11px]'>{userData ? "" : "By clicking on Login, I accept the Terms & Conditions & Privacy Policy"}</p>
          </div>
        </div>
      </div>

      <div className='relative w-full'>
        <div className='w-full sticky bg-white z-20 top-0 shadow-md h-18 flex justify-center items-center'>
          <div className='w-full sm:w-[90%] lg:w-[90%] flex justify-between'>

            <div className='flex items-center'>
              <Link to={"/"}>
                <div className='w-20'>
                  <img src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="" />
                </div>
              </Link>
              <div className='flex items-center ' onClick={handleVisbility}>
                <p className='flex items-center'><span className="font-semibold border-b-2 hover:cursor-pointer border-black">{headerLocation}</span> <span className={address ? "ml-2 max-w-[250px] text-sm hover:cursor-pointer hover:text-orange-600 opacity-85 line-clamp-1" : ""}>{address && (address.length > 30 ? address.substring(0, 30) + "..." : address)}</span></p>
                <i className="fi text-2xl mt-3 text-orange-500 fi-rs-angle-small-down"></i>
              </div>
            </div>

            <div className='hidden md:flex items-center gap-2 md:gap-10'>
              {
                navItems.map((data) => (
                  data.name === "Sign In" ?
                    <div key={data.name} className='hover:text-orange-700' onClick={handleLogin}>
                      <div className='flex items-center hover:cursor-pointer gap-2'>
                        {
                          userData &&
                          <div className='flex gap-2'>
                            <img src={userData.photo} className="w-8 h-8 rounded-full object-cover mt-1" />
                            <p className='mt-2 font-semibold'>{userData.name.split(" ")[0]}</p>
                          </div>
                        }
                        <p className='text-l font-semibold'>{userData ? "" : data.name}</p>
                        {data.name === "Cart" && (
                          <p className={`text-white text-xs font-semibold py-1 rounded-full flex items-center justify-center ${cartData.length > 0 ? "bg-green-600" : "bg-gray-400"
                            }`}>
                            {cartData.length > 0 ? cartData.length : ""}
                          </p>
                        )}
                      </div>
                    </div>
                    :
                    <Link key={data.name} to={data.path}>
                      <div className='flex items-center hover:text-orange-700 gap-2'>
                        <i className={`mt-1 fi font-semibold ${data.image}`}></i>
                        <p className='text-l font-semibold'>{data.name}</p>
                        {data.name === "Cart" && (
                          <p className={`text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center justify-center ${cartData.length > 0 ? "bg-orange-600" : "bg-gray-400"
                            }`}>
                            {cartData.length > 0 ? cartData.length : ""}
                          </p>
                        )}
                      </div>
                    </Link>
                ))
              }
            </div>

            <div className='flex md:hidden items-center gap-4 mr-4'>
              {navItems.map((data) => (
                <div key={data.name} className="flex">
                  {
                    data.name == "Sign In" ? (
                      <div onClick={handleLogin}>
                        <i className={`mt-1 fi font-semibold ${data.image}`}></i>
                      </div>
                    ) :
                      <Link to={data.path}>
                        <i className={`mt-1 fi font-semibold ${data.image}`}></i>
                      </Link>
                  }
                  {data.name === "Cart" && (
                    <p className={`text-white text-xs font-semibold w-6 h-6 ml-2 py-1 rounded-full flex items-center justify-center ${cartData.length > 0 ? "bg-green-600" : "bg-gray-400"}`}>
                      {cartData.length > 0 ? cartData.length : ""}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default Head