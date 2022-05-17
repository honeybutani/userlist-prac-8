import "./components/Signup.css";

import { Signup } from "./components/Signup";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import PrivateRoutes from "./Routes/PrivateRoutes";
import Homepage from "./components/Homepage";
import PageNotFound from "./components/PageNotFound.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Signup />} />
          <Route path="/" element={<PrivateRoutes />}>
            <Route exact path="/homepage" element={<Homepage />} />
          </Route>
          <Route path="*" exact={true} element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
