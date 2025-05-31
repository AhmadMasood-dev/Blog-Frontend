import { blogLogo } from "../../assets/images";
import Button from "../../utils/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  console.log(user, "user in navbar");
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="shadow bg-accent body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img src={blogLogo} className="w-32 h-16" alt="Blog Logo" />
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 p-3 text-xl md:ml-auto md:mr-auto">
          <Link to="/" className="hover:text-primary text-secondary">
            Home
          </Link>
          <Link to="/posts" className="hover:text-primary text-secondary">
            Posts
          </Link>
          <Link to="/create-post" className="hover:text-primary text-secondary">
            Create-Post
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {user && (
                <span className="mr-2 text-base text-secondary">
                  Hi, {user.fullName || user.username}
                </span>
              )}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Button onClick={() => navigate("/login")}>
              Login <IoIosArrowRoundForward className="text-xl" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
