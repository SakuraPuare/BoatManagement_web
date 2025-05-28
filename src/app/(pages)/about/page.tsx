"use client";
import React from "react";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">关于我们</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">我们的使命</h2>
          <p className="text-gray-600">
            我们致力于为用户提供最优质的服务，通过创新的技术解决方案，帮助用户实现他们的目标。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">我们的团队</h2>
          <p className="text-gray-600">
            我们拥有一支充满激情和创造力的团队，团队成员来自不同的背景，但都有着共同的目标：为用户创造价值。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">联系我们</h2>
          <p className="text-gray-600">
            邮箱：contact@example.com
            <br />
            地址：[您的地址]
            <br />
            电话：[您的联系电话]
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
