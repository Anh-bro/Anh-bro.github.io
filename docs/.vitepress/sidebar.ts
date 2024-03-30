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
          link: "/note1/docker-note",
        },
        {
          text: "版本管理Git",
          link: "/note1/git",
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
  //package2目录下的侧边栏
  // "/package2": [
  //   {
  //     text: "Examples",
  //     items: [
  //       { text: "Markdown Examples", link: "/markdown-examples" },
  //       { text: "Runtime API Examples", link: "/api-examples" },
  //       { text: "Docker命令", link: "/package2/docker-note" },
  //     ],
  //   },
  //   {
  //     text: "test",
  //     items: [
  //       { text: "Markdown Examples", link: "/markdown-examples" },
  //       { text: "Runtime API Examples", link: "/api-examples" },
  //     ],
  //   },
  // ],
};
export default sidebarConfig;
