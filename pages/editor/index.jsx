import dynamic from "next/dynamic"

const EditorPage = dynamic(
  () => import("./EditorPage"),
  { ssr: false }
)

export default function Home() {
  return (
    <EditorPage />
  )
}
