import '../globals.css'
import MainHeader from '@/components/home-component/MainHeader'
import Footer from '@/components/home-component/Footer'
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: 'Rayob Engineering',
  description: 'Innovative Engineering Solutions for Modern Projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="site-main-header sticky top-0 z-50">
            <MainHeader />
          </div>
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
