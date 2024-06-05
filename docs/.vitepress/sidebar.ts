import { DefaultTheme } from "vitepress";
var sidebarConfig: DefaultTheme.Sidebar | undefined = {
  "/note1": [
    {
      text: "工具",
      items: [
        {
          text: "指令速查",
          link: "/note1/",
        },
        {
          text: "容器Docker",
          link: "/note1/docker",
        },
        {
          text: "版本管理Git",
          link: "/note1/git",
        },
      ],
    },
    {
      text: "Java后端",
      items: [
        {
          text: "集合类与IO",
          link: "/note1/集合类与IO",
        },
      ],
    },
    {
      text: "Examples",
      items: [
        { text: "Markdown Examples", link: "/markdown-examples" },
        { text: "Runtime API Examples", link: "/api-examples" },
        { text: "Docker命令", link: "/package2/docker-note" },
      ],
    },
    {
      text: "test",
      items: [
        {
          text: "Markdown Examples",
          // link: "/markdown-examples",
          items: [{ text: "Markdown Examples", link: "/markdown-examples" }],
        },
        { text: "Runtime API Examples", link: "/api-examples" },
      ],
    },
  ],
  "/note2": [
    {
      text: "index页面",
      link: "/note2/",
    },
    {
      text: "容器Docker的安装",
      link: "/note2/docker-install",
    },
    {
      text: "使用Docker安装stablediffusion",
      link: "/note2/sd-docker-install",
    },
  ],
  "/note3": [
    {
      base: "/note3/",
      text: "乱七八糟",
      items: [
        {
          text: "前端",
          link: "front-end",
        },
      ],
    },
  ],
};
export default sidebarConfig;
