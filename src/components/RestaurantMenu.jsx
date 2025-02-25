import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RestaurantMenu() {
    const {id} = useParams();

    const [menuData, setMenuData] = useState("")

    async function fetchMenu(){
        const data = await fetch(`https://proxy.corsfix.com/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`)
        const result = await data.json()
        setMenuData(result?.data?.cards[0]?.card?.card?.text);
    }

    useEffect(() => {
      fetchMenu();
    }, [])
    
  return (
    <div>
        {`Restaurant Menu for ${id} ${menuData}`}
    </div>
  )
}

export default RestaurantMenu