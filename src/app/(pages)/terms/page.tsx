"use client";
import React from "react";

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">服务条款</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. 服务协议的接受</h2>
          <p className="text-gray-600">
            通过访问或使用我们的服务，您同意受本服务条款的约束。如果您不同意这些条款的任何部分，请不要使用我们的服务。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. 服务说明</h2>
          <p className="text-gray-600">
            我们提供的服务内容可能会不时更新或修改。我们保留随时修改或终止服务的权利，恕不另行通知。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. 用户责任</h2>
          <p className="text-gray-600">
            用户在使用我们的服务时，必须遵守所有适用的法律法规。用户不得从事任何可能损害其他用户或我们利益的行为。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. 隐私政策</h2>
          <p className="text-gray-600">
            我们重视用户的隐私保护。关于我们如何收集、使用和保护您的个人信息，请参阅我们的隐私政策。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. 知识产权</h2>
          <p className="text-gray-600">
            我们的服务中的所有内容，包括但不限于文字、图片、标志、设计等，均为我们或我们的许可方所有。未经授权，不得使用这些内容。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. 免责声明</h2>
          <p className="text-gray-600">
            我们的服务按“现状”提供，不提供任何明示或暗示的保证。我们不对服务的中断或任何损失承担责任。
          </p>
        </section>

        <section className="mt-8">
          <p className="text-sm text-gray-500">最后更新时间：2024-12-10</p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
