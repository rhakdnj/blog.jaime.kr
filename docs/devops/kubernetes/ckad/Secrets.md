---
sidebar_position: 7
---

## Secrets

```shell
$ kubectl create secret generic my-secret --from-literal=key1=value1
secret/my-secret created

$ kubectl describe secret my-secret
$ kubectl get secret my-secret -o yaml
```

```yaml
apiVersion: v1
data:
  # echo -n 'value1' | base64
  # echo -n 'dmFsdWUx' | base64 -d
  key1: dmFsdWUx
kind: Secret
metadata:
  name: my-secret
  namespace: default
type: Opaque
```

### Deployment에 적용

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-container
          image: my-image
          env:
            - name: KEY1
              valueFrom:
                secretKeyRef:
                  name: my-secret
                  key: key1
          envFrom:
            - configMapRef:
                name: app-config
  replicas: 2
  selector:
    matchLabels:
      app: my-app
```
