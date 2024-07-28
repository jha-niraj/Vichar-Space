import { useState, useEffect } from 'react';
import { Bell, BookOpen, Edit, Search, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        // Apply the scrollbar-hiding style
        document.body.style.overflowY = 'scroll';

        // Add a style tag to hide WebKit scrollbar
        const style = document.createElement('style');
        style.textContent = `
            ::-webkit-scrollbar {
                width: 0px;
                background: transparent;
            }
        `;
        document.head.append(style);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Remove the scrollbar-hiding style
            document.body.style.overflowY = '';
            document.body.style.scrollbarWidth = '';
            style.remove();
        };
    }, []);

    return (
        <nav className={`fixed w-full mx-auto top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-semibold text-gray-900">VicharSpace</a>
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Vichar Space"
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                        
                        <button className="text-gray-600 hover:text-gray-900">
                            <BookOpen size={24} />
                        </button>
                        
                        <button className="text-gray-600 hover:text-gray-900">
                            <Bell size={24} />
                        </button>
                        
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full flex items-center">
                            <Edit size={20} className="mr-2" />
                            Write
                        </button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User size={24} className="text-gray-600" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Library</DropdownMenuItem>
                                <DropdownMenuItem>Stories</DropdownMenuItem>
                                <DropdownMenuItem>Stats</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">Sign Out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                    <div className="md:hidden">
                        {/* Mobile menu button */}
                        <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;