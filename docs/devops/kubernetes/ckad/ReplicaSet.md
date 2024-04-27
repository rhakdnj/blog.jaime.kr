---
sidebar_position: 2
---

Replication Controller 는 Pod의 수를 유지하도록 도와주는 리소스입니다. Pod가 삭제되면 Replication Controller는 새 Pod를 생성하여 수를 유지합니다. Rc
Controller 자원에서 현재는 ReplicaSet을 사용하는 것이 좋습니다.

차이점은 ReplicaSet은 Pod Selector를 사용하여 Pod를 관리하는 것이 추가되었습니다.

## ReplicaSet

### replicaset-definition.yaml

```yaml title="replicaset-definition.yaml"
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
  labels:
    app: myapp
    type: front-end
spec:
  template:
    metadata:
      name: myapp-pod
      labels:
        app: myapp
        type: front-end
    spec:
      containers:
        - name: nginx
          image: nginx
  replicas: 3
  selector:
    matchLabels:
      type: front-end
```

### Create ReplicaSet

```bash title="Create ReplicaSet"
kubectl create -f replicaset-definition.yaml
```

### Output

```text title="Output"
# kubectl get rc
NAME               DESIRED   CURRENT   READY   AGE
myapp-replicaset   3         3         3       7s

# kubectl get pods
NAME                                           READY   STATUS    RESTARTS   AGE
myapp-pod                                      1/1     Running   0          84s
myapp-replicaset-sztmf                         1/1     Running   0          61s
myapp-replicaset-xr8f9                         1/1     Running   0          61s
```
