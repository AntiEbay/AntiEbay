import HomePage from "./Pages/HomePage";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import BuyerPost from "./Pages/BuyerPost";
import SearchResults from "./Pages/SearchResults";
import BiddingPage from "./Pages/BiddingPage";
import ManageBids from "./Pages/ManageBids";
import CompletedPosts from "./Pages/CompletedPosts";
import ActiveOrders from "./Pages/ActiveOrders";
import ManagePosts from "./Pages/ManagePosts";
import ViewBids from "./Pages/ViewBids";
import AccountInfo from "./Pages/AccountInfo";
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
          <Route path="/Bidding" element={<BiddingPage />} />
          <Route path="/ManageBids" element={<ManageBids />} />
          <Route path="/ActiveOrders" element={<ActiveOrders />} />
          <Route path="/ManagePosts" element={<ManagePosts />} />
          <Route path="/CompletedPosts" element={<CompletedPosts />} />
          <Route path="/ViewBids" element={<ViewBids />} />
          <Route path="/AccountInfo" element={<AccountInfo />} />
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
