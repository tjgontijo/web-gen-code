'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { ShieldPlus, House, GearSix, Cube, Database, Star  } from "@phosphor-icons/react"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gerador de Código SENASP',
  description: 'Sistema para geração de codigo de material ou serviço da SENASP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className="bg-zinc-900 text-zinc-100">
         <div className="h-screen flex flex-col">
            <div className="flex flex-1">
              <aside className="w-72 bg-zinc-950 p-6">
                <nav className="space-y-6">
                  <a href="/" className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
                  <House size={22} color="#fafafa" /> Home
                  </a>
                  <a href="/groups" className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
                  <Cube  size={22} color="#fafafa" /> Grupos
                  </a>          
                  <a href="/classes" className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
                  <Database  size={22} color="#fafafa" /> Classes
                  </a>          
                  <a href="/items" className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
                  <Star  size={22} color="#fafafa" /> Bem / Serviços
                  </a>          
                  <a href="/generate" className="flex items-center gap-2 text-lg font-semibold text-zinc-50">
                  <GearSix  size={22} color="#fafafa" /> Gerar Código
                  </a>          
                </nav>
              </aside>           
              <main className="flex flex-col flex-1 items-center justify-center p-6">
                {children}  
              </main>
            </div>
            <footer className="bg-zinc-800 border-t border-zinc-700 p-4 flex flex-col items-center justify-center">SENASP/MJSP</footer>
          </div>
        </body>
    </html>
  )
}
