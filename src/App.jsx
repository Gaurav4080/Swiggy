import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Head from "./components/Head"
import RestaurantMenu from "./components/RestaurantMenu"
import { CartContext, Coordinates } from "./context/contextApi"
import { useState } from "react"
import Cart from "./components/Cart"
import { useSelector } from "react-redux"

function App() {

  const [coord, setCoord] = useState({ lat: 28.5355161, lng: 77.3910265 })
  const [cartData, setCartData] = useState([])
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      <Coordinates.Provider value={{ coord, setCoord }}>
          <div className={visible ? "max-h-screen overflow-hidden" : ""}>
            <Routes>
              <Route path="/" element={<Head />}>
                <Route path="/" element={<Body />}></Route>
                <Route path="/restaurantMenu/:id" element={<RestaurantMenu />}></Route>
                <Route path="/Cart/" element={<Cart />}></Route>
                <Route path="*" element={<h1>Coming Soon</h1>}></Route>
              </Route>
            </Routes>
          </div>
      </Coordinates.Provider>
    </CartContext.Provider>
  )
}

export default App
