---
sidebar_position: 6
---

## ConfigMaps

`ConfigMap`은 컨테이너 이미지와 분리된 설정을 저장하는 Kubernetes 리소스입니다. `ConfigMap`은 환경 변수, 명령행 인수, 설정 파일 등을 저장할 수 있습니다.

```bash
APP_COLOR: blue
PROFILE: production
```

`ConfigMap`은 다음과 같은 방법으로 생성할 수 있습니다.

### 리터럴 값으로 생성

```bash
kubectl create configmap <config-name> --from-literal=<key>=<value>
kubectl create cm <config-name> --from-literal=<key>=<value>

kubectl create configmap app-config --from-literal=APP_COLOR=blue --from-literal=PROFILE=production
```

### from-file로 생성

```bash
kubectl create configmap <config-name> --from-file=<path-to-file>
kubectl create cm <config-name> --from-file=<path-to-file>

kubectl create configmap app-config --from-file=app-config.properties
```

```yaml title="app-config-map.yaml"
# kubectl create -f app-config-map.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  APP_COLOR: "blue"
  PROFILE: "production"
```

```yaml title="app-mysql-config-map.yaml"
# kubectl create -f app-mysql-config-map.yaml

apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  URL: "jdbc:mysql://mysql:3306"
  USER: "root"
  PASSWORD: "password"
```

## ConfigMap 조회

```bash
kubectl get configmaps
kubectl get cm

kubectl describe configmaps
```


## Pod에서 ConfigMap 사용

`ConfigMap`을 Pod에서 사용하려면 `env` 또는 `volume`을 사용할 수 있습니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
  labels:
    name: simple-webapp-color
spec:
  containers:
    - name: simple-webapp-color
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      # 환경 변수로 설정 1
      env:
        - name: APP_COLOR
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: APP_COLOR
      # 환경 변수로 설정 2
      envFrom:
        - configMapRef:
            name: app-config
  # 볼륨으로 설정
  volumes:
    - name: app-config-volume
      configMap:
        name: app-config
```
