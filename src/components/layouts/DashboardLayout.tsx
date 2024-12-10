"use client"

import { useState } from "react"
import { Menu, X, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface SidebarItem {
  title: string
  path: string
  icon: React.ReactNode
}

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebarItems: SidebarItem[]
  title: string
}

export function DashboardLayout({
  children,
  sidebarItems,
  title,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* 侧边栏 */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col w-64 transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700",
          !sidebarOpen && "transform -translate-x-full lg:translate-x-0 lg:w-20"
        )}
      >
        {/* 侧边栏头部 */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link 
            href="/dashboard" 
            className={cn(
              "flex items-center space-x-3 text-gray-800 dark:text-white font-semibold",
              !sidebarOpen && "lg:justify-center"
            )}
          >
            {!sidebarOpen ? (
              <span className="text-xl">🚀</span>
            ) : (
              <>
                <span className="text-xl">🚀</span>
                <span className="text-lg">控制台</span>
              </>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 侧边栏导航 */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 rounded-lg transition-colors",
                    !sidebarOpen && "lg:justify-center lg:px-2",
                    pathname === item.path
                      ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  )}
                >
                  <span className="flex items-center justify-center w-5 h-5">
                    {item.icon}
                  </span>
                  {sidebarOpen && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 侧边栏底部 */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex items-center justify-center w-full p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronLeft
              className={cn(
                "w-5 h-5 transition-transform",
                !sidebarOpen && "transform rotate-180"
              )}
            />
          </button>
        </div>
      </aside>

      {/* 主要内容区域 */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* 顶部导航栏 */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md lg:hidden"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
                {title}
              </h1>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 