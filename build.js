// build.js
const fs = require('fs');
const path = require('path');

// 读取环境变量
const branch = process.env.PUBLIC_BRANCH || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF;
const version = process.env.PUBLIC_VERSION || `latest-${branch}`;
const commitSha = process.env.PUBLIC_COMMIT_SHA || process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;

// 读取 HTML 模板
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 替换占位符
htmlContent = htmlContent
  .replace(/{{PUBLIC_COMMIT_SHA}}/g, commitSha)
  .replace(/{{PUBLIC_VERSION}}/g, version);

// 写入最终 HTML
const outputPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outputPath, htmlContent);