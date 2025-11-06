import React from 'react'
import Hero from '@/components/home-component/Hero'
import OurServices from '@/components/home-component/OurServices'
import HomeAbout from '@/components/home-component/HomeAbout'
import FeaturedProjects from '@/components/home-component/FeaturedProjects'
import TestimonialsSection from '@/components/home-component/TestimonialsSection'
import CallToAction from '@/components/home-component/CallToAction'
import RequestQuote from '@/components/home-component/RequestQuote'

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <OurServices />
      <FeaturedProjects />
      <TestimonialsSection />
      <CallToAction />
      <RequestQuote />
    </>
  )
}
