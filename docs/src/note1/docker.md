---
# title: Docs with VitePress
# editLink: true
lastUpdated: true
---

<script setup>
        import { useData } from 'vitepress'
        const { theme, page, frontmatter, lang } = useData()
        console.log(page)
</script>

# docker 命令

## 镜像

下载镜像：

```bash
docker pull hello-world:lastest
```

查看镜像：

```bash
docker images
```

删除镜像：

```bash
docker rmi hello-world
```

## 容器

镜像下载后会保存在本地，**创建并启动**这个镜像的容器：

```shell
docker run hello-world
```

::: tip 选项
--name 指定容器名称  
--rm 容器停止后自动删除容器  
--network 指定容器网络  
--ip 指定容器 IP  
-it 交互式终端  
-p 端口映射  
:::

::: details 限制物理资源
-m 内存限制  
-c CPU 限制  
-cpus CPU 资源数  
--cpuset-cpus 指定 CPU 核心数量  
--memory-swap 限制内存和 swap 交换空间的总大小  
--device-write-bps 限制设备写入速度  
:::

**创建**并不马上运行：

```shell
docker create hello-world
```

**开启**处于停止状态的容器：

```shell
docker start <容器名称/容器ID>
```

**重启**容器：

```shell
docker restart <容器名称/容器ID>
```

**删除**非运行状态下的容器：

```shell
docker rm <容器名称/容器ID>
```

使用 ps 子命令来查看当前的容器列表：

```shell
docker ps
```

::: tip 选项
-a 表示显示所有的容器，包括未运行的容器
:::

查看容器详情：

```shell
docker inspect <容器名称/容器ID>
```

## 容器构建为镜像

将容器保存为新的镜像

```shell
docker commit <容器名称/ID> <镜像名称>
```

查看镜像构建历史：

```shell
docker history <镜像名称>
```

使用 Dockerfile 构建镜像：

```dockerfile
FROM <基础镜像>
RUN apt update
RUN apt install -y <软件包>
```

docker 会在构建目录中寻找 Dockerfilr 文件，只需构建一次：

```shell
docker build -t <镜像名称> <构建目录>
```

### 推送到远程仓库

missing。。。

## 网络

Docker 安装后会创建三个网络，查看命令：

```shell
docker network ls
```

会得到如下结果
| NETWORK ID | NAME | DRIVER | SCOPE |
| :----------: | :----: | :----: | :---: |
| 29a9bf86732e | bridge | bridge | local |
| 80c234865c20 | host | host | loca |
| fce90b99194f | none | null | loca |

可以在创建容器的时候使用`--network`参数来指定网络。

```bash
docker run --network none hello-world
```

### 默认网络

none 网络只有一个本地换回网络，无法连接到互联网。

bridge 网络是默认的网络，使用此网络的容器可以相互通信，也可以连接到互联网。在**宿主主机**上查看网络信息，会发现一个名为 docker0 的网络设备：

```shell
han@MyDesktop:~$ ifconfig
docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500  # [!code focus]
        inet 172.18.0.1  netmask 255.255.0.0  broadcast 172.18.255.255
        ether 02:42:ff:0d:ec:29  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

docker 创建虚拟网络，就像容器单独插了一根虚拟网线，连接到宿主主机，docker0 设备实际上作为一个桥接的角色，一头是自己的虚拟子网，另一头是宿主主机的网络。

host 网络共享宿主主机的网络，网络配置也完全一样

### 自定义网络

Docker 默认提供三种网络驱动：bridge overlay macvlan ,在创建网络时可以使用`--driver`选项来指定。
创建网络：

```shell
docker network create <网络名称> --driver bridge
```

连接网络：

```shell
docker network connect <网络名称> <容器名称/容器ID>
```

::: tip
进入 docker 容器的终端中输入 Ctrl+P+Q 可以退出容器，但是容器不会停止。
:::

返回容器终端：

```shell
docker attach <容器名称/容器ID>
```

### 容器间通信

借助 Docker 提供的 DNS 服务器，在容器启动时给个名字，可以直接访问这个名称，最后会被解析成对应容器的 IP 地址，**只会在用户自定义的网络下生效**。

```shell
#test为自定义网络   ubuntu-net为镜像名
docker run -it --name=test01 --network=test ubuntu-net
docker run -it --name=test02 --network=test ubuntu-net
```

两个容器同时共享一个网络，共同使用同一个 IP 地址，在创建时指定：

```shell
docker run -it --name=test01 --network=container:test01 ubuntu-net
```

### 容器与外部通信

端口映射配置,规则为`宿主端口:容器端口`：

```shell
docker run -d -p 80:80 nginx
```

## 存储

新的参数`-v`用于指定文件挂载：

```shell
docker run -it -v ~/test:/root/test ubuntu-vim
```

例如：

```shell
docker run -it -v ~/test:/usr/share/nginx/html/ -p 80:80 nginx
```

将 test 文件夹挂载到容器中 nginx 的默认代理目录

若不指定宿主主机上的目录进行挂载，docker 会自动创建目录进行挂载：

```shell
docker run -it -v /root/abc ubuntu-vim
```

使用 cp 命令传递文件：

```shell
docker cp <容器名称/容器ID>:/root/test.txt <文件名>
```

使用选项`--columes-from`指定使用此容器的目录：

```shell
docker run -it --volumes-from <容器名称/容器ID> ubuntu-vim
```

创建数据卷：

```shell
docker volume create <数据卷名称>
```

## 更多命令

查看输入的日志信息,选项`-f`持续打印日志信息：

```shell
docker logs -f <容器名称/容器ID>
```

在容器中启动一个新的终端或执行命令：

```shell
docker exec -it <容器名称/容器ID> <命令>
```

强制终止容器：

```shell
docker kill <容器名称/容器ID>
```

暂停容器：

```shell
docker pause <容器名称/容器ID>
docker unpause <容器名称/容器ID>
```

容器监控：

```shell
docker stats
```

使用[汉化版 portainer](https://hub.docker.com/r/6053537/portainer-ce)
