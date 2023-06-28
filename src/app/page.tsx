import GenerateCode from "@/components/GenerateCode"
import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="bg-zinc-900 h-screen">
      <div>
        <Header />
      </div>      
      <main className="flex h-[90vh] flex-col items-center justify-center">
        <GenerateCode />
      </main>
    </div>
  )
}
