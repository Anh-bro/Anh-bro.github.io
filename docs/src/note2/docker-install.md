---
lastUpdated: 2024-04-13 15:22:00
---

# Windows 中 docker 的安装

[docker 官方网站](https://www.docker.com/)

[docker 的官方文档](https://docs.docker.com/)

我准备在[wsl]()中安装 docker，并且我安装的是 linux 的发行版是 debian，所以跳转到对应的[安装文档页面](https://docs.docker.com/engine/install/debian/)

官方提供了四种安装方法，似乎第四种最简单，并且官方给了命令：

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh
```

执行完上述命令会提示检测到 wsl，并且要求等待 20s，等待即可，安装完成之后提示需要 root 才能运行 docker 命令，并且给了[网址](https://docs.docker.com/go/daemon-access/)，根据网址里的内容，继续操作：

创建 docker 用户组：

```bash
sudo groupadd docker
```

添加用户到 docker 用户组：

```bash
sudo usermod -aG docker $USER
```

刷新用户组：

```bash
newgrp docker
```

之后运行 docker 命令就不需要 sudo 了

```bash
docker -h
```

进入 wsl 需要手动运行 docker 服务：

```bash
sudo service docker start
```

因为种种原因无法启动，需要运行以下命令：

```bash
sudo touch /etc/fstab
sudo update-alternatives --set iptables /usr/sbin/iptables-legacy
sudo update-alternatives --set ip6tables /usr/sbin/ip6tables-legacy
```

安装完成
