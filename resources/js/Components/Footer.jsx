import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";

const LegalPopup = ({ type, isDarkMode, onClose }) => {
    const content = {
        privacyPolicy: {
            title: "Privacy Policy",
            sections: [
                {
                    title: "1. Information Collection",
                    text: "At Academix, we collect information you provide during account creation, journal selection, and file uploads (e.g., PDF/DOCX research papers). This includes your name, email, phone, and uploaded academic documents to enable our formatting services.",
                },
                {
                    title: "2. Data Usage",
                    text: "Your data is used to facilitate automated formatting of research papers, personalize your experience (e.g., saving journal preferences and formatting history), and improve our platform. We do not sell or share your personal or academic data with third parties without your explicit consent, except as required by law.",
                },
                {
                    title: "3. Data Protection",
                    text: "We implement industry-standard security measures, including encryption and secure storage, to protect your personal information and uploaded research files from unauthorized access, alteration, or disclosure.",
                },
                {
                    title: "4. User Rights",
                    text: "You have the right to access your personal and academic data, request corrections to inaccurate information, request deletion of your account and associated data (including uploaded files), and opt out of non-essential data processing, such as analytics.",
                },
                {
                    title: "5. Cookies and Tracking",
                    text: "We use cookies to enhance user experience, track platform usage, and improve journal search functionality. You can manage cookie preferences through your browser settings.",
                },
                {
                    title: "6. Data Retention",
                    text: "Uploaded research files and formatting data are retained only for as long as necessary to provide our services or as required by law. You can request deletion at any time via your account settings.",
                },
            ],
            lastUpdated: "July 2025",
        },
        termsOfService: {
            title: "Terms of Service",
            sections: [
                {
                    title: "1. Acceptance of Terms",
                    text: "By accessing or using Academix, you agree to these Terms of Service. If you do not agree, please refrain from using our platform.",
                },
                {
                    title: "2. User Accounts",
                    text: "You must create an account to use our formatting services and journal selection features. You are responsible for maintaining the confidentiality of your account credentials, providing accurate and up-to-date information, and all activities under your account.",
                },
                {
                    title: "3. Use of Services",
                    text: "You may upload research papers in PDF or DOCX format for automated formatting according to selected journal requirements. You agree not to upload content that is illegal, harmful, or violates intellectual property rights. You retain ownership of your uploaded papers but grant Academix a limited license to process and format them.",
                },
                {
                    title: "4. Intellectual Property",
                    text: "The Academix platform, including its design, code, and content (excluding user-uploaded papers), is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works of our platform content without explicit permission.",
                },
                {
                    title: "5. Limitation of Liability",
                    text: "Academix is not liable for errors in formatting due to incorrect journal selection or file issues, loss of data due to technical issues beyond our control, or any direct, indirect, or consequential damages arising from platform use.",
                },
                {
                    title: "6. Service Modifications",
                    text: "We reserve the right to modify or discontinue services, including formatting algorithms or journal databases, update pricing, features, or availability with prior notice, and terminate accounts for violation of these terms, such as uploading prohibited content.",
                },
                {
                    title: "7. Governing Law",
                    text: "These terms are governed by the laws of our jurisdiction.",
                },
            ],
            lastUpdated: "July 2025",
        },
    };

    const { title, sections, lastUpdated } = content[type];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`relative w-full max-w-2xl mx-auto rounded-lg shadow-2xl ${
                        isDarkMode
                            ? "bg-gradient-to-br from-gray-900 to-gray-800"
                            : "bg-gradient-to-br from-white to-gray-100"
                    }`}
                >
                    {/* Header with Title and Close Button */}
                    <div
                        className={`flex justify-between items-center p-5 border-b ${
                            isDarkMode
                                ? "border-gray-700 text-white"
                                : "border-gray-200 text-gray-900"
                        }`}
                    >
                        <h2 className="text-2xl font-semibold">{title}</h2>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-full transition-all duration-300 ${
                                isDarkMode
                                    ? "hover:bg-gray-700 text-white"
                                    : "hover:bg-gray-200 text-gray-900"
                            }`}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content Container with Custom Scrollbar */}
                    <div
                        className={`p-6 max-h-[500px] overflow-y-auto ${
                            isDarkMode ? "scrollbar-dark" : "scrollbar-light"
                        }`}
                    >
                        <div
                            className={`text-base ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                            } space-y-6`}
                        >
                            {sections.map((section, index) => (
                                <div key={index} className="space-y-2">
                                    <h3
                                        className={`text-lg font-medium ${
                                            isDarkMode
                                                ? "text-green-400"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {section.title}
                                    </h3>
                                    <p className="text-justify">
                                        {section.text}
                                    </p>
                                </div>
                            ))}
                            <p
                                className={`text-sm italic ${
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-500"
                                }`}
                            >
                                Last Updated: {lastUpdated}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .scrollbar-dark::-webkit-scrollbar {
                    width: 8px;
                }
                .scrollbar-dark::-webkit-scrollbar-track {
                    background: ${isDarkMode ? "#1f2937" : "#f3f4f6"};
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
        </AnimatePresence>
    );
};

const Footer = ({ isDarkMode }) => {
    const [activePopup, setActivePopup] = useState(null);

    return (
        <>
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`py-6 mt-12 text-center ${
                    isDarkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-100 text-gray-600"
                }`}
            >
                <p>© 2025 Academix. All rights reserved.</p>
                <p className="mt-2">
                    Empowering researchers to format academic papers with ease
                    and precision.
                </p>
                <div className="mt-4 space-x-4">
                    <button
                        onClick={() => setActivePopup("privacyPolicy")}
                        className={`transition-colors ${
                            isDarkMode
                                ? "hover:text-green-400"
                                : "hover:text-green-500"
                        }`}
                    >
                        Privacy Policy
                    </button>
                    <button
                        onClick={() => setActivePopup("termsOfService")}
                        className={`transition-colors ${
                            isDarkMode
                                ? "hover:text-green-400"
                                : "hover:text-green-500"
                        }`}
                    >
                        Terms of Service
                    </button>
                    <Link
                        href="/ContactPage"
                        className={`transition-colors ${
                            isDarkMode
                                ? "hover:text-green-400"
                                : "hover:text-green-500"
                        }`}
                    >
                        Contact
                    </Link>
                </div>
            </motion.footer>

            {activePopup && (
                <LegalPopup
                    type={activePopup}
                    isDarkMode={isDarkMode}
                    onClose={() => setActivePopup(null)}
                />
            )}
        </>
    );
};

export default Footer;
