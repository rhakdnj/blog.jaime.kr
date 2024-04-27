---
sidebar_position: 1
---

## Kubectl run and get commands

```bash
kubectel run nginx --image=nginx

kubectel get pods
```

## Pod definition file

### kind field

| Kind       | Version |
|------------|---------|
| Pod        | v1      |
| Service    | v1      |
| ReplicaSet | apps/v1 |
| Deployment | apps/v1 |

다음은 nginx Pod를 생성하는 yaml 파일입니다.

```yaml title="pod-definition-nginx.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
    - name: nginx # name of the container
      image: nginx # image to be used
```

### Kubectl describe pod `<image-name>`

```shell
kubectl apply -f pod-definition-nginx.yaml
kubectl describe pod nginx
```

라벨은 포드를 식별하는 데 사용됩니다. 라벨은 객체에 첨부되는 키 값 쌍입니다. 레이블은 개체를 선택하는 데 사용되며 개체를 필터링하는 데 사용됩니다.

```shell

```text
Name:             myapp-pod
Namespace:        default
Priority:         0
Service Account:  default
Node:             node2/10.25.140.6
Start Time:       Sat, 27 Apr 2024 16:01:26 +0900
Labels:           app=myapp
                  type=front-end
Annotations:      cni.projectcalico.org/containerID: 5fdad88753d2ed8c81d204d31df07c3837f4c3807d7c718a8afa71630c98e4f5
                  cni.projectcalico.org/podIP: 192.168.104.6/32
                  cni.projectcalico.org/podIPs: 192.168.104.6/32
Status:           Running
IP:               192.168.104.6
IPs:
  IP:  192.168.104.6
Containers:
  nginx:
    Container ID:   docker://cbdbd14161e0b1b3a65a340c31d0e9ff6b3ad6f339ba3fb1d1edb81a2c85f5cc
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:ed6d2c43c8fbcd3eaa44c9dab6d94cb346234476230dc1681227aa72d07181ee
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Sat, 27 Apr 2024 16:01:37 +0900
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-2l5pk (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
Volumes:
  kube-api-access-2l5pk:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  76s   default-scheduler  Successfully assigned default/nginx to node2
  Normal  Pulling    75s   kubelet            Pulling image "nginx"
  Normal  Pulled     66s   kubelet            Successfully pulled image "nginx" in 8.886s (8.886s including waiting)
  Normal  Created    65s   kubelet            Created container nginx
  Normal  Started    65s   kubelet            Started container nginx
```

### kubectl edit

pod definition yaml 파일이 있으면, 해당 파일을 편집하고 이 파일을 사용하여 새 포드를 만들면 변경이 가능합니다. 혹은 다음 명령을 사용하여 정의를 파일로 추출할 수 있습니다.

`kubectl get pod <pod-name> -o yaml > pod-definition.yaml`

그런 다음 파일을 편집하여 필요한 변경을 수행하고 포드를 삭제하고 다시 만듭니다.

포드의 속성을 수정하려면 `kubectl edit pod <pod-name>` 명령을 사용하면 됩니다. 

아래 나열된 속성만 편집 가능합니다.

- spec.containers[*].image 
- spec.initContainers[*].image 
- spec.activeDeadlineSeconds 
- spec.tolerations 
- spec.terminationGracePeriodSeconds 
