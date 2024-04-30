export default function handler(request, response) {
  console.log("서버 기능 개발 배우는 중");
  return response.status(200).json('요청 성공')
}