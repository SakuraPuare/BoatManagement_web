"use client";

import React from "react";
import Link from "next/link";
import {Ship, User} from "lucide-react";
import {useAuth} from "@/hooks/useAuth";

export function Navbar() {
    const {logout, isAuthenticated} = useAuth();

    return (
        <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Ship className="h-8 w-8 text-blue-600"/>
                        <span className="ml-2 text-xl font-bold text-gray-800">
              智能船舶管理系统
            </span>
                    </div>
                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                >
                                    进入后台
                                </Link>
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="h-6 w-6 text-blue-600"/>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    退出登录
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                            >
                                登录系统
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
