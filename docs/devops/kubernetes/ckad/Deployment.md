---
sidebar_position: 3
---

## Deployment

:::info

`kubectl explain deployment`

- `kubectl scale deployment nginx --replicas=4`

:::

### deployment-definition.yaml

```yaml title="deployment-definition.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
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

### Create Deployment

```bash title="Create Deployment"
kubectl create -f deployment-definition.yaml
```

### Output

```text title="Output"
# kubectl get rc
NAME               DESIRED   CURRENT   READY   AGE
myapp-deployment   3         3         3       7s

# kubectl get pods
NAME                                           READY   STATUS    RESTARTS   AGE
myapp-deployment-asdxw                         1/1     Running   0          84s
myapp-deployment-sztmf                         1/1     Running   0          61s
myapp-deployment-xr8f9                         1/1     Running   0          61s
```
