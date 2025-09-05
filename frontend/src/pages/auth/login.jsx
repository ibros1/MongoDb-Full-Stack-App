import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import React, { useEffect, useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../../components/spinner";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../../hooks/useUser";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, user } = UseUser();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [loading, setLoading] = useState(false);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post(`/api/user/login`, formData);

      if (data.isSuccess) {
        toast.dismiss();
        toast.success("Successfully logged in!");
        login(data.user, data.expiresIn);
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.dismiss();
        const errorMessage = error.response.data.message;
        toast.error(errorMessage || "Login failed.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex-col gap-2 mt-6 flex">
              <Button
                disabled={loading}
                type="submit"
                className="w-full cursor-pointer disabled:bg-gray-500"
              >
                {loading ? <Spinner /> : "Sign In"}
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="w-full cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
