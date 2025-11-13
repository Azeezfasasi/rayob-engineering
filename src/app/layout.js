import '../globals.css'
import MainHeader from '@/components/home-component/MainHeader'
import Footer from '@/components/home-component/Footer'

export const metadata = {
  title: 'Rayob Engineering',
  description: 'Innovative Engineering Solutions for Modern Projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-main-header">
          <MainHeader />
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
