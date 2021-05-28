import React, { useState, useEffect } from "react";
import "../App.css";
import Winter from "../Components/Season/Winter";
import Summer from "../Components/Season/Summer";
import Monsoon from "../Components/Season/Monsoon";
import Signup from "../Components/Account/SignUp";
import SignIn from "../Components/Account/SignIn";
import TourPackage from "../Components/Packages/tourPackages";
import UpdatePlace from "../Components/Admin/updatePlaceAdmin";
import Register from "../Components/Register";
import HiddenCard from "../Components/cardHidden";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import UpdatePackage from "../Components/Admin/UpdatePackage";
import DetailPackage from "../Components/Packages/detailsPackage";
import setupProfile from "../profile";
import AdminProtectedRoute from "./adminProtectedRoute"
import UserProtectedRoute from "./UserProtectedRoute";
import CircularProgress from '@material-ui/core/CircularProgress';



const AppRoutes = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function setup() {
      await setupProfile(setLoading);
      }
      setup();
      }, []);
      if (loading) {
        return <CircularProgress />
  }

  return (
    <div>
      <BrowserRouter>
        <div>
          <Switch>
          {/* Season Routes */}
            <Route exact path={"/summer"} component={Summer} />
            <Route exact path="/winter" component={Winter} />
            <Route exact path="/">{<Redirect to="/summer" />}</Route>
            <Route exact path="/monsoon" component={Monsoon} />
          {/* Login Route */}
            <Route exact path="/signup"render={(props) => <Signup {...props} />}/>
            <Route exact path="/signin" render={(props) => <SignIn {...props} />}/>
           {/* Package Route */}
            <Route exact path="/detailPackage/:id" render={(props) => <DetailPackage {...props} />}/>
            <Route exact path="/package/:id" render={(props) => <TourPackage {...props} />}/>
            
            {/* Only for Admin  */}
            <AdminProtectedRoute exact
              path="/place/:id"
           component={UpdatePlace}/>
            <AdminProtectedRoute
              exact
              path="/updatePackage/:id"
              component= {UpdatePackage}
            />

              <AdminProtectedRoute
                exact
                path="/hidden"
                component={HiddenCard}
              />
            
            <UserProtectedRoute
              exact
              path="/register"
            component={Register}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
