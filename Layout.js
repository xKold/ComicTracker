import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { BookOpen, Library, Compass, TrendingUp, Star, Download } from "lucide-react";

const navigationItems = [
  {
    title: "Browse",
    url: "/browse",
    icon: Compass,
  },
  {
    title: "My List",
    url: "/mylist",
    icon: Library,
  },
  {
    title: "Import Comics",
    url: "/import",
    icon: Download,
  },
];

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ComicVault - Track Your Reading</title>
        <meta name="description" content="Track your Comics, Manga, Manwha, and Manhua reading progress" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="ComicVault" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ComicVault" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#1a0b2e" />
        
        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <div className="flex min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2d1b4e] to-[#1a0b2e]">
        {/* Left Sidebar */}
        <aside className="w-64 bg-[#0a0314] border-r border-purple-900/20 flex-shrink-0 hidden md:flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-purple-900/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">ComicVault</h1>
                <p className="text-purple-300/60 text-xs">Track Your Reading</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <div className="mb-6">
              <p className="text-purple-300/40 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
                Navigation
              </p>
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = router.pathname === item.url;
                  return (
                    <Link
                      key={item.title}
                      href={item.url}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-purple-600 text-white'
                          : 'text-purple-200/70 hover:bg-purple-900/20 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Quick Stats */}
            <div>
              <p className="text-purple-300/40 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
                Quick Stats
              </p>
              <div className="space-y-2 px-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-purple-200/70">
                    <TrendingUp className="w-4 h-4" />
                    <span>Reading</span>
                  </div>
                  <span className="font-semibold text-white">0</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-purple-200/70">
                    <Star className="w-4 h-4" />
                    <span>Favorites</span>
                  </div>
                  <span className="font-semibold text-white">0</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
}