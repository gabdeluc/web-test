'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/utenti', label: 'Utenti' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/prodotti', label: 'Prodotti' },
    ];

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center space-x-1 py-3">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${pathname === link.href
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
