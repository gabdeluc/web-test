'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
    ID: number;
    Nome: string;
    Prezzo: number;
    HasFoto: number;
}

export default function ProdottiPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState<'nome' | 'prezzo'>('nome');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/prodotti');

            if (res.status === 401) {
                router.push('/');
                return;
            }

            const data = await res.json();

            if (res.ok) {
                setProducts(data.products);
            } else {
                setError(data.error || 'Errore nel caricamento dei prodotti');
            }
        } catch (err) {
            setError('Errore di connessione');
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (column: 'nome' | 'prezzo') => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const sortedProducts = [...products].sort((a, b) => {
        let comparison = 0;

        if (sortBy === 'nome') {
            comparison = a.Nome.localeCompare(b.Nome);
        } else {
            comparison = a.Prezzo - b.Prezzo;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
                    <div className="bg-white rounded-2xl p-6">
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Gestione Prodotti
                </h1>
                <p className="text-gray-600 text-lg">
                    Visualizza e modifica i prodotti nel catalogo
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left">
                                    <button
                                        onClick={() => handleSort('nome')}
                                        className="flex items-center space-x-2 hover:text-violet-100 transition-colors font-semibold"
                                    >
                                        <span>Nome</span>
                                        {sortBy === 'nome' && (
                                            <svg
                                                className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-4 text-left">
                                    <button
                                        onClick={() => handleSort('prezzo')}
                                        className="flex items-center space-x-2 hover:text-violet-100 transition-colors font-semibold"
                                    >
                                        <span>Prezzo</span>
                                        {sortBy === 'prezzo' && (
                                            <svg
                                                className={`w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                            </svg>
                                        )}
                                    </button>
                                </th>
                                <th className="px-6 py-4 text-left font-semibold">Foto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {sortedProducts.map((product) => (
                                <tr
                                    key={product.ID}
                                    className="hover:bg-violet-50 transition-colors cursor-pointer"
                                    onClick={() => router.push(`/prodotti/${product.ID}`)}
                                >
                                    <td className="px-6 py-4">
                                        <span className="text-violet-600 font-medium hover:text-violet-700">
                                            {product.Nome}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 font-semibold">
                                        €{product.Prezzo.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {product.HasFoto ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Presente
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                                Assente
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nessun prodotto trovato</h3>
                        <p className="text-gray-600">Non ci sono prodotti nel catalogo.</p>
                    </div>
                )}
            </div>

            <div className="mt-6 text-sm text-gray-600">
                <p>
                    <span className="font-semibold text-violet-600">{products.length}</span> {products.length === 1 ? 'prodotto' : 'prodotti'} nel catalogo
                </p>
            </div>
        </div>
    );
}
