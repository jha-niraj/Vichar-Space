"use client";

import { useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/components/ui/navbar-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon, Pen, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import ShinyButton from "./ui/shiny-button";
import { useUser } from "@/context/UserContext";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(c => !c);
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();
        setTimeout(() => {
            navigate("/");
        }, 1000);
        toast.success("Logged out successfully");
    }

    return (
        <div
            className={cn("fixed top-5 inset-x-0 max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto z-50 transition-all duration-200", className)}
        >
            <Toaster />
            <Menu setActive={setActive}>
                <Link to="/" className="flex gap-2 items-center justify-center">
                    <h1 className="text-xl font-bold">VicharSpace</h1>
                </Link>
                <div className="hidden md:flex items-center justify-center gap-10">
                    <Link to="/aboutus">
                        About Us
                    </Link>
                    <Link to="/communities">
                        Communities
                    </Link>
                    <MenuItem setActive={setActive} active={active} item="Pricing">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/hobby">Hobby</HoveredLink>
                            <HoveredLink href="/individual">Individual</HoveredLink>
                            <HoveredLink href="/team">Team</HoveredLink>
                            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                        </div>
                    </MenuItem>
                </div>
                <div className="hidden md:flex gap-2 items-center justify-center">
                    <div className="flex items-center justify-center gap-6">
                        {
                            user ?
                                <Link to="/publish" className="flex gap-2 items-center justify-center">
                                    <Pen size={12} />
                                    <p className="font-lg">Write</p>
                                </Link>
                                :
                                ""
                        }
                        <ModeToggle />
                    </div>
                    {
                        user?.token ?
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none">
                                    <Avatar>
                                        {/* <AvatarImage src={session?.user?.image!} alt="@shadcn" /> */}
                                        <AvatarFallback><User size={24} /></AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-36">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <Link to="/dashboard">
                                        <DropdownMenuItem>Dashboard</DropdownMenuItem>
                                    </Link>
                                    <Link to="/profile">
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogOut} className="text-red-500 flex gap-2">Log Out <span className="text-black underline">{user?.name}</span></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <Link to="/signin" className="w-full mx-auto">
                                <ShinyButton>Sign In</ShinyButton>
                            </Link>
                    }
                </div>
                <div className="md:hidden flex gap-3 items-center justify-center">
                    <ModeToggle />
                    <div onClick={toggleMobileMenu} className="cursor-pointer">
                        <MenuIcon size={36} />
                    </div>
                </div>
            </Menu>
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <motion.div
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                            className={cn(
                                "fixed h-full w-full inset-0 bg-black dark:bg-black p-10 z-[50] flex flex-col justify-between",
                                className
                            )}
                        >
                            <div
                                className="absolute cursor-pointer right-8 top-12 z-50 text-white dark:text-neutral-200"
                                onClick={toggleMobileMenu}
                            >
                                <X size={32} />
                            </div>
                            <div className="flex flex-col space-y-6 pt-4">
                                <Link to="/web-dev" className="text-lg">Web Development</Link>
                                <Link to="/interface-design" className="text-lg">Interface Design</Link>
                                <Link to="/seo" className="text-lg">Search Engine Optimization</Link>
                                <Link to="/branding" className="text-lg">Branding</Link>
                                <Link to="/aboutus" className="text-lg">About Us</Link>
                                <Link to="/services" className="text-lg">Services</Link>
                                <Link to="/pricing" className="text-lg">Communities</Link>
                                {
                                    user?.token ? (
                                        <>
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                <User size={24} className="text-gray-600" />
                                                {/* <h1>{session?.user?.name}</h1> */}
                                            </div>
                                        </>
                                    ) : (
                                        <Link to="/signin" className="w-full flex items-center justify-center">
                                            <ShinyButton className="w-full">Sign In</ShinyButton>
                                        </Link>
                                    )
                                }
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    );
}