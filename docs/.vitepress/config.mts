import { defineConfig } from "vitepress";
import sidebarConfig from "./sidebar";
import barConfig from "./nav";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  titleTemplate: ":title|个人笔记",
  title: "title in config",
  description: "description in config",
  srcDir: "./src",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    image: {
      // 默认禁用图片懒加载
      lazyLoading: true,
    },
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  themeConfig: {
    logo: {
      src: "/logo.svg",
      alt: "logo is missing...",
    },
    siteTitle: "花木城",
    search: {
      provider: "local",
    },
    // aside: false, //右边栏
    outline: {
      //大纲显示的级别
      level: "deep",
      label: "页面导航",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: barConfig,

    sidebar: sidebarConfig,

    socialLinks: [
      { icon: "github", link: "https://github.com/Anh-bro" },
      {
        icon: {
          svg: '<svg t="1711704772479" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10633" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#888888" p-id="10634"></path></svg>',
        },
        link: "https://gitee.com/huamucheng",
      },
    ],
    footer: {
      message: "像旧时候，像老朋友。",
      copyright: "Copyright © 2024-present Han",
    },
  },
});
