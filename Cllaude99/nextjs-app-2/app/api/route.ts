export async function GET(request: Request) {
  return new Response('GET 요청!', {
    status: 200,
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get('name');
  return new Response(`요청자 이름 : ${name}`, {
    status: 200,
  });
}
