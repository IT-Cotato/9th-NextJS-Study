'use client'

import { useRouter } from "next/navigation"

export default function DetailLink() {
  let router = useRouter();
  return (
    <button onClick={() => { router.forward() }}>버튼</button>
  )
}
