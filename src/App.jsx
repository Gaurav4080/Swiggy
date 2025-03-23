import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Head from "./components/Head"
import RestaurantMenu from "./components/RestaurantMenu"
import Cart from "./components/Cart"
import { useSelector } from "react-redux"
import SignIn from "./components/SignIn"

function App() {

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle)

  return (
        <div className={visible ? "max-h-screen overflow-hidden" : ""}>
          <Routes>
            <Route path="/" element={<Head />}>
              <Route path="/" element={<Body />}></Route>
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />}></Route>
              <Route path="/Cart/" element={<Cart />}></Route>
              <Route path="/SignIn/" element={<SignIn />}></Route>
              <Route path="*" element={<h1>Coming Soon</h1>}></Route>
            </Route>
          </Routes>
        </div>
  )
}

export default App
