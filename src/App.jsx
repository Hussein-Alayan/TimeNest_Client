import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CreateCapsule from "./pages/CreateCapsule";
import Wall from "./pages/Wall";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Header from "./Components/shared/header";
import Footer from "./Components/shared/footer";
import PrivateRoute from "./Components/content/auth/PrivateRoute";
import MyCapsulesPage from "./pages/MyCapsules";
import MapPage from "./pages/Map";
// import Footer from "./Components/shared/footer"; // Uncomment when i do footer

const App = () => {
  const location = useLocation();
  const showFooter = ["/", "/wall", "/map"].includes(location.pathname);
  return (
    <div className="app-root">
      <Header />
      <main>
    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-capsule" element={
            <PrivateRoute>
              <CreateCapsule />
            </PrivateRoute>
          } />
          <Route path="/wall" element={<Wall />} />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-capsules" element={
            <PrivateRoute>
              <MyCapsulesPage />
            </PrivateRoute>
          } />
          <Route path="/map" element={<MapPage />} />
    </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
