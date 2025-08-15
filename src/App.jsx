import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import HomePage from "./pages/home";
import PostDetailPage from "./pages/PostDetailPage";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";
import MyPostsPage from "./pages/MyPostsPage";
import PostsPage from "./pages/PostPage/index";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import EditPostPage from "./pages/EditPostPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-accent">
          <Navbar />
          <div className="container p-4 mx-auto">
            <Routes>
              <Route index path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePostPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/get-user-posts"
                element={
                  <ProtectedRoute>
                    <MyPostsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/update-post/:postId"
                element={
                  <ProtectedRoute>
                    <EditPostPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
