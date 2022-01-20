import { Route, Routes } from "react-router-dom";
import EditUserInfo from "./pages/EditUserInfo";
import FollowerListPage from "./pages/FollowerListPage";
import FollowingListPage from "./pages/FollowingListPage";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import PostPage from "./pages/PostPage";
import Signup from "./pages/Signup";
import ViewPostPage from "./pages/ViewPostPage";
import WritePage from "./pages/WritePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/:userId" element={<EditUserInfo />} />
      <Route path="/follower/:userId" element={<FollowerListPage />} />
      <Route path="/following/:userId" element={<FollowingListPage />} />
      <Route path="/feeds" element={<PostPage />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/post/:postId" element={<ViewPostPage />} />
      <Route path="/post" element={<WritePage />} />
    </Routes>
  );
}

export default App;
