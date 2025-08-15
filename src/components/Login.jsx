import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { getMeApi, loginApi } from "../services/users";
import { LoginSchema } from "../utils/validationSchema/UserSchema";
import Button from "./atoms/Button";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await loginApi(values);

      const userResponse = await getMeApi();

      if (userResponse?.data?.success) {
        setUser(userResponse?.data?.user);

        toast.success("Login successful!");
        navigate("/");
        setIsAuthenticated(true);
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.message || "Invalid email or password");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex items-center justify-center w-1/2 px-4 py-12 bg-white sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-accent">
              Sign in to your account
            </h2>
          </div>

          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="relative block w-full px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-none appearance-none text-secondary rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="my-10 sr-only">
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="relative block w-full px-3 py-2 my-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      isSubmitting || loading
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isSubmitting || loading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
