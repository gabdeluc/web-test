'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Stats {
    users: number;
    products: number;
    sessions: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/stats');

            if (res.status === 401) {
                router.push('/');
                return;
            }

            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-200 rounded-2xl w-1/3 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-32 bg-gray-200 rounded-3xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {/* Welcome Header */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Dashboard
                    </h1>
                    <p className="text-gray-600">Panoramica del sistema di autenticazione</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-500">Totale</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{stats?.users || 0}</div>
                        <div className="text-sm text-gray-600">Utenti registrati</div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-500">Catalogo</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{stats?.products || 0}</div>
                        <div className="text-sm text-gray-600">Prodotti disponibili</div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="text-xs font-medium text-gray-500">Attive</span>
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{stats?.sessions || 0}</div>
                        <div className="text-sm text-gray-600">Sessioni attive</div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Authentication Info - Large Card */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sistema di Autenticazione</h2>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Session-Based Auth</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        Autenticazione tradizionale con sessioni server-side per massima sicurezza
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">HTTP-only cookies</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">SHA-256</span>
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">7 giorni</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Middleware Protection</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                        Protezione automatica delle route private con redirect intelligente
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">Auto-redirect</span>
                                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">Edge Runtime</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Features - Sidebar */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white">
                        <h3 className="text-xl font-bold mb-6">Sicurezza</h3>

                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-sm mb-1">Cookie Sicuri</div>
                                    <div className="text-gray-400 text-xs">HTTP-only, SameSite, Secure</div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-sm mb-1">Password Hashing</div>
                                    <div className="text-gray-400 text-xs">Crittografia SHA-256</div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-sm mb-1">Session Expiration</div>
                                    <div className="text-gray-400 text-xs">Cleanup automatico</div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-semibold text-sm mb-1">Route Protection</div>
                                    <div className="text-gray-400 text-xs">Middleware controllo accessi</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="text-xs text-gray-400 mb-2">Livello di sicurezza</div>
                            <div className="flex items-center space-x-2">
                                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-400 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                                <span className="text-sm font-bold">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
