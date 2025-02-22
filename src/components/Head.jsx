import React from 'react'

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

  return (
    <div className='w-full shadow-md h-24 flex justify-center items-center'>
      <div className=' w-[70%] flex justify-between'>

        <div className='flex items-center'>
          <img className='w-24' src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" alt="" />

          <div className='flex items-center gap-1'>
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
  )
}

export default Head