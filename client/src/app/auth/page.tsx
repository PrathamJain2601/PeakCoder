// "use client"

// import { useEffect, useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { registerPayload } from "@/types/user"
// import { useRegisterMutation } from "@/mutations/registerMutation"
// import { useLoginMutation } from "@/mutations/loginMutation"
// import { useRouter } from "next/navigation"
// import { useSelector } from "react-redux"
// import { RootState } from "@/store/store"

// const Page = () => {
//   const router = useRouter();
//    const user = useSelector((state: RootState) => state.user.user);
//     const [checked, setChecked] = useState(false);

//     useEffect(() => {
//       if (user !== null) setChecked(true);
//       if (user) router.push("/problemset");
//     }, [user, router])

//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState<registerPayload>({
//     name: "",
//     email: "",
//     username: "",
//     password: ""
//   });

//   const {mutateAsync: registerMutation, isPending: registerPending, error: registerError} = useRegisterMutation(()=>setIsLogin(true));

//   const {
//     mutateAsync: loginMutation,
//     isPending: loginPending,
//     error: loginError,
//     isSuccess: loginSuccess,
//   } = useLoginMutation();

//   useEffect(() => {
//     if (loginSuccess) {
//       router.push("/problemset");
//     }
//   }, [loginSuccess, router]);

//   const handleRegister = async () => {
//       await registerMutation(formData);
//       setFormData({name: "", email: "", username: "", password: ""});
//   }

//   const handleLogin = async () => {
//     await loginMutation({emailOrUsername: formData.email, password: formData.password});
//     setFormData({name: "", email: "", username: "", password: ""});
//   }

//   const toggleForm = () => {
//     setIsLogin(!isLogin)
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
//       <Card className="w-full max-w-md bg-gray-800 text-gray-100 shadow-xl">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">{isLogin ? "Login" : "Sign Up"}</CardTitle>
//           <CardDescription className="text-center text-gray-400">
//             {isLogin ? "Welcome back!" : "Create your account"}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={isLogin ? "login" : "signup"}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="space-y-4">
//                   {!isLogin && (
//                     <>
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Name</Label>
//                       <Input
//                         id="name"
//                         placeholder="Enter your name"
//                         className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                         value={formData.name}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Username</Label>
//                       <Input
//                         id="usename"
//                         placeholder="Enter your username"
//                         className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
//                         onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                         value={formData.username}
//                       />
//                     </div>
//                     </>
//                   )}
//                   <div className="space-y-2">
//                     <Label htmlFor="email">Email</Label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="Enter your email"
//                       className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       value={formData.email}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="password">Password</Label>
//                     <Input
//                       id="password"
//                       type="password"
//                       placeholder="Enter your password"
//                       className="bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
//                       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                       value={formData.password}
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </form>
//         </CardContent>
//         <CardFooter className="flex flex-col space-y-4">
//           {isLogin ?
            
//             <Button 
//               onClick={handleLogin}
//               disabled = {loginPending ? true : false}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105">
//               {loginPending ? "Loading..." : "Login"}
//             </Button>
//             :
//             <Button 
//               onClick={handleRegister}
//               disabled = {registerPending ? true : false}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105">
//               {registerPending ? "Loading..." : "Sign Up"}
//             </Button>
//           }

//           {registerError && <p className="text-red-500">{registerError.message}</p>}
//           {loginError && <p className="text-red-500">{loginError.message}</p>}
//           <p className="text-sm text-gray-400 text-center">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <button
//               onClick={toggleForm}
//               className="ml-1 text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline"
//             >
//               {isLogin ? "Sign Up" : "Login"}
//             </button>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default Page





"use client"

import { useEffect, useState } from "react"
import LoginComponent from "./login-component"
import SignupComponent from "./signup-component"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function AuthPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
      if (user?.id && user?.isVerified) router.push("/problemset");
    }, [user, router])
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-gray-900">
      <div className="rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
        {/* Branding Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PC</span>
            </div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">PeakCoder</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Master Competitive Programming</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-1 flex">
            <button
              onClick={() => setActiveTab("login")}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out ${
                activeTab === "login"
                  ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ease-in-out ${
                activeTab === "signup"
                  ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Component Content */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === "login" ? (
            <LoginComponent onSwitchToSignup={() => setActiveTab("signup")} />
          ) : (
            <SignupComponent onSwitchToLogin={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    </div>
  )
}
