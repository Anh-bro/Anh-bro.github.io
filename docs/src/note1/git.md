---
lastUpdated: 2024-04-15 16:52:00
---

# git 基本命令

将任意一个文件夹作文本地仓库，输入：

```bash
git init
```

输入后自动生成.git 隐藏文件夹，当前目录即为工作目录

创建成功后可以查看当前状态：

```bash
git status
```

查看提交记录：

```bash
git log
git log --oneline --graph --all
# 查看所有记录
git reflog
```

.gitignore 文件中指定忽略的文件，内容示例：

```txt
*.txt
!666.txt
test/
xxx/*.txt
```

将工作空间回退到指定提交的状态：

```bash
git reset --hard <commitID>
```

## 分支

```bash
# 查看当前分支
git branch
# 创建分支
git branch <branchName>
#删除分支
git branch -d <branchName>
# 切换分支
git checkout <branchName>
# 创建并切换分支
git checkout -b <branchName>

# 合并分支
git merge <branchName>
# 删除远程分支
git push origin --delete <branchName>
```

## 远程仓库

```bash
# 添加远程仓库
git remote add <remoteName> <remoteURL>
git push <remoteName> <localBranchName>[:<remoteBranchName>]
git fetch <remoteName> # 抓取
git pull <remoteName> # 抓取+合并
```
