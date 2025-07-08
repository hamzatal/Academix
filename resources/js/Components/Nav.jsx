import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    BookOpen,
    Bookmark,
    LogOut,
    User,
    BookA,
    Mail,
    Menu,
    X,
    LogIn,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import LiveSearch from "./LiveSearch";

const Nav = ({ isDarkMode, wishlist, handleLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url, props } = usePage();
    const user = props.auth?.user; // Access user from props.auth.user

    // Handle window resize to close mobile menu on large screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Navigation items
    const navItems = [
        { label: "Home", href: "/home", icon: Home },
        { label: "Watch list", href: "/Watchlist", icon: Bookmark },
        { label: "About Us", href: "/about-us", icon: BookOpen },
        { label: "Contact Us", href: "/ContactPage", icon: Mail },
        { label: "Subscribe", href: "/SubscriptionPage", icon: BookA },
    ];

    // Dropdown items for authenticated users
    const dropdownItems = [
        { label: "Profile", href: "/UserProfile", icon: User },
        {
            label: "Logout",
            href: route("logout"),
            icon: LogOut,
            method: "post",
        },
    ];

    // Check if the current URL is active
    const isActive = (href) => url === href;

    // Profile Button Component - For authenticated users
    const ProfileButton = () => (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                } focus:outline-none`}
            >
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt="User Avatar"
                        className="w-full h-full rounded-full object-cover"
                    />
                ) : (
                    <div
                        className={`w-full h-full rounded-full flex items-center justify-center ${
                            isDarkMode ? "bg-gray-600" : "bg-gray-300"
                        }`}
                    >
                        <User
                            className={`w-6 h-6 ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        />
                    </div>
                )}
            </motion.button>

            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg ${
                            isDarkMode
                                ? "bg-gray-800 text-white border border-gray-700"
                                : "bg-white text-gray-900 border border-gray-200"
                        } overflow-hidden z-50`}
                    >
                        {dropdownItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                method={item.method || "get"}
                                as={item.method ? "button" : "a"}
                                className={`flex items-center space-x-2 px-4 py-3 text-sm w-full text-left transition-colors ${
                                    isActive(item.href)
                                        ? isDarkMode
                                            ? "bg-gray-700"
                                            : "bg-gray-100"
                                        : isDarkMode
                                        ? "hover:bg-gray-700 focus:bg-gray-700"
                                        : "hover:bg-gray-100 focus:bg-gray-100"
                                }`}
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <item.icon className="w-5 h-5 mr-2" />
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );

    // Auth Button Component - For guest users (Single Login/Sign Up button)
    const AuthButton = () => (
        <div className="flex items-center">
            <Link
                href={route("login")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg`}
            >
                <LogIn className="w-4 h-4" />
                <span>Login / Sign Up</span>
            </Link>
        </div>
    );

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 400 }}
            className={`fixed top-0 left-0 right-0 z-20 px-4 md:px-10 py-3 flex justify-between items-center ${
                isDarkMode
                    ? "bg-gray-900/30 text-white"
                    : "bg-white/30 text-gray-900"
            } backdrop-blur-xl border-b ${
                isDarkMode ? "border-gray-800/50" : "border-gray-200/50"
            }`}
        >
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center"
                >
                    <BookA className="w-7 h-7 text-green-500 mr-2" />
                    <h1
                        className={`text-2xl font-bold tracking-tight ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Academ<span className="text-green-500"> IX</span>
                    </h1>
                </motion.div>
            </div>

            {/* Search Bar - Hidden on mobile, shown on tablet and up */}
            <div className="hidden md:block w-30 max-w-md">
                <LiveSearch
                    isDarkMode={isDarkMode}
                    onSearchResults={(results) =>
                        console.log("Search results:", results)
                    }
                />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                            isActive(item.href)
                                ? isDarkMode
                                    ? "bg-gray-800 text-white"
                                    : "bg-gray-100 text-black"
                                : isDarkMode
                                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                                : "text-gray-700 hover:bg-gray-100 hover:text-black"
                        }`}
                    >
                        <item.icon
                            className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                                isActive(item.href)
                                    ? isDarkMode
                                        ? "text-white"
                                        : "text-black"
                                    : isDarkMode
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }`}
                        />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Right Section with Auth/Profile and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
                <div className="hidden lg:block">
                    {user ? <ProfileButton /> : <AuthButton />}
                </div>
                <button
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`lg:hidden absolute top-full left-0 right-0 ${
                            isDarkMode ? "bg-gray-900/95" : "bg-white/95"
                        } backdrop-blur-lg border-b ${
                            isDarkMode ? "border-gray-800" : "border-gray-200"
                        } py-4`}
                    >
                        {/* Mobile Search */}
                        <div className="px-4 mb-4">
                            <LiveSearch
                                isDarkMode={isDarkMode}
                                onSearchResults={(results) =>
                                    console.log("Search results:", results)
                                }
                            />
                        </div>

                        {/* Mobile Nav Items */}
                        <div className="space-y-2 px-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium w-full ${
                                        isActive(item.href)
                                            ? isDarkMode
                                                ? "bg-gray-800 text-white"
                                                : "bg-gray-100 text-black"
                                            : isDarkMode
                                            ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile Auth/Profile Section */}
                        <div className="px-4 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                            {user ? (
                                <div className="space-y-2">
                                    {dropdownItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            method={item.method || "get"}
                                            as={item.method ? "button" : "a"}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium w-full ${
                                                isActive(item.href)
                                                    ? isDarkMode
                                                        ? "bg-gray-800 text-white"
                                                        : "bg-gray-100 text-black"
                                                    : isDarkMode
                                                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                                                    : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                            }`}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link
                                        href={route("login")}
                                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium w-full bg-green-500 text-white hover:bg-green-600`}
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <LogIn className="w-5 h-5" />
                                        <span>Login / Sign Up</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Wishlist in Mobile Menu - Only for authenticated users */}
                        {user && wishlist && wishlist.length > 0 && (
                            <div className="px-4 mt-4">
                                <Link
                                    href="/wishlist"
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium w-full ${
                                        isActive("/wishlist")
                                            ? isDarkMode
                                                ? "bg-gray-800 text-white"
                                                : "bg-gray-100 text-black"
                                            : isDarkMode
                                            ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Bookmark className="w-5 h-5" />
                                    <span>Wishlist ({wishlist.length})</span>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Nav;
