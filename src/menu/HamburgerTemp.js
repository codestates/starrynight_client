import { withRouter, NavLink, Switch } from "react-router-dom";


function HamburgerTemp() {
  return (

    <div className="menuList_Temp_Login">
      {/* nothing special.
       */}
      <withRouter>
        <Switch>
          <ul className="nav_link">

            <li className="firstList"></li>
          </ul>
        </Switch>
      </withRouter>
    </div>

  )
}

export default withRouter(HamburgerTemp);