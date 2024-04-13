---
# lastUpdated: 1711802340000
---

<!-- <script setup>
import { useData } from 'vitepress'
const { theme, page, frontmatter, lang } = useData()
console.log(page)
</script> -->

# 指令速查

powershell 添加代理

```powershell
$env:HTTP_PROXY="http://127.0.0.1:10809"
$env:HTTPS_PROXY="http://127.0.0.1:10809"
```

Wget 下载文件

`-O` 指定文件名
`-P` 指定下载目录

```bash
wget -O file.txt -P /path/to/file/ https://example.com/file.txt
```
