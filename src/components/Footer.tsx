import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Ship } from "lucide-react";

("use client");

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Ship className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">
                智能船舶管理系统
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              专业的船舶管理解决方案，为水上交通运输提供全方位的数字化服务，
              助力行业数字化转型升级。
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>400-888-8888</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@shipmanage.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>北京市朝阳区科技园区</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  关于我们
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  功能特色
                </Link>
              </li>
              <li>
                <Link
                  href="#advantages"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  产品优势
                </Link>
              </li>
              <li>
                <Link
                  href="/service"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  服务内容
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-4">支持服务</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  帮助中心
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  技术文档
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  联系我们
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  隐私政策
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 智能船舶管理系统. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
