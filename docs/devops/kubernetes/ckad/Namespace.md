---
sidebar_position: 5
---

## Namespace

Namespace는 Kubernetes 클러스터 내에서 리소스를 그룹화하는 방법입니다. Namespace를 사용하면 여러 팀이나 프로젝트가 동일한 클러스터에서 작업할 수 있습니다. Namespace를 사용하면
리소스를 분리하고 격리할 수 있습니다. 네임스페이스 안의 리소스는 서로 이름, 즉 Domain으로 부를 수 있습니다.

:::info

"db-service.develop.svc.cluster.local": `db-service`는 서비스 이름, `develop`은 네임스페이스 이름, `svc.cluster.local`은 클러스터 도메인입니다.

같은 namespace에 존재하지 않아도 다른 namespace의 리소스에 접근할 수 있습니다.

예를 들어, develop 환경에 `db-service`로 redis가 제공된다면, 다른 namespace에서 `db-service.develop.svc.cluster.local`로 접근할 수 있습니다.
만약 develop namespace에 같이 존재하는 서비스는 `db-service`로 접근할 수 있습니다.

```bash
kubectl run myapp-pod --image=nginx -n develop
kubectl get pods -n develop
kubectl get pods --namespace=develop
kubectl get pods --all-namespaces
kubectl get pods -A
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  namespace: develop
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx-container
      image: nginx
```

:::

### Namespace 생성

```bash
kubectl create namespace develop
```

```yaml title="namespace-develop.yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: develop
```

```shell
kubectl create -f namespace-develop.yaml
```

### Switch Context

kubectl config 명령을 사용해 네임스페이스를 변경할 수 있습니다.

```bash
kubectl config set-context $(kubectl config current-context) --namespace=develop
```

### Namespace Resource Quota

Namespace에 리소스 할당량을 설정할 수 있습니다.

```yaml title="namespace-quota.yaml"
apiVersion: v1
kind: ResourceQuota
metadata:
  name: develop-quota
  namespace: develop
spec:
  hard:
    pods: "10"
    requests.cpu: "4"
    requests.memory: 4Gi
    limits.cpu: "6"
    limits.memory: 6Gi
```
