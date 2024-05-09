---
sidebar_position: 1
---

## 1. 환경 설정

### 플러그인 설정

```kotlin title="build.gradle.kts"
plugins {
  id("org.jlleitschuh.gradle.ktlint") version "12.1.0"
}
```

### 코틀린 공식 스타일 설정

IDE에 종속되지 않고 코틀린 공식 스타일을 적용하기 위해 아래와 같은 설정을 추가합니다.

```properties title="gradle.properties"
kotlin.code.style=official
```

### 코틀린 코드 스타일 명세

```editorconfig title=".editorconfig"
root = true

[*]
charset = utf-8
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true
end_of_line = lf

[{*.kt,*.kts}]
ij_kotlin_code_style_defaults = KOTLIN_OFFICIAL
ij_kotlin_allow_trailing_comma = true
ij_kotlin_allow_trailing_comma_on_call_site = true
ij_kotlin_name_count_to_use_star_import = 2147483647
ij_kotlin_name_count_to_use_star_import_for_members = 2147483647
ij_kotlin_packages_to_use_import_on_demand = unset
```

### Intellij 기반 IDE 설정

```text title="Intellij 기반 IDE 설정"
1. 인텔리제이 Plugin "ktlint"를 입력하고, 검색 결과 중 "ktlint" 를 설치합니다.
2. [IntelliJ IDEA] - [Preferences] - [Tools] - [ktlint]에서 이하 참고에 따라 “Run ktlint --format on save”에 체크합니다.
```

![인텔리제이 예시](https://github.com/rhakdnj/blog.jaime.kr/assets/74996516/1672defb-1407-4e77-88ee-33eec341fa2c)


## 2. 사용 방법

### 스타일 체크

```bash title="코드 스타일 체크"
$ ./gradlew ktlintCheck 
```

### 스타일 적용

```bash title="코드 스타일 적용"
$ ./gradlew ktlintFormat
```

### commit 단계 자동 체크 (한번만)

1안과 2안 중 하나를 선택하여 설정합니다.

```bash title="pre-commit 설정 1안"
# 1안
$ ./gradlew addKtlintFormatGitPreCommitHook
````

```bash title="pre-commit 설정 2안"
# 2안
$ mkdir .githooks
$ vi pre-commit
#!/bin/bash

GIT_DIR=$(git rev-parse --show-toplevel)
"$GIT_DIR"/gradlew ktlintCheck

$ chmod +x pre-commit
$ git config core.hookspath .githooks
```
