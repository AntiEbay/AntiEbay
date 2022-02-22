import "./App.css";
import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import BuyerPost from "./Pages/BuyerPost";
import SearchResults from "./Pages/SearchResults";
import BiddingPage from "./Pages/BiddingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountProvider } from "./SessionVariables";

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/BuyerPost" element={<BuyerPost />} />
          <Route path="/SearchResults" element={<SearchResults />} />
          <Route path="Bidding" element={<BiddingPage />} />
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
