# 이미지 업로드 기능 1 (AWS S3 셋팅)

이미지 어디에 저장?

- DB
- 이미지 크기가 크면 하드디스크가 나음

하드디스크 빌려주는 클라우드 서비스
ex. AWS S3

AWS &rarr; S3 &rarr; 버킷만들기


버킷 권한 설정 &rarr; 버킷 정책 편집 ⬇️

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "1",
            "Effect": "Allow",
            "Principal": "*", // 모든 사람 GET(읽기) 허용
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::letthemforumimage1/*"
        },
        {
            "Sid": "2",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::AWS계정ID:root" // 이 유저는 Put(추가), Delete(삭제)를 할 수 있다
            },
            "Action": [
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::letthemforumimage1/*"
        }
    ]
}
```

버킷 권한 설정 &rarr; CORS 설정 ⬇️

```
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST"
        ],
        "AllowedOrigins": [
            "*" // 모든 도메인에서 PUT, POST 허용
        ],
        "ExposeHeaders": [
            "ETag"
        ]
    }
] 
```

서버 프로그램에서 S3 업로드하려면 Access key 필요

보안 자격 증명 &rarr; 액세스 키 만들기 &rarr; 잘 보관 ^^..

write/page.js ⬇️

```javascript
<input type="file" accept="image/*"/>
```

선택한 이미지 보여주려면 
1. createObjectURL
2. 이미지 업로드해버리기 &larr; 이걸로 고

요즘엔 Presigned URL 방식으로 유저 브라우저에서 서버 거치지 않고 S3로 이미지 바로 업로드