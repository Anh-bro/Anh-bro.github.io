---
---

# front-end

## html

### 乱数假文

Lorem ipsum，简称为 Lipsum，是指一篇常用于排版设计领域的拉丁文文章，主要的目的为测试文章或文字在不同字型、版型下看起来的效果。中文的类似用法则称为乱数假文、随机假文。
vscode 中输入`lorem`按 tab 键即可生成

```html
<!-- p>lorem -->
<p>
  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo quisquam veniam
  asperiores ea? Mollitia, veniam! Possimus quas quasi, nam doloremque iure
  corporis architecto, aspernatur, quidem tempora tenetur mollitia eos
  laboriosam?
</p>
```

### 空白折叠原理

连续出现的空白字符（空格、换行、制表），在页面显示时，会被折叠为一个空格
`<pre>`元素中的内容不会出现空白折叠，实际是 css 的功能：`white-space: pre`

### href 属性

hyper reference 通常表示跳转地址

1. 普通链接，跳转地址
2. 锚链接,跳转到某个锚点
3. 功能链接,
   1. 执行 js 代码`javascript:`
   2. 发送邮件`mailto:`
   3. 打电话`tel:`

### target 属性

表示跳转窗口位置

1. `_self` 当前窗口
2. `_blank`在新窗口中打开

### 行级元素和块级元素

以前：某县元素在显示时，会独占一行，称为块级元素，某些元素不会独占一行，称为行级元素

现在：块级元素和行级元素的概念已经被弱化，CSS 的属性`display`属性可以控制元素的显示模式

1. 容器元素可以包含任何元素
2. a 元素几乎可以包含任何元素
3. 某些元素有固定的子元素（ul>li,ol>li,dl>dt+dd）
4. 标题元素和段落元素不能相互嵌套，并且不能包含容器元素

## CSS

重置样式表
[meyer.css](https://meyerweb.com/eric/tools/css/reset/)

### 盒模型

box：盒子，每个元素会在页面中占用一个矩形区域
盒子类型：

1. 块盒，display 等于 inline 的元素
2. 行盒，display 等于 block 的元素

行盒在页面中不换行，块盒独占一行

浏览器默认样式表设置的块盒：容器元素、h1-h6、p

常见的行盒（与内容有关）：`span`、`a`、`img`、`video`、`audio`

组成部分：

1. 内容 `content`  
   width、height，设置的时盒子内容的宽高
   <!-- 内容盒`content-box` -->
2. 填充 `padding`  
   `padding-left`、`padding-right`、`padding-top`、`padding-bottom`，设置的时盒子边框与盒子内容之间的距离  
   padding:**上 右 下 左**
   <!-- 填充区+内容区`padding-box` -->
3. 边框 `border`  
   边框=边框宽度`border-width`+边框样式`border-style`+边框颜色`border-color`
4. 外边距 `margin`  
   `margin-left`、`margin-right`、`margin-top`、`margin-bottom`，设置的时盒子边框与盒子边框之间的距离

### 颜色表示

**预设值**：定义好的单词
**三原色色值**：光学三原色（红绿蓝），每个颜色使用`0-255`之间的数字来表达色值

```css
/* rgb表示法 */
a {
  color: rgb(255, 0, 0);
}
/* hex表示法 */
b {
  color: #008c8c;
}
```

### 选择器

1. 标签选择器
2. id 选择器，js 需要 id`#IdName`
3. 类选择器，css 需要类`.ClassName`
4. 通配符选择器，选中所有元素`*`
5. 属性选择器，`[属性名]`

```css
/* 选中所有具有href属性的元素 */
[href] {
}
/* 可以指定属性值 */
[href="http://www.baidu.com"]
{
}
```

6. 伪类选择器，选中某些元素的某些状态`:`  
   顺序：`link`,`visited`,`hover`,`active`

```css
/* 悬停状态 */
a:hover {
}
/* 激活状态 */
a:active {
}
```

7. 伪元素选择器，选中某些元素的部分内容`::`  
   `before`,`after`

### line-height

设置**行高为容器的高度**，可以让单行文本垂直居中
行高可以设置为纯数字，相对于当前文字的大小

### box-sizing

改变宽高的影响范围默认`content-box`，改变为`border-box`，宽高会包含 padding 和 border

### overflow

控制内容一处边框盒后的处理方式

1. `visible` 默认值，超出部分不处理
2. `hidden` 超出部分隐藏
3. `scroll` 超出部分显示滚动条
4. `auto` 自动
