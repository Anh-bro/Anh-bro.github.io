---
---

# front-end

AJAX 有两种实现方式

1. 基于 XHR（XMLHttpRequest）
2. 基于 Fetch

Axios 是上层的第三方库

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

#### 行盒

1. 盒子沿着内容眼神
2. 行盒不能设置宽高  
   调整行盒的宽高，应该使用字体大小、行高、字体类型
3. 内边距、边框、外边距
   水平方向有效，垂直方向不会占据空间

#### 行块盒

1. 不独占一行
2. 盒模型中所有尺寸都有效

### 文档流

#### 常规流

所有元素，默认情况下，都属于常规流布局

总体规则：块盒独占一行，行盒水平一次排列

包含块：每个盒子都有自己的包含块，包含块决定了盒子的排列区域

绝大部分情况：盒子的包含块为父元素的内容盒

块盒在其包含块中局中可以定宽，然后左右 margin 设置为 auto

#### 浮动

应用场景：**文字环绕**、**横向排列**
修改 float 属性值为：

- left：左浮动，元素靠上靠右
- right：右浮动，元素靠下靠左

默认为 none

当一个元素浮动后，元素必定为块盒

宽度、高度为 auto 时，适应内容宽度

左浮动盒子靠上靠左，右浮动盒子靠上靠右排列

> 文字没有在行盒中，浏览器会生成一个行盒包裹文字
> 清楚浮动：

```css
.clear::after {
  content: "";
  display: block;
  clear: both;
}
```

#### 定位

手动控制元素在包含块中的精准位置  
CSS 属性：position

- `static`：默认值，元素在常规流中，不使用定位
- `relative`：相对定位，元素在常规流中，不脱离常规流  
  相对于自己原来的位置进行偏移 `left` `right` `top` `bottom`
- `absolute`：绝对定位，元素在常规流中，脱离常规流  
  找祖先元素中第一个定位元素，该元素的填充盒为其包含块，若找不到，则它的包含块为整个网页
- `fixed`：固定定位，元素在常规流中，脱离常规流  
  和绝对定位一样但包含块为视口

某个方向居中：
定宽高，将左右（上下）设为 0，然后将 margin 设为 auto

堆叠上下文：`z-index` 数值越大越靠近用户

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
   `first-child`,`last-child`,`nth-child(n)`

```css
/* 悬停状态 */
a:hover {
}
/* 激活状态 */
a:active {
}
```

1. 伪元素选择器，选中某些元素的部分内容`::`  
   `before`,`after`,`first-letter`,`first-line`,`selection`

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

### 透明度

opacity：设置整个元素的透明度，取值为 0-1，0 表示完全透明，1 表示完全不透明  
在颜色位置设置 alpha 通道（rgba）

### 盒子隐藏

display:none
visibility:hidden

## javascript
