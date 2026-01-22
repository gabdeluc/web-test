'use client';

import { useEffect, useState } from 'react';

export default function UtentiPage() {
    const [users, setUsers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();

            if (res.ok) {
                setUsers(data.users);
            } else {
                setError(data.error || 'Errore nel caricamento degli utenti');
            }
        } catch (err) {
            setError('Errore di connessione');
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
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-24 bg-gray-200 rounded-3xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-3xl">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Utenti Registrati
                    </h1>
                    <p className="text-gray-600">
                        <span className="font-semibold text-gray-900">{users.length}</span> {users.length === 1 ? 'utente registrato' : 'utenti registrati'} nel sistema
                    </p>
                </div>

                {users.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nessun utente trovato</h3>
                        <p className="text-gray-600">Non ci sono ancora utenti registrati nel sistema.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {users.map((username, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="text-white font-bold text-xl">
                                            {username.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-900 font-semibold truncate text-lg">
                                            {username}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            Utente #{index + 1}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
