import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full mb-6">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">AI-Powered Authentication</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Autenticazione<br />
            Intelligente
          </h1>

          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
            Sistema di autenticazione moderno con gestione prodotti integrata.
            Sicuro, veloce e facile da usare.
          </p>

          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 font-medium text-base group"
            >
              Inizia Ora
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-200 font-medium text-base">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Guarda Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500">01</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Sicurezza Avanzata</h3>
            <p className="text-gray-600 leading-relaxed">
              Crittografia SHA-256, cookie HTTP-only e sessioni sicure per proteggere i tuoi dati.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-500">02</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Prestazioni Elevate</h3>
            <p className="text-gray-600 leading-relaxed">
              Ottimizzato con Next.js 15 e database SQLite per velocità massima.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">&lt;100ms</div>
              <div className="text-gray-400">Response Time</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-gray-400">Secure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
