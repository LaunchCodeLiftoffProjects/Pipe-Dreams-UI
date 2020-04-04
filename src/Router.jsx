import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./Layout";
import PageOne from "./pages/pageOne.jsx";
import AddRestroom from "./pages/addRestroom.jsx";
import RestroomList from "./pages/restroomList.jsx";
import RestroomProfile from "./pages/restroomProfile.jsx";

export const Routes = () => {
  return (
    <Router>
      <Layout>
        <div style={{ marginTop: "100px" }}>
          <Route path="/" exact component={PageOne} />
          <Route path="/add-restroom" exact component={AddRestroom} />
          <Route path="/restrooms" exact component={RestroomList} />
          <Route path="/restrooms/:id" component={RestroomProfile} />
        </div>
      </Layout>
    </Router>
  );
};