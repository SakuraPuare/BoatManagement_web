import React from "react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-white font-bold mb-4">联系我们</h3>
                        <p>电话：400-888-8888</p>
                        <p>邮箱：support@shipmanage.com</p>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">快速链接</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="hover:text-white">
                                    关于我们
                                </Link>
                            </li>
                            <li>
                                <Link href="/service" className="hover:text-white">
                                    服务内容
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white">
                                    联系方式
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold mb-4">关注我们</h3>
                        <p>关注官方微信公众号，获取最新动态</p>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>© 2024 智能船舶管理系统. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
