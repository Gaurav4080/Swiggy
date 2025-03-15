import { Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Head from "./components/Head"
import RestaurantMenu from "./components/RestaurantMenu"
import { Visibility } from "./context/contextApi"
import { useState } from "react"

function App() {

    const [visible, setVisible] = useState(false)

  return (
    <Visibility.Provider value={{visible, setVisible}}>
      <div className={visible ? "max-h-screen overflow-hidden" : ""}>
        <Routes>
          <Route path="/" element={<Head />}>
            <Route path="/" element={<Body />}></Route>
            <Route path="/restaurantMenu/:id" element={<RestaurantMenu />}></Route>
          </Route>
        </Routes>
      </div>
    </Visibility.Provider>
  )
}

export default App
