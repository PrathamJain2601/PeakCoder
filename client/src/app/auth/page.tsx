"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { registerPayload } from "@/types/user"
import { useRegisterMutation } from "@/mutations/registerMutation"
import { useLoginMutation } from "@/mutations/loginMutation"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

const Page = () => {
  const router = useRouter();
   const user = useSelector((state: RootState) => state.user.user);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      if (user !== null) setChecked(true);
      if (user) router.push("/problemset");
    }, [user, router]);

    if (!checked) return null; // wait for user info to load
    if (user) return null;     // user already redirected

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<registerPayload>({
    name: "",
    email: "",
    username: "",
    password: ""
  });

  const {mutateAsync: registerMutation, isPending: registerPending, error: registerError} = useRegisterMutation(()=>setIsLogin(true));

  const {
    mutateAsync: loginMutation,
    isPending: loginPending,
    error: loginError,
    isSuccess: loginSuccess,
  } = useLoginMutation();

  useEffect(() => {
    if (loginSuccess) {
      router.push("/problemset");
    }
  }, [loginSuccess, router]);

  const handleRegister = async () => {
      await registerMutation(formData);
      setFormData({name: "", email: "", username: "", password: ""});
  }

  const handleLogin = async () => {
    await loginMutation({emailOrUsername: formData.email, password: formData.password});
    setFormData({name: "", email: "", username: "", password: ""});
  }

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription className="text-center text-gray-400">
            {isLogin ? "Welcome back!" : "Create your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-4">
                  {!isLogin && (
                    <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        value={formData.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Username</Label>
                      <Input
                        id="usename"
                        placeholder="Enter your username"
                        className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        value={formData.username}
                      />
                    </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      value={formData.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      value={formData.password}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {isLogin ?
            
            <Button 
              onClick={handleLogin}
              disabled = {loginPending ? true : false}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105">
              {loginPending ? "Loading..." : "Login"}
            </Button>
            :
            <Button 
              onClick={handleRegister}
              disabled = {registerPending ? true : false}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105">
              {registerPending ? "Loading..." : "Sign Up"}
            </Button>
          }

          {registerError && <p className="text-red-500">{registerError.message}</p>}
          {loginError && <p className="text-red-500">{loginError.message}</p>}
          <p className="text-sm text-gray-400 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={toggleForm}
              className="ml-1 text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page

