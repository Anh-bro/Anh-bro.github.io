# scrcpy 无线投屏

[scrcpy github 仓库](https://github.com/Genymobile/scrcpy)

This application mirrors Android devices (video and audio) connected via USB or over TCP/IP, and allows to control the device with the keyboard and the mouse of the computer. It does not require any root access. It works on Linux, Windows and macOS.

## 无线投屏

无线投屏需要手机和电脑处在同一局域网内

手机开启开发者模式，并开启**USB 调试**和**WLAN 无线调试**

![miss..](/scrcpy/image.png)

点击**使用配对码配对设备**，会弹出与设备配对的信息

![miss..](/scrcpy/image2.png)

在电脑 shell 里运行：

```shell
# ip地址和端口为上图中的信息
adb pair ip:prot
```

运行后弹出框会消失，然后使用命令无线连接，这里的 ip 和端口不要使用弹出框里的，要使用无线调试页面里的

```shell
adb connect ip:port
```

最后运行 scrcpy

```shell
scrcpy
```
