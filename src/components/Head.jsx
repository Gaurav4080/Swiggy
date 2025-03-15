import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Visibility } from '../context/contextApi'

function Head() {

  const navItems = [
    {
      name: "Swiggy Corporate",
      image: "fi-rr-shopping-bag"
    },
    {
      name: "Search",
      image: "fi-rr-search"
    },
    {
      name: "Offers",
      image: "fi-rr-badge-percent"
    },
    {
      name: "Help",
      image: "fi-rr-info"
    },
    {
      name: "Sign In",
      image: "fi-bs-user"
    },
    {
      name: "Cart",
      image: "fi-rr-shopping-cart-add"
    }
  ]

  const { visible, setVisible } = useContext(Visibility)

  function handleVisbility() {
    setVisible(prev => !prev)
  }

  return (
    <div className='relative w-full'>

      <div className='w-full'>
        <div onClick={handleVisbility} className={"w-full bg-black/50 h-full z-30 absolute " + (visible ? "visible " : "invisible")}></div>
        <div className={'bg-white w-[40%] h-full absolute z-40 duration-500 ' + (visible ? "left-0" : "-left-[100%]")}>
          <p className='bg-black text-white p-5 w-[10%]' onClick={handleVisbility}>Cut</p>
        </div>
      </div>




      <div className='w-full sticky bg-white z-20 top-0 shadow-md h-18 flex justify-center items-center'>
        <div className=' w-[70%] flex justify-between'>

          <div className='flex items-center'>
            <Link to={"/"}>
              <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="" />
            </Link>
            <div className='flex items-center gap-1' onClick={handleVisbility}>
              <p className='font-bold border-b-2 border-black'>others</p>
              <i className="fi text-1.5xl text-orange-500 mt-2 fi-rr-angle-small-down"></i>
            </div>
          </div>

          <div className='flex items-center gap-14'>
            {
              navItems.map((data) => (
                <div key={data.name} className='flex items-center gap-3'>
                  <i className={`mt-1 fi text-gray-600 ${data.image}`}></i>
                  <p className='text-xl font-medium text-gray-600'>{data.name}</p>
                </div>
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