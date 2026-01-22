'use client';

import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

interface User {
    id: number;
    username: string;
}

export default function Header() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleLoginSuccess = () => {
        setShowLoginModal(false);
        checkAuth();
    };

    const handleRegisterSuccess = () => {
        setShowRegisterModal(false);
        setShowLoginModal(true);
    };

    if (loading) {
        return (
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
                    <div className="flex justify-end">
                        <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <>
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">N</span>
                            </div>
                            <span className="text-xl font-semibold text-gray-900">NextAuth</span>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-3">
                            {user ? (
                                <>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm text-gray-600">Ciao, <span className="font-semibold text-gray-900">{user.username}</span></span>
                                        <button
                                            onClick={handleLogout}
                                            className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium text-sm"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setShowRegisterModal(true)}
                                        className="px-5 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-200 font-medium text-sm"
                                    >
                                        Registrati
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onSuccess={handleLoginSuccess}
                    onSwitchToRegister={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                    }}
                />
            )}

            {showRegisterModal && (
                <RegisterModal
                    onClose={() => setShowRegisterModal(false)}
                    onSuccess={handleRegisterSuccess}
                    onSwitchToLogin={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                    }}
                />
            )}
        </>
    );
}
