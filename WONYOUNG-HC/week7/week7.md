# AWS Elastic Beanstalk에 Next.js서버 배포

### Next.js 배포

`npn run build`
<br>
`npm run start`

<br>

### AWS Elastic Beanstalk

- 코드를 AWS에 올리면 자동으로 EC2 인스턴스를 빌려 실행
- AWS말고 vercel 사용?
  - 월 100GB 트래픽까지 무료계정으로 사용 가능
  - 단 서버에서 하드디스크 사용 불가

### 배포 step

1. MongoDB 설정
   - Network access에서 접속가능 IP를 0.0.0.0으로 설정해 모두 접속 가능하게 변경
   - 또는 AWS VPC로 mongodb atlas 연결
2. 터미널을 통해 빌드
   - npm run build
   - 프로젝트 폴더안에 있는 모든 내용을 .zip 파일로 압축
   - node_modules 폴더는 필요 없지만 .next 폴더는 필수로 포함 시켜야 함
3. AWS 로그인하고 카드등록
   - AWS free tier 가입
4. IAM 역할만들기
   - IAM에서 역할 만들기 클릭
   - 신뢰할 수 있는 엔티티는 AWS 서비스, 사용사례는 EC2 선택
   - 권한추가에서 AWSElsaticBeanstalkWebTier, AWSElasticBeanstalkWorkerTier, AWSElasticBeanstalkMulticontainerDocker 체크
   - 이름 지정 부분에서 aws-elasticbeanstalk-ec2-role 기입
   - 또 다른 역할 하나를 더 만들기
     - 사용 사례는 Elastic Beanstalk
     - 권한추가에서 AWSElasticBeanstalkEnhancedHealth, AWSElasticBeanstalkService 선택
     - 이름 지정 부분에서 aws-elasticbeanstalk-service-role 기입
5. Elastic beanstalk
   - AWS에서 Elastic beanstalk 검색
   - 앱생성 또는 환경생성 버튼 클릭
   - 애플리케이션 이름 : 원하는거
   - 환경 이름 : 원하는거
   - 플랫폼 : nodejs v18
   - 프리셋 : 단일 인스턴스
   - 코드 업로드 : 아까 압축한 파일
   - 버전 레이블 : 이쁘게 (version1.0)
   - 서비스 역할 : 기존 서비스 역할 사용 선택
   - 기존 서비스 역할 : aws-elasticbeanstalk-service-rile
   - EC2 인스턴스 프로파일 : aws-elasticbeanstalk-ec2-role
   - 인스턴스 유형 : t2.micro 선택

### 로그인 기능 세팅

- Nextauth의 OAuth를 사용하는 경우 URL을 배포된 주소로 변경
- .env 파일에서 `NEXTHAUTH_URL="배포주소"` 저장

<br>
<br>

# 이미지 업로드 기능1 (AWS S3 세팅)

### AWS S3

- 파일저장용 클라우드 서비스
- AWS에서 S3 검색하고, 버킷만들기 클릭
- 유니크하게 작명
- 퍼블릭 액세스 차단 해제
- 만들어진 버킷에서 권한 설정
  - 현재는 모든 사람이 버킷에 접근 가능
  - 검색은 모두가, 수정은 관리자만
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "1",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "arn:aws:s3:::님들버킷명/*"
      },
      {
        "Sid": "2",
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::님들AWS계정ID:root"
        },
        "Action": ["s3:PutObject", "s3:DeleteObject"],
        "Resource": "arn:aws:s3:::님들버킷명/*"
      }
    ]
  }
  ```
- 버킷에서 CORS 설정
  ```js
  [
    {
      AllowedHeaders: ["*"],
      AllowedMethods: ["PUT", "POST"],
      AllowedOrigins: ["*"],
      ExposeHeaders: ["ETag"],
    },
  ];
  ```
- Access Key 발급
  - IAM 검색해서 들어간 다음 우측 메뉴에서 보안 자격 증명 클릭
  - access key 만들기를 통해 access key와 비밀키 발급

<br>

### 이미지 업로드

```html
<input type="file" accept="image/*" />
```

- 파일을 입력받는 input 태그
- 이미지 파일만 허용
- 이미지를 보여주기 위해서는 `createObjectURL` 함수를 사용
- 또는 S3에 곧바로 업로드 이후 url을 통해 보여줌

<br>
<br>

# 이미지 업로드 기능 2(Presigned URL)

- Presigned URL : 이미지를 서버를 거치지 않고 S3에 바로 업로드
- 브라우저는 서버에게 Presigned URL을 요청

```js
<input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    let file = e.target.files[0];
    file.name = encodeURIComponent(file.name);
    let res = await fetch("/api/post/image?file=" + file.name);
    res = await res.join();

    //S3 업로드
    const formData = new FormData();
    Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    let 업로드결과 = await fetch(res.url, {
      method: "POST",
      body: formData,
    });
    console.log(업로드결과);

    if (업로드결과.ok) {
      setSrc(업로드결과.url + "/" + filename);
    } else {
      console.log("실패");
    }
  }}
/>
```

- `encodeURIComponent` : 파일 이름이 한글이면 문제가 발생할 수 있기 때문에 encode하여 파일 이름을 저장
- `new FormData()` : 자바스크립트에서 form data 생성
- form data에 파일과 PresigendURL의 필드들을 저장
- url로 POST 요청을 통해 이미지 업로드
- S3가 응답한 결과에 url이 있고, url + '/' + filename을 통해 업로드한 이미지를 렌더링 가능

```js
// /api/post/image.js

import aws from "aws-sdk";
export default async function handler(요청, 응답) {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.BUCKET_NAME,
    Fields: { key: 요청.query.file },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
    ],
  });

  응답.status(200).json(url);
}
```

- `npm install aws-sdk` : AWS를 다룰 수 있는 라이브러리
- aws.config.update에 이전에 발급받은 정보들을 기입
- `createPresignedPost` : PresignedURL을 발급
