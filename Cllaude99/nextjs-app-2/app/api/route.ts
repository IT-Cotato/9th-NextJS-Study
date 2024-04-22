export async function GET(request: Request) {
  return new Response('GET 요청!', {
    status: 200,
  });
}
