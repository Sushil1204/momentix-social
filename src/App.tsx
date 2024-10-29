import { Route, Routes } from "react-router-dom";
import Login from "./_auth/forms/login";
import Home from "./_root/pages/home";
import AuthLayout from "./_auth/authLayout";
import Registration from "./_auth/forms/registration";
import RootLayout from "./_root/rootLayout";
import CreatePost from "./_root/pages/createPost";
import EditPost from "./_root/pages/editPost";
import PostDetails from "./_root/pages/postDetails";
import Search from "./_root/pages/Search";
import Profile from "./_root/pages/profile";
import EditProfile from "./_root/pages/EditProfile";
import ComingSoon from "./_root/pages/comingSoon";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path="/friends" element={<ComingSoon />} />
          <Route path="/notifications" element={<ComingSoon />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </main>
  );
}

export default App;
