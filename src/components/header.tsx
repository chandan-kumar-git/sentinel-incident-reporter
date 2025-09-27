'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Report Incident' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/analysis', label: 'Analysis' },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <nav className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-accent" />
          <span className="text-xl font-bold tracking-tight">Sentinel AI</span>
        </Link>
        <div className="flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/80',
                pathname === link.href ? 'bg-primary/90' : 'text-primary-foreground/80'
              )}
            >
              {link.label}
            </Link>
          ))}
           <div className="flex items-center gap-2">
             <Image 
                src="https://i0.wp.com/opportunitycell.com/wp-content/uploads/2022/03/SIH2.png?fit=327%2C345&ssl=1"
                alt="SIH 2025 Logo"
                width={32}
                height={32}
             />
             <div className="text-xs text-primary-foreground/70 hidden sm:block">
                <p className="font-bold">SIH 2025</p>
                <p>A prototype by Team Urbandons</p>
            </div>
           </div>
        </div>
      </nav>
    </header>
  );
}
