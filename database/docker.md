Docker Engine:
    - docker daemon & exposed APIs
    - docker client (cli)

Docker basic commands: 
    - docker <component> <command>
        + component: 
            * image
            * container
            * network
            * volume
        + command: 
            * ls: list
            * run
            * exec
            * stop
            * pull
            * prune
    - docker images command
        + docker pull <image> => kéo image về máy
        + docker pull <image>:<tag> => kéo image về máy theo <tag>
        + docker push <image>:<tag> => đẩy một image lên hub
        + docker image ls | docker images => liệt kê các image
        + docker image prune => xóa toàn bộ image không sử dụng
    - docker container command
        + docker run <image>
        + docker ps
        + docker ps -a
        + docker stop <container_id>
        + docker container prune 
        + docker exec <container_id> <command>: chạy một <command> trong một container bất kỳ
        + docker run -it alpine:
            * Ctrl + P + Q: thoát tạm thời một container(detach)
            * docker attach <container_id>( attach)
            * docker run -d <image>: run image dưới trạng thái ngầm(detach)
             

