
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'

export const metadata = {
  title: 'Rayob Engineering',
  description: 'Innovative Engineering Solutions for Modern Projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navbar /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
