import { Route, Routes } from "react-router-dom";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import ButtonScrollUp from "./components/ButtonScrollUp";
import Slices from "./components/Slices";
import Regular from "./components/Regular";
import MoreWraper from "./components/MoreWraper";
import Home from "./pages/Home";
import AllAlbomsPhoto from "./components/AllAlbomsPhoto";
import AskCoustOfThisCake from "./components/AskCoustOfThisCake";
import OneSearchCake from "./components/OneSearchCake";
import SentRequest from "./components/SentRequest";
import MyDesign from "./components/MyDesign";
import RequestPending from "./components/RequestPending";
import IsLoading from "./components/IsLoading";
import Error from "./components/Error";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="slices" element={<Slices />} />
        <Route path="regular" element={<Regular />} />
        <Route path="contactUs" element={<ContactUs />} />

        <Route path="/" element={<MoreWraper />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<AllAlbomsPhoto />} />
          <Route path="/cake" element={<AskCoustOfThisCake />} />
          <Route path="/search" element={<OneSearchCake />} />
          <Route path="/sentRequest" element={<SentRequest />} />
          <Route path="/myDesign" element={<MyDesign />} />
          <Route path="/requestPending" element={<RequestPending />} />
          <Route path="/isLoading" element={<IsLoading />} />
          <Route path="/error" element={<Error />} />
        </Route>
      </Routes>
      <ButtonScrollUp />
      <Footer />
    </div>
  );
}

export default App;
