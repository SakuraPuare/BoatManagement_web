import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // 添加自定义规则
  {
    rules: {
      "@typescript-eslint/no-explicit-any": [
        "error", // 或 "warn" 根据偏好设置
        { 
          ignoreRestArgs: true,     // 允许在 rest 参数中使用 any
          ignoreArgs: true,         // 允许在函数参数中使用 any
          ignoreLocalVars: true,    // 允许在局部变量中使用 any
          // fixToUnknown: false,   // 是否自动修复为 unknown（默认 false）
        }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_", // 忽略以 _ 开头的参数
          varsIgnorePattern: "^_", // 忽略以 _ 开头的变量
        },
      ],
    },
  },
];

export default eslintConfig;