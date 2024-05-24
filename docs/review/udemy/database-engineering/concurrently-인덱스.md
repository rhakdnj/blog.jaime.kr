---
sidebar_position: 1
---

# 동시에 인덱스 생성 - 데이터베이스 쓰기 차단 방지

데이터베이스에서 큰 테이블에 인덱스 생성하는 것은 많은 시간이 소요됩니다.

이 뿐만 아니라 테이블의 편집을 차단하기도 합니다.

```postgresql
-- session 1
create index g on grades(g);

-- session 2
-- session 2는 session 1이 끝날 때까지 기다립니다.
insert into grades (g) values (1);
```

이런 문제를 해결하기 위해 동시에 인덱스를 생성하는 방법이 있습니다. 이 때 다만 unique 인덱스는 사용할 때는 유의해야 합니다.

```postgresql
create index concurrently g on grades(g);
```
