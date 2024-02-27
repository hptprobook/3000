# List all running containers
+ docker ps

# List all containers (including stopped ones)
+ docker ps -a

# Stop a container by its ID
+ docker stop <container_id>
# Remove all stopped containers
+ docker container prune

# Run a command in a container
+ docker exec <container_id> <command>

# Run an interactive Alpine container
+ docker run -it alpine:
    * Ctrl + P + Q: Detach from the container (run it in the background)
    * docker attach <container_id>: Attach to the container (regain control)
    * docker run -d <image>: Run the image in detached mode (in the background)
    * docker exec -it <container_id> sh: Run an interactive shell in the container
    * docker run -p <target_port>:<container_port>: Map a container port to a target port

# Follow the logs of a container
+ docker logs -f <container_id>

# Volume (bind-mount) for data storage
# Create a volume
+ docker volume create [volume_name]

# Run a container with a bind-mount volume
+ docker run -v [local_dir/volume]:[container_dir]
(e.g. docker run -v pgdata:/var/lib/postgresql/data -p 5432:5432 postgres)

# Dockerfile
# Build an image from a Dockerfile
+ docker build -t <image_name>:<tag> .

<!-- Dockerfile instructions:
FROM <image> : Base image
RUN <command> : Run a command
WORKDIR <directory> : Set the default directory for the container
COPY <src> <dest> : Copy files from the host to the container
ADD <src/URL> <dest> : Copy files from a URL or tarball to the container
EXPOSE <port> : Expose a port for the container
CMD command arg1 arg2 ... : Default command to run when the container starts
CMD ["command", "arg1", "arg2", ...] : Same as above, but as an executable array
-->

# Pushing image
# Login into the registry with:
+ docker login

# Push image
+ docker push <image>:<tag>

# docker-compose.yaml
+ docker-compose build <service_name>
+ docker-compose up => đọc file yaml và khởi tạo toàn bộ service
+ docker-compose up <service_name> => " khởi tạo service
+ docker-compose up -d <service_name> => chạy ngầm(detach)
+ docker-compose logs -f <service_name>
+ docker-compose stop <service_name>
+ docker-compose down

# Network

<!-- 
version: "3"
services: 
    pg: 
        image: postgress:9.6-alpine
        ports: 
            - 5432:5432
        volumes: 
            -pgdata:/var/lib/postgresql/data
        environment:
            POSTGRES_DB: postgres
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
    frontend:
        image: hpt/frontend:lastest
        build:
            context: .
volumes: 
    pgdata: 
 -->
