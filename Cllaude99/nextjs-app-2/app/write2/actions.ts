'use server';

export async function handleSubmit(formData: FormData) {
  console.log(formData.get('title'));
}
