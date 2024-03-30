import { DefaultTheme } from "vitepress";

var barConfig: DefaultTheme.NavItem[] = [
  { text: "主页", link: "/" },
  { text: "笔记", link: "/note1/" },
  { text: "Examples", link: "/package2/markdown-examples" },
  {
    text: "分组测试",
    items: [
      { text: "Home", link: "/package1" },
      { text: "Examples", link: "/package2/markdown-examples" },
    ],
  },
];
export default barConfig;
