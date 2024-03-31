import { DefaultTheme } from "vitepress";

var barConfig: DefaultTheme.NavItem[] = [
  { text: "主页", link: "/" },
  { text: "命令", link: "/note1/" },
  { text: "教程", link: "/note2/" },
  { text: "杂记", link: "/note3/" },
  {
    text: "示例",
    items: [
      { text: "api-examples", link: "/api-examples" },
      { text: "markdown-examples", link: "/markdown-examples" },
    ],
  },
];
export default barConfig;
