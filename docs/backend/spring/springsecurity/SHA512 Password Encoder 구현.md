---
sidebar_position: 2
---

Spring Security에서는 Password Encoder를 사용하여 비밀번호를 암호화하여 저장한다. SHA-512 알고리즘을 사용하여 비밀번호를 암호화하는 Password Encoder를 구현해보자.

최신의 비밀번호 저장 방식에서는 BCrypt나 Argon2와 같이 내장된 솔트 처리 기능을 가진 알고리즘을 사용하는 것이 더 권장됩니다.

```kotlin
import org.springframework.security.crypto.password.PasswordEncoder

class Sha512PasswordEncoder : PasswordEncoder {
  override fun encode(rawPassword: CharSequence?): String {
    val md = MessageDigest.getInstance("SHA-512")
    return BigInteger(1, md.digest(rawPassword.toString().toByteArray()))
      .toString(16)
      .padStart(128, '0')
  }

  override fun matches(rawPassword: CharSequence?, encodedPassword: String?): Boolean {
    return encode(rawPassword) == encodedPassword
  }
}
```
