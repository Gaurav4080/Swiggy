import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function useRestaurantsMenuData() {
  const { id } = useParams();
  const mainId = id.split("-").at(-1).split("t").at(-1);

  const [resInfo, setResInfo] = useState(null);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [value, setValue] = useState(0);

  function handleNext() {
    if (value < 90) setValue((prev) => prev + 38);
  }

  function handlePrev() {
    if (value > 0) setValue((prev) => prev - 38);
  }

  async function fetchMenu() {
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5355161&lng=77.3910265&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`
      );
      const result = await response.json();

      const resInfo = result?.data?.cards.find((data) =>
        data?.card?.card?.["@type"]?.includes("food.v2.Restaurant")
      )?.card?.card?.info;
      setResInfo(resInfo);

      const discountInfo = result?.data?.cards.find((data) =>
        data?.card?.card?.["@type"]?.includes("v2.GridWidget")
      )?.card?.card?.gridElements?.infoWithStyle?.offers;
      setDiscountData(discountInfo);

      const actualMenu = result?.data?.cards.find((data) => data?.groupedCard);

      const topPick = actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(
        (data) => data.card.card.title === "Top Picks"
      );
      setTopPicksData(topPick);

      const menu = actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      );
      setMenuData(menu);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return [resInfo, discountData, menuData, value, handleNext, handlePrev];
}

export default useRestaurantsMenuData;
