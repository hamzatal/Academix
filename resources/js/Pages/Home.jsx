import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavBar from "../components/Nav";
import Footer from "../Components/Footer";
import ChatBot from "../Components/ChatBot";
import {
    BookOpen,
    Upload,
    Zap,
    Clock,
    MessageCircle,
    X,
    BookmarkPlus,
    AlertTriangle,
    ChevronUp,
    ArrowRight,
    Play,
    Check,
    Star,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [wishlist, setWishlist] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [stats, setStats] = useState({
        papers: 0,
        researchers: 0,
        journals: 0,
        success: 0,
    });
    const { props } = usePage();
    const user = props.auth?.user;

    // Animate numbers on component mount
    useEffect(() => {
        const animateNumbers = () => {
            const targets = {
                papers: 50000,
                researchers: 15000,
                journals: 2500,
                success: 98,
            };
            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;

            let currentStep = 0;
            const interval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                const easeOut = 1 - Math.pow(1 - progress, 3);

                setStats({
                    papers: Math.floor(targets.papers * easeOut),
                    researchers: Math.floor(targets.researchers * easeOut),
                    journals: Math.floor(targets.journals * easeOut),
                    success: Math.floor(targets.success * easeOut),
                });

                if (currentStep >= steps) {
                    clearInterval(interval);
                }
            }, stepTime);
        };

        animateNumbers();
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Auto-rotate features
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Initialize wishlist and tooltip
    useEffect(() => {
        const tooltipTimer = setTimeout(() => {
            setIsTooltipVisible(false);
        }, 5000);

        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }

        return () => clearTimeout(tooltipTimer);
    }, []);

    // Custom toast component for notifications
    const CustomToast = ({
        closeToast,
        toastProps,
        icon,
        title,
        message,
        color,
    }) => (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`flex items-center py-3 px-4 rounded-lg shadow-lg backdrop-blur-md ${
                isDarkMode
                    ? "bg-gray-900/90 text-white border border-gray-800/50"
                    : "bg-white/90 text-gray-900 border border-gray-200/50"
            }`}
        >
            <div className={`mr-3 p-2 rounded-full ${color}`}>{icon}</div>
            <div className="flex-1">
                <p className="font-medium text-sm">{title}</p>
                <p
                    className={`text-xs ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                    {message}
                </p>
            </div>
            <button
                onClick={closeToast}
                className={`ml-2 p-1 rounded-full hover:${
                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
            >
                <X size={16} />
            </button>
        </motion.div>
    );

    // Handle adding journal to wishlist
    const handleAddToWishlist = (journal) => {
        if (!wishlist.some((j) => j.id === journal.id)) {
            const newWishlist = [...wishlist, journal];
            setWishlist(newWishlist);
            localStorage.setItem("wishlist", JSON.stringify(newWishlist));

            toast(
                (props) => (
                    <CustomToast
                        {...props}
                        icon={<BookmarkPlus className="w-5 h-5 text-white" />}
                        title={`${journal.name} added to watchlist`}
                        message="You can find it in your watchlist section"
                        color="bg-green-500"
                    />
                ),
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                }
            );
        } else {
            toast(
                (props) => (
                    <CustomToast
                        {...props}
                        icon={<AlertTriangle className="w-5 h-5 text-white" />}
                        title={`${journal.name} is already in watchlist`}
                        message="This journal is already saved in your list"
                        color="bg-amber-500"
                    />
                ),
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                }
            );
        }
    };

    // Toggle chatbot visibility
    const toggleChat = () => setIsChatOpen(!isChatOpen);

    // Reset chatbot (placeholder)
    const resetChat = () => {
        console.log("Resetting chat");
    };

    // Close tooltip
    const handleCloseTooltip = () => {
        setIsTooltipVisible(false);
    };

    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "AI-Powered Formatting",
            description:
                "Our advanced AI automatically formats your papers according to journal guidelines",
            color: "from-blue-500 to-purple-600",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        },
        {
            icon: <Upload className="w-8 h-8" />,
            title: "Easy Upload",
            description:
                "Simply drag and drop your PDF or DOCX files and let us handle the rest",
            color: "from-green-500 to-emerald-600",
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Multi-Journal Support",
            description:
                "Support for 2500+ journals across all academic disciplines",
            color: "from-orange-500 to-red-600",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
        },
        {
            icon: <Clock className="w-8 h-8" />,
            title: "Instant Results",
            description: "Get your formatted paper ready in seconds, not hours",
            color: "from-pink-500 to-rose-600",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        },
    ];

    const testimonials = [
        {
            name: "Dr. Sarah Chen",
            role: "Research Scientist",
            institution: "Stanford University",
            content:
                "Academix has revolutionized how I prepare my research papers. What used to take hours now takes minutes!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
        },
        {
            name: "Prof. Michael Rodriguez",
            role: "Professor of Biology",
            institution: "MIT",
            content:
                "The accuracy and speed of Academix's formatting is incredible. It's become an essential tool in my research workflow.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        },
        {
            name: "Dr. Emily Johnson",
            role: "Medical Researcher",
            institution: "Harvard Medical School",
            content:
                "I've published in over 20 journals using Academix. The formatting is always perfect and saves me so much time.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        },
    ];

    const journals = [
        {
            id: 1,
            name: "Nature",
            category: "Science",
            impact: "49.962",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop",
        },
        {
            id: 2,
            name: "Science",
            category: "Multidisciplinary",
            impact: "47.728",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
        },
        {
            id: 3,
            name: "Cell",
            category: "Biology",
            impact: "38.637",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
        },
        {
            id: 4,
            name: "The Lancet",
            category: "Medicine",
            impact: "79.323",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
        },
        {
            id: 5,
            name: "NEJM",
            category: "Medicine",
            impact: "91.245",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop",
        },
        {
            id: 6,
            name: "Science Advances",
            category: "Multidisciplinary",
            impact: "13.116",
            image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=200&fit=crop",
        },
    ];

    return (
        <div
            className={`min-h-screen transition-all duration-500 scrollbar-${
                isDarkMode ? "dark" : "light"
            } ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
        >
            {/* Navigation */}
            <NavBar isDarkMode={isDarkMode} wishlist={wishlist} />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1516321318424-4d31b3f56f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="University Campus"
                        className="w-full h-full object-cover grayscale"
                    />
                    <div
                        className={`absolute inset-0 ${
                            isDarkMode
                                ? "bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"
                                : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
                        }`}
                    />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%234F46E5\' fill-opacity=\'0.03\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
                            <Zap className="w-4 h-4 text-blue-400 mr-2" />
                            <span className="text-sm font-medium text-blue-400">
                                AI-Powered Academic Formatting
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Transform Your
                            <br />
                            Research Papers
                        </h1>

                        <p
                            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-justify ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            Academix helps graduate students format their
                            academic papers effortlessly according to journal
                            requirements. Upload your research in PDF or DOCX,
                            select a journal, and download a perfectly formatted
                            document in seconds.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <Link
                            href={user ? "/UserProfile" : "/login"}
                            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center"
                        >
                            Start Formatting Now
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <button className="group px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-xl font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 flex items-center justify-center">
                            <Play className="w-5 h-5 mr-2" />
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                    >
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                                {stats.papers.toLocaleString()}+
                            </div>
                            <div
                                className={`text-sm font-medium ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                Papers Formatted
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">
                                {stats.researchers.toLocaleString()}+
                            </div>
                            <div
                                className={`text-sm font-medium ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                Researchers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-pink-400 mb-2">
                                {stats.journals.toLocaleString()}+
                            </div>
                            <div
                                className={`text-sm font-medium ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                Journals Supported
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                                {stats.success}%
                            </div>
                            <div
                                className={`text-sm font-medium ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                Success Rate
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className={`py-20 ${
                    isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Powerful Features for
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {" "}
                                Modern Research
                            </span>
                        </h2>
                        <p
                            className={`text-xl max-w-3xl mx-auto text-justify ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            Everything you need to format, submit, and publish
                            your research papers with confidence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                                        activeFeature === index
                                            ? isDarkMode
                                                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30"
                                                : "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200"
                                            : isDarkMode
                                            ? "bg-gray-800/50 border border-gray-700 hover:bg-gray-800"
                                            : "bg-white border border-gray-200 hover:shadow-lg"
                                    }`}
                                    onClick={() => setActiveFeature(index)}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div
                                            className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white`}
                                        >
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">
                                                {feature.title}
                                            </h3>
                                            <p
                                                className={`text-justify ${
                                                    isDarkMode
                                                        ? "text-gray-300"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={features[activeFeature].image}
                                    alt={features[activeFeature].title}
                                    className="w-full h-80 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {features[activeFeature].title}
                                    </h3>
                                    <p className="text-gray-200">
                                        {features[activeFeature].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journals Section */}
            <section id="journals" className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Supported
                            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                {" "}
                                Journals
                            </span>
                        </h2>
                        <p
                            className={`text-xl max-w-3xl mx-auto text-justify ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            Format your papers for top-tier journals across all
                            academic disciplines
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {journals.map((journal, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className={`group relative overflow-hidden rounded-2xl ${
                                    isDarkMode
                                        ? "bg-gray-800 border border-gray-700"
                                        : "bg-white border border-gray-200"
                                } hover:shadow-2xl transition-all duration-300`}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={journal.image}
                                        alt={journal.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 right-4">
                                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                            IF: {journal.impact}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">
                                                {journal.name}
                                            </h3>
                                            <p
                                                className={`text-sm text-justify ${
                                                    isDarkMode
                                                        ? "text-gray-400"
                                                        : "text-gray-600"
                                                }`}
                                            >
                                                {journal.category}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleAddToWishlist(journal)
                                            }
                                            className="p-2 hover:bg-green-500 text-green-400 hover:text-white rounded-lg transition-colors"
                                        >
                                            <BookmarkPlus className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <Link
                                        href={user ? "/UserProfile" : "/login"}
                                        className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                                    >
                                        Format for {journal.name}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/journals"
                            className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-xl font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300"
                        >
                            View All 2,500+ Journals
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className={`py-20 ${
                    isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Loved by
                            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                {" "}
                                Researchers
                            </span>
                        </h2>
                        <p
                            className={`text-xl max-w-3xl mx-auto text-justify ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            See what leading researchers are saying about
                            Academix
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                                className={`p-8 rounded-2xl text-center ${
                                    isDarkMode
                                        ? "bg-gray-800 border border-gray-700"
                                        : "bg-white border border-gray-200"
                                }`}
                            >
                                <div className="mb-6">
                                    <div className="flex justify-center mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-6 h-6 text-yellow-400 fill-current"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xl md:text-2xl font-medium leading-relaxed">
                                        "
                                        {
                                            testimonials[currentTestimonial]
                                                .content
                                        }
                                        "
                                    </p>
                                </div>

                                <div className="flex items-center justify-center space-x-4">
                                    <img
                                        src={
                                            testimonials[currentTestimonial]
                                                .image
                                        }
                                        alt={
                                            testimonials[currentTestimonial]
                                                .name
                                        }
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <h4 className="font-semibold text-lg">
                                            {
                                                testimonials[currentTestimonial]
                                                    .name
                                            }
                                        </h4>
                                        <p
                                            className={`text-sm ${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {
                                                testimonials[currentTestimonial]
                                                    .role
                                            }
                                        </p>
                                        <p
                                            className={`text-sm ${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-600"
                                            }`}
                                        >
                                            {
                                                testimonials[currentTestimonial]
                                                    .institution
                                            }
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentTestimonial
                                            ? "bg-blue-500 w-8"
                                            : isDarkMode
                                            ? "bg-gray-600 hover:bg-gray-500"
                                            : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-10" />
                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">
                            Ready to Transform Your
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {" "}
                                Research?
                            </span>
                        </h2>
                        <p
                            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-justify ${
                                isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            Join thousands of researchers who are already
                            formatting their papers in seconds
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href={user ? "/UserProfile" : "/login"}
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center justify-center"
                            >
                                Start Free Trial
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>

                            <Link
                                href="/ContactPage"
                                className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-xl font-semibold text-lg hover:bg-blue-400 hover:text-white transition-all duration-300 flex items-center justify-center"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Contact Sales
                            </Link>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-sm">
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-400 mr-2" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-400 mr-2" />
                                <span>14-day free trial</span>
                            </div>
                            <div className="flex items-center">
                                <Check className="w-5 h-5 text-green-400 mr-2" />
                                <span>Cancel anytime</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer isDarkMode={isDarkMode} />

            {/* ChatBot and Tooltip */}
            <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
                {isTooltipVisible && (
                    <div
                        className={`relative mb-4 p-4 bg-white text-black rounded-lg shadow-lg text-sm transition-all duration-300 animate-fade-in-down whitespace-nowrap`}
                    >
                        <button
                            onClick={handleCloseTooltip}
                            className="absolute top-1 right-1 text-gray-500 hover:text-gray-800"
                        >
                            <X size={20} />
                        </button>
                        <div className="flex items-center">
                            <MessageCircle className="mr-1 text-green-500" />
                            <p>Need help? Chat with our AI assistant</p>
                        </div>
                    </div>
                )}
                <ChatBot
                    isChatOpen={isChatOpen}
                    toggleChat={toggleChat}
                    resetChat={resetChat}
                />
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                newestOnTop
                limit={3}
                className="mt-16"
                toastStyle={{
                    background: "transparent",
                    boxShadow: "none",
                    padding: 0,
                }}
                closeButton={false}
            />

            {/* Scroll to Top Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: isScrolled ? 1 : 0,
                    scale: isScrolled ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isDarkMode
                        ? "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                        : "bg-white border border-gray-200 hover:shadow-xl"
                }`}
            >
                <ChevronUp className="w-6 h-6 text-blue-400" />
            </motion.button>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .scrollbar-dark::-webkit-scrollbar {
                    width: 8px;
                }
                .scrollbar-dark::-webkit-scrollbar-track {
                    background: #1f2937;
                    border-radius: 4px;
                }
                .scrollbar-dark::-webkit-scrollbar-thumb {
                    background: #10b981;
                    border-radius: 4px;
                }
                .scrollbar-dark::-webkit-scrollbar-thumb:hover {
                    background: #059669;
                }

                .scrollbar-light::-webkit-scrollbar {
                    width: 8px;
                }
                .scrollbar-light::-webkit-scrollbar-track {
                    background: #f3f4f6;
                    border-radius: 4px;
                }
                .scrollbar-light::-webkit-scrollbar-thumb {
                    background: #34d399;
                    border-radius: 4px;
                }
                .scrollbar-light::-webkit-scrollbar-thumb:hover {
                    background: #10b981;
                }
            `}</style>
        </div>
    );
};

export default Home;
