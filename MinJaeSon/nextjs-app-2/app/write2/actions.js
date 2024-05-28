"use server";

export async function handleSubmit(formData) {
  console.log(formData.get("title"));
}
