import { Route, Routes } from "react-router-dom";
import EditUserInfo from "./pages/EditUserInfo";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import ViewPostPage from "./pages/ViewPostPage";
import WritePage from "./pages/WritePage";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FollowingPage from "./pages/FollowingPage";
import FollowerModal from "./components/FollowerModal";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign/login" element={<LoginPage />} />
        <Route path="/user/:userId" element={<EditUserInfo />} />
        <Route path="/feeds" element={<PostPage />} />
        <Route path="/post/:postId" element={<ViewPostPage />} />
        <Route path="/post" element={<WritePage />} />
        <Route path="/sign/register" element={<SignupPage />} />
        <Route path="/follow/following/:userId" element={<FollowingPage />} />
        <Route path="/follow/follower/:userId" element={<FollowerModal />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
