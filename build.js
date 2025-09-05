// build.js
const fs = require('fs');
const path = require('path');

// 读取环境变量
const branch = process.env.PUBLIC_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main';
const version = process.env.PUBLIC_VERSION || `latest-${branch}`;
const commitSha = process.env.PUBLIC_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || 'dev-commit';

// 读取 HTML 模板
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// 读取当前目录下除了 index.html 的所有 HTML 文件
function getFeatureCards() {
  try {
    const files = fs.readdirSync(__dirname);
    const htmlFiles = files.filter(file => 
      file.endsWith('.html') && file !== 'index.html'
    );

    // 为每个 HTML 文件生成功能卡片
    const cards = [];

    htmlFiles.forEach(file => {
      // 读取HTML文件内容
      const filePath = path.join(__dirname, file);
      let htmlContent = '';
      try {
        htmlContent = fs.readFileSync(filePath, 'utf8');
      } catch (error) {
        console.error(`读取文件 ${file} 失败:`, error);
      }

      // 解析HTML获取title和description
      let title = file.replace('.html', '');
      let description = `这是 ${file} 页面，点击访问。`;

      // 尝试从meta标签获取title
      const titleMatch = htmlContent.match(/<meta\s+name="title"\s+content="([^"]+)"/i);
      if (titleMatch && titleMatch[1]) {
        title = titleMatch[1];
      } else {
        // 如果没有meta title，尝试从title标签获取
        const htmlTitleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
        if (htmlTitleMatch && htmlTitleMatch[1]) {
          title = htmlTitleMatch[1];
        }
      }

      // 尝试从meta标签获取description
      const descriptionMatch = htmlContent.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
      if (descriptionMatch && descriptionMatch[1]) {
        description = descriptionMatch[1];
      }

      const card = `            <div class="feature-card">
                <h3>${title}</h3>
                <p>${description}</p>
                <a href="${file}">访问</a>
            </div>`;
      cards.push(card);
    });

    return cards.join('\n');
  } catch (error) {
    console.error('读取HTML文件失败:', error);
    return '';
  }
}

// 获取功能卡片HTML
const featureCards = getFeatureCards();

// 替换占位符
htmlContent = htmlContent
  .replace(/{{PUBLIC_COMMIT_SHA}}/g, commitSha.slice(0, 7))
  .replace(/{{PUBLIC_VERSION}}/g, version)
  // 在指定位置添加功能卡片
  .replace('{{FEATURE_CARDS}}', featureCards);

// 写入最终 HTML
const outputPath = path.join(__dirname, 'index.html');
fs.writeFileSync(outputPath, htmlContent);