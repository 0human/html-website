# HTML 功能页面集合

这是一个用于管理和展示多个功能页面的HTML网站仓库。所有页面都可以通过`index.html`访问，每个功能页面可以根据issue使用腾讯元宝进行创建或者修改。

## 项目结构

```
├── .github/           # GitHub配置文件夹
│   ├── ISSUE_TEMPLATE/ # issue模板
│   └── workflows/      # GitHub Actions工作流
├── .gitignore         # Git忽略规则
├── .releaserc.json    # semantic-release配置
├── index.html         # 主页面入口
└── package.json       # 项目配置和依赖
```

## 功能介绍

- **index.html**：作为所有功能页面的入口点，展示所有可用的功能页面
- 支持根据issue通过腾讯元宝创建或修改功能页面
- 项目使用semantic-release进行版本管理

## 使用方法

### 访问页面

1. 打开浏览器
2. 访问`index.html`文件
3. 在页面上找到所需的功能页面并点击访问

### 创建或修改功能页面

1. 在GitHub上创建一个新的issue，描述需要创建或修改的功能页面
2. 使用腾讯元宝根据issue描述创建或修改对应的HTML页面
3. 将创建或修改的页面链接添加到`index.html`的功能列表中

## 开发指南

## 部署

项目配置了GitHub Actions工作流，可以自动部署到多个分支。具体配置请查看`.github/workflows/deploy-multiple-branches.yml`文件。

## 注意事项

- 所有功能页面都应该通过`index.html`进行访问
- 请按照issue描述使用腾讯元宝创建或修改功能页面
- 遵循项目的代码风格和提交规范
- 不要提交敏感信息到仓库中

## License

ISC