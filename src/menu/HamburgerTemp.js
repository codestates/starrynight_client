import { BrowserRouter, NavLink, Switch } from "react-router-dom";


function HamburgerTemp() {
  return (

    <div className="menuList_Temp_Login">
      {/* nothing special.
       */}
      <BrowserRouter>
        <Switch>
          <ul className="nav_link">

            <li className="firstList"></li>
          </ul>
        </Switch>
      </BrowserRouter>
    </div>

  )
}

export default HamburgerTemp;