import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import Quote from "@/components/Quote";
import { SignInInput } from "@jhaniraj/medium-common-2";
import { BASE_URL } from "@/config";

const SignIn = () => {
    const [ signIn, setSignIn ] = useState<SignInInput>({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/user/signin`, signIn);
            if(!response) {
                throw new Error("Failed to Sign In");
            } 
            const token = response.data.token;
            localStorage.setItem("token", token);
            toast.success(response.data.msg);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch(err: any) {
            console.log("Error occurred while signup: " + err);
            toast.error("Failed to Sign In, Try again");
        }
    }

    return (
        <main className="grid grid-cols-1 md:grid-cols-2 w-full h-screen">
            <Toaster />
            <div className="flex flex-col gap-10 items-center justify-center">
                <h1 className="text-3xl font-semibold">Welcome, back</h1>
                <div className="flex flex-col w-[70%]">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-md font-medium">Username</label>
                            <Input type="text" placeholder="Enter your username" onChange={(e: any) => setSignIn(c => ({
                                ...c,
                                email: e.target.value
                            }))} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-md font-medium">Password</label>
                            <Input type="password" placeholder="Create a password" onChange={(e: any) => setSignIn(c => ({
                                ...c,
                                password: e.target.value
                            }))} />
                        </div>
                        <Button type="submit" className="w-full">Sign Up</Button>
                    </form>
                    <hr />
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 flex gap-2 items-center justify-center">
                            <h1 className="text-sm font-medium">Don't have an account?</h1>
                            <Link to="/signup" className="font-medium text-sm text-sky-600 hover:text-indigo-500">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden bg-gray-200 md:flex flex-col items-center justify-center">
                <Quote />
            </div>
        </main>
    )
}

export default SignIn;