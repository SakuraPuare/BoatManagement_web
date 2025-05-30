import React from "react";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav>
        <Link href={`/dashboard/`}>
          <span className="block p-2">控制台</span>
        </Link>
      </nav>
    </aside>
  );
};
