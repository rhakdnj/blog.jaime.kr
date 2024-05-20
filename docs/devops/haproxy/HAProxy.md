---
sidebar_position: 1
---

# HAProxy Overview

- HAProxy: https://www.haproxy.org/
- HAProxy docs: https://docs.haproxy.org/

## 주요 설정

### 밸런스 모드(Balance Mode)

HAProxy에서는 다양한 로드 밸런싱 알고리즘을 제공합니다. 각각의 알고리즘은 특정 상황에 최적화되어 있으며, 밸런스 모드를 설정함으로써 사용할 알고리즘을 선택할 수 있습니다.

- roundrobin: 서버에 순차적으로 요청을 분배합니다. 각 서버에 공평한 요청 배분이 이루어지게 합니다.
- leastconn: 연결 수가 가장 적은 서버에 우선적으로 요청을 배분합니다. 동시 연결 처리에 효율적입니다.
- source: 사용자의 IP 주소를 해싱하여 요청을 분배합니다. 사용자는 항상 같은 서버로 연결됩니다.

### 타임아웃(Timeout)

타임아웃 설정을 통해 연결, 읽기, 쓰기 등에 대한 최대 대기 시간을 설정할 수 있습니다. 적절한 타임아웃 값을 설정하는 것은 성능과 안정성에 중요합니다.

- timeout connect: 연결 시도의 최대 시간을 설정합니다. (**현재 서비스에서 제공하는 기능**)
- timeout client: 클라이언트로부터의 읽기 최대 대기 시간을 설정합니다.
- timeout server: 서버로의 쓰기 최대 대기 시간을 설정합니다.

### 세션 쿠키(Session Cookie === Sticky Session)

세션 쿠키를 사용하여 사용자 요청이 항상 동일한 서버로 전달되도록 하는 방법입니다.

```cfg title='haproxy.cfg'
frontend http_front
   bind *:80
   option http-server-close
   option forwardfor
   default_backend http_back

backend http_back
   balance roundrobin
   cookie sticky-session-cookie-name insert indirect nocache
   option httpchk
   server server1 192.168.1.1:80 check cookie S1
   server server2 192.168.1.2:80 check cookie S2
```

- sticky-session-cookie-name: 세션 쿠키의 이름
- insert: set-cookie 헤더를 응답에 추가
- indirect: 클라이언트가 이 쿠키를 다시 보낼 때만 스티키 세션을 적용함
- nocache: 쿠키가 캐시되지 않도록 함

#### 예시

1. 첫 연결
   사용자가 처음으로 서버에 연결될 때, HAproxy는 라운드 로빈 방식에 따라 server1 또는 server2로 요청을 보냅니다.
   사용자가 서버1에 연결되면 서버1은 클라이언트에게 `Set-Cookie: sticky-session-cookie-name=S1`을 응답합니다.
2. 후속 요청
   사용자가 다음 요청을 보낼 때, 클라이언트는 `Cookie: sticky-session-cookie-name=S1`을 요청 헤더에 포함하여 보냅니다.
   HAProxy 이 쿠키를 확인하고, 이 쿠키에 따라 사용자를 서버1로 연결합니다.

### Proxy 설정

HAProxy를 통과하는 HTTP 요청의 헤더에는 원본 클라이언트의 IP 주소와 프로토콜 정보를 포함시킬 수 있습니다.

- [X-Forwarded-For](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Forwarded-For): 원본 클라이언트의 IP 주소를 전달합니다. 
- [X-Forwarded-Proto](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/X-Forwarded-Proto): 클라이언트가 사용한 프로토콜(예: http, https)을 전달합니다. 

:::info
X-Forwarded-For라는 이름은 원래 헤더 이름이 아닌, 비표준 확장 헤더(커스텀 헤더)로 시작된 것입니다. X- 접두사는 비표준 확장 헤더를 나타내기 위해 사용됩니다. 이 헤더는 프록시나 로드 밸런서가 원본
클라이언트 IP 주소를 서버에 전달하기 위해 설계되었으며, "Forwarded-For"는 클라이언트의 요청이 여러 중간 서버를 거쳐서 전달되었음을 나타냅니다.
:::
