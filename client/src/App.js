import { Route, Routes } from "react-router-dom";
import EditUserInfo from "./pages/EditUserInfo";
import MainPage from "./pages/MainPage";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import UserFeed from "./pages/UserFeed";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/user/:userId" element={<EditUserInfo />} />
        <Route path="/feeds" element={<UserFeed />} />
        <Route path="/post/:postId" element={<ViewPost />} />
        <Route path="/post" element={<CreatePost />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
