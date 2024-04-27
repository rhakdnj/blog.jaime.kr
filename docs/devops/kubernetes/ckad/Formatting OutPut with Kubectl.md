---
sidebar_position: 4
---

## Formatting Output with Kubectl

모든 kubectl 명령의 기본 출력 형식은 사람이 읽을 수 있는 평문 형식입니다. `-o` 플래그를 사용하면 여러 가지 다른 형식으로 세부 정보를 출력할 수 있습니다.

:::info

`kubectl [command] [TYPE] [NAME] -o <output_format>`

1. -o jsonOutput a JSON formatted API object.

1. -o namePrint only the resource name and nothing else.

1. -o wideOutput in the plain-text format with any additional information.

1. -o yamlOutput a YAML formatted API object.

:::

### Example

```text title="Create a namespace with JSON output"
kubectl create namespace test --dry-run=client -o json
{
    "kind": "Namespace",
    "apiVersion": "v1",
    "metadata": {
        "name": "test",
        "creationTimestamp": null
    },
    "spec": {},
    "status": {}
}
```

```text title="Create a namespace with YAML output"
kubectl create namespace test --dry-run=client -o yaml

apiVersion: v1
kind: Namespace
metadata:
  creationTimestamp: null
  name: test
spec: {}
status: {}
```

```text title="Output in wide format"

kubectl get pods -o wide

NAME      READY   STATUS    RESTARTS   AGE     IP          NODE     NOMINATED NODE   READINESS GATES
busybox   1/1     Running   0          3m39s   10.36.0.2   node01   <none>           <none>
ningx     1/1     Running   0          7m32s   10.44.0.1   node03   <none>           <none>
redis     1/1     Running   0          3m59s   10.36.0.1   node01   <none>           <none>
```

### For more details

https://kubernetes.io/docs/reference/kubectl/overview/

https://kubernetes.io/docs/reference/kubectl/cheatsheet/
