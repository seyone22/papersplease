import './globals.css'
import {Inter} from 'next/font/google'
import ProviderWrapper from "@/app/ProviderWrapper";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Papers Please!',
  description: 'University of Vavuniya\'s one and only exam exam hub.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <ProviderWrapper>
        {children}
    </ProviderWrapper>
    </body>
    </html>
  )
}
