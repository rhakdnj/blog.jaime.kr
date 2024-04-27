---
sidebar_position: 2
---

## CMD vs ENTRYPOINT


**`docker run <image-name> [COMMAND]`**

`docker run <image-name>` 명령을 실행하면, `CMD`와 `ENTRYPOINT` 명령이 실행됩니다. `CMD`는 `docker run` 명령어에 전달된 인자로 덮어쓸 수
있습니다. `ENTRYPOINT`는 `docker run` 명령어에 전달된 인자로 덮어쓸 수 없습니다.

```dockerfile title="OnlyCmdDockerfile"
# docker build -t only-cmd .
FROM ubuntu:22.04

CMD sleep 5
```

- `docker run only-cmd sleep 10`: `sleep 10` 명령이 실행됩니다.

```dockerfile title="OnlyEntrypointDockerfile"
# docker build -t only-entrypoint .
FROM ubuntu:22.04

ENTRYPOINT ["sleep"]
```

- `docker run only-entrypoint 10`: ENTRYPOINT 명령어와 CMD 명령어가 합쳐져서 `sleep 10` 명령이 실행됩니다.

```dockerfile title="CmdAndEntrypointDockerfile"
# docker build -t cmd-and-entrypoint .
FROM ubuntu:22.04

ENTRYPOINT ["sleep"]

CMD ["5"]
```

- `docker run cmd-and-entrypoint 10`: `sleep 10` 명령이 실행됩니다.
- `docker run --entrypoint sleep2.0 cmd-and-entrypoint 10`: `sleep2.0 10` 명령이 실행됩니다.


위의 내용은 Dockerfile을 통해 docker image를 생성하고, `docker run` 명령어를 통해 실행하는 방법을 설명하였습니다. 이때, `CMD`와 `ENTRYPOINT` 명령어를 사용하여 이미지를
생성하였습니다. `CMD`와 `ENTRYPOINT` 명령어는 이미지를 실행할 때 실행되는 명령어를 지정할 수 있습니다.


### POD

```yaml title="pod-1.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: mycontainer
      image: cmd-and-entrypoint
      args: [ "10" ]
```
- `kubectl apply -f pod-1.yaml`: `sleep 10` 명령이 실행됩니다.

```yaml title="pod-2.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: mycontainer
      image: cmd-and-entrypoint
      command:
        - "sleep2.0"
      args: [ "10" ]
```

- `kubectl apply -f pod-2.yaml`: `sleep2.0 10` 명령이 실행됩니다.
