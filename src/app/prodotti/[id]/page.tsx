'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
    ID: number;
    Nome: string;
    Descrizione: string | null;
    Prezzo: number;
    Foto: string | null;
}

export default function ProductDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [nome, setNome] = useState('');
    const [descrizione, setDescrizione] = useState('');
    const [prezzo, setPrezzo] = useState('');
    const [foto, setFoto] = useState<File | null>(null);
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`/api/prodotti/${id}`);

            if (res.status === 401) {
                router.push('/');
                return;
            }

            const data = await res.json();

            if (res.ok) {
                setProduct(data.product);
                setNome(data.product.Nome);
                setDescrizione(data.product.Descrizione || '');
                setPrezzo(data.product.Prezzo.toString());
                if (data.product.Foto) {
                    setFotoPreview(`data:image/jpeg;base64,${data.product.Foto}`);
                }
            } else {
                setError(data.error || 'Errore nel caricamento del prodotto');
            }
        } catch (err) {
            setError('Errore di connessione');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Seleziona un file immagine valido');
                return;
            }
            setFoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setSaving(true);

        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('descrizione', descrizione);
            formData.append('prezzo', prezzo);
            if (foto) {
                formData.append('foto', foto);
            }

            const res = await fetch(`/api/prodotti/${id}`, {
                method: 'PUT',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('Prodotto aggiornato con successo!');
                setTimeout(() => {
                    router.push('/prodotti');
                }, 1500);
            } else {
                setError(data.error || 'Errore durante il salvataggio');
            }
        } catch (err) {
            setError('Errore di connessione');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push('/prodotti');
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded w-1/3 mb-8"></div>
                    <div className="bg-white rounded-2xl p-8">
                        <div className="space-y-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i}>
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                    <div className="h-12 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error && !product) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <button
                    onClick={() => router.push('/prodotti')}
                    className="flex items-center text-violet-600 hover:text-violet-700 font-medium mb-4 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Torna ai prodotti
                </button>
                <h1 className="text-4xl font-bold text-gray-900">
                    Modifica Prodotto
                </h1>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Prodotto *
                        </label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            required
                            maxLength={40}
                        />
                    </div>

                    <div>
                        <label htmlFor="prezzo" className="block text-sm font-medium text-gray-700 mb-2">
                            Prezzo (€) *
                        </label>
                        <input
                            id="prezzo"
                            type="number"
                            step="0.01"
                            min="0"
                            value={prezzo}
                            onChange={(e) => setPrezzo(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="descrizione" className="block text-sm font-medium text-gray-700 mb-2">
                            Descrizione
                        </label>
                        <textarea
                            id="descrizione"
                            value={descrizione}
                            onChange={(e) => setDescrizione(e.target.value)}
                            rows={5}
                            maxLength={1000}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                            placeholder="Descrizione dettagliata del prodotto..."
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            {descrizione.length}/1000 caratteri
                        </p>
                    </div>

                    <div>
                        <label htmlFor="foto" className="block text-sm font-medium text-gray-700 mb-2">
                            Foto Prodotto (JPG)
                        </label>

                        {fotoPreview && (
                            <div className="mb-4 relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                                <Image
                                    src={fotoPreview}
                                    alt="Anteprima prodotto"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}

                        <input
                            id="foto"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={handleFileChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            Formati supportati: JPG, JPEG, PNG
                        </p>
                    </div>

                    <div className="flex space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? 'Salvataggio...' : 'Salva Modifiche'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={saving}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Annulla
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
