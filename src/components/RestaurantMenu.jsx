import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function RestaurantMenu() {
    const {id} = useParams();
    let mainId = id.split("-").at(-1).split("t").at(-1);

    const [menuData, setMenuData] = useState("")

    async function fetchMenu(){
        const data = await fetch(`https://proxy.corsfix.com/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`)
        const result = await data.json()
        setMenuData(result?.data?.cards[0]?.card?.card?.text);
    }

    useEffect(() => {
      fetchMenu();
    }, [])
    
  return (
    <div>
        {`Restaurant Menu for ${mainId} ${menuData}`}
    </div>
  )
}

export default RestaurantMenu