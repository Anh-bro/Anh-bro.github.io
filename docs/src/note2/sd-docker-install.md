---
lastUpdated: 2024-04-13 16:38:00
---

# 使用 docker 安装 stable diffusion

文章写于 2024-04-13 16:38:00

[安装 docker](docker-install.md)

使用这个仓库中提供的脚本：[AbdBarho/stable-diffusion-webui-docker](https://github.com/AbdBarho/stable-diffusion-webui-docker)

首先克隆这个仓库：

```bash
git clone https://github.com/AbdBarho/stable-diffusion-webui-docker.git
```

然后进入这个仓库：

```bash
cd stable-diffusion-webui-docker
```

然后根据 github 中的[wiki](https://github.com/AbdBarho/stable-diffusion-webui-docker/wiki/Setup)，逐条运行下面两条命令：

```bash
docker compose --profile download up --build

```

不出意外会因为网络原因卡在`apk add`这一步，需要将 docker 中的 aplhaLinux 镜像源更换为国内镜像源，具体方法为打开 Dockerfile，在 add 之前更换成国内源

具体文件为 stable-diffusion-webui-docker\services\download\Dockerfile:

```dockerfile
FROM bash:alpine3.19
#插入下面这行  # [!code focus]
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories # [!code focus]
RUN apk update && apk add parallel aria2
COPY . /docker
RUN chmod +x /docker/download.sh
ENTRYPOINT ["/docker/download.sh"]

```

然后会卡在下载 huggingface 的模型上，我的解决办法是换成国内镜像站

将 stable-diffusion-webui-docker\services\download\links.txt 文件中的所有`huggingface.co`替换为`hf-mirror.com`，顺手把 github 也给替换成镜像源，将所有的`github.com`替换为`githubfast.com`，最终的内容是:

```txt
https://hf-mirror.com/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.ckpt
  out=Stable-diffusion/v1-5-pruned-emaonly.ckpt
https://hf-mirror.com/stabilityai/sd-vae-ft-mse-original/resolve/main/vae-ft-mse-840000-ema-pruned.ckpt
  out=VAE/vae-ft-mse-840000-ema-pruned.ckpt
https://hf-mirror.com/runwayml/stable-diffusion-inpainting/resolve/main/sd-v1-5-inpainting.ckpt
  out=Stable-diffusion/sd-v1-5-inpainting.ckpt
https://githubfast.com/TencentARC/GFPGAN/releases/download/v1.3.4/GFPGANv1.4.pth
  out=GFPGAN/GFPGANv1.4.pth
https://githubfast.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth
  out=RealESRGAN/RealESRGAN_x4plus.pth
https://githubfast.com/xinntao/Real-ESRGAN/releases/download/v0.2.2.4/RealESRGAN_x4plus_anime_6B.pth
  out=RealESRGAN/RealESRGAN_x4plus_anime_6B.pth
https://heibox.uni-heidelberg.de/f/31a76b13ea27482981b4/?dl=1
  out=LDSR/project.yaml
https://heibox.uni-heidelberg.de/f/578df07c8fc04ffbadf3/?dl=1
  out=LDSR/model.ckpt
```

官方有多种前端页面供选择，我选择 auto，于是执行这条命令：

```bash
docker compose --profile auto up --build
```

不出意外又卡在拉取 github 代码，将 stable-diffusion-webui-docker\services\AUTOMATIC1111\Dockerfile 文件中所有的`github.com`替换为`githubfast.com`,顺便也给 pip 换上国内源，文件内容最终为：

```bash
FROM alpine/git:2.36.2 as download

COPY clone.sh /clone.sh


RUN . /clone.sh stable-diffusion-stability-ai https://githubfast.com/Stability-AI/stablediffusion.git cf1d67a6fd5ea1aa600c4df58e5b47da45f6bdbf \
  && rm -rf assets data/**/*.png data/**/*.jpg data/**/*.gif

RUN . /clone.sh CodeFormer https://githubfast.com/sczhou/CodeFormer.git c5b4593074ba6214284d6acd5f1719b6c5d739af \
  && rm -rf assets inputs

RUN . /clone.sh BLIP https://githubfast.com/salesforce/BLIP.git 48211a1594f1321b00f14c9f7a5b4813144b2fb9
RUN . /clone.sh k-diffusion https://githubfast.com/crowsonkb/k-diffusion.git ab527a9a6d347f364e3d185ba6d714e22d80cb3c
RUN . /clone.sh clip-interrogator https://githubfast.com/pharmapsychotic/clip-interrogator 2cf03aaf6e704197fd0dae7c7f96aa59cf1b11c9
RUN . /clone.sh generative-models https://githubfast.com/Stability-AI/generative-models 45c443b316737a4ab6e40413d7794a7f5657c19f


FROM pytorch/pytorch:2.1.2-cuda12.1-cudnn8-runtime

ENV DEBIAN_FRONTEND=noninteractive PIP_PREFER_BINARY=1

RUN --mount=type=cache,target=/var/cache/apt \
  apt-get update && \
  # we need those
  apt-get install -y fonts-dejavu-core rsync git jq moreutils aria2 \
  # extensions needs those
  ffmpeg libglfw3-dev libgles2-mesa-dev pkg-config libcairo2 libcairo2-dev build-essential


WORKDIR /
RUN --mount=type=cache,target=/root/.cache/pip \
  git clone https://githubfast.com/AUTOMATIC1111/stable-diffusion-webui.git && \
  cd stable-diffusion-webui && \
  git reset --hard cf2772fab0af5573da775e7437e6acdca424f26e && \
  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements_versions.txt


ENV ROOT=/stable-diffusion-webui

COPY --from=download /repositories/ ${ROOT}/repositories/
RUN mkdir ${ROOT}/interrogate && cp ${ROOT}/repositories/clip-interrogator/clip_interrogator/data/* ${ROOT}/interrogate
RUN --mount=type=cache,target=/root/.cache/pip \
  pip install -r ${ROOT}/repositories/CodeFormer/requirements.txt

RUN --mount=type=cache,target=/root/.cache/pip \
  pip install pyngrok xformers==0.0.23.post1 \
  git+https://githubfast.com/TencentARC/GFPGAN.git@8d2447a2d918f8eba5a4a01463fd48e45126a379 \
  git+https://githubfast.com/openai/CLIP.git@d50d76daa670286dd6cacf3bcd80b5e4823fc8e1 \
  git+https://githubfast.com/mlfoundations/open_clip.git@v2.20.0

# there seems to be a memory leak (or maybe just memory not being freed fast enough) that is fixed by this version of malloc
# maybe move this up to the dependencies list.
RUN apt-get -y install libgoogle-perftools-dev && apt-get clean
ENV LD_PRELOAD=libtcmalloc.so

COPY . /docker

RUN \
  # mv ${ROOT}/style.css ${ROOT}/user.css && \
  # one of the ugliest hacks I ever wrote \
  sed -i 's/in_app_dir = .*/in_app_dir = True/g' /opt/conda/lib/python3.10/site-packages/gradio/routes.py && \
  git config --global --add safe.directory '*'

WORKDIR ${ROOT}
ENV NVIDIA_VISIBLE_DEVICES=all
ENV CLI_ARGS=""
EXPOSE 7860
ENTRYPOINT ["/docker/entrypoint.sh"]
CMD python -u webui.py --listen --port 7860 ${CLI_ARGS}

```

中间还会遇到 pip 找不到指定包的错误，可以尝试换成别的国内源重新尝试

然后会提示找不到显卡，百度后找到原因：wsl 使用显卡需要安装指定的包,根据[官网](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)运行以下三条命令后重试：

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

```bash
sudo apt-get update
```

```bash
sudo apt-get install -y nvidia-container-toolkit
```

然后遇到驱动程序报错，更显显卡驱动，重启即可

然后就会加载模型失败,原因是 huggingface 国内无法访问,表现为报这个错误:

```bash
OSError: Can't load tokenizer for 'openai/clip-vit-large-patch14'
```

解决方法为在 stable-diffusion-webui-docker\services\AUTOMATIC1111\Dockerfile 文件中添加下面几行:

```bash

WORKDIR ${ROOT}
RUN mkdir openai # [!code focus]
RUN apt install git-lfs # [!code focus]
RUN git lfs install # [!code focus]
RUN cd openai && GIT_LFS_SKIP_SMUDGE=1 git clone https://hf-mirror.com/openai/clip-vit-large-patch14 # [!code focus]
ENV NVIDIA_VISIBLE_DEVICES=all
ENV CLI_ARGS=""
EXPOSE 7860
ENTRYPOINT ["/docker/entrypoint.sh"]
CMD python -u webui.py --listen --port 7860 ${CLI_ARGS}

```

安装完成后，访问 http://localhost:7860 即可使用。
