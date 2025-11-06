import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Brand / About */}
        <div>
          <h3 className="text-white text-xl font-bold mb-4">Rayob Engineering</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Delivering innovative, reliable, and cost-effective engineering solutions
            across industrial, commercial, and residential sectors.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-white transition"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-white transition"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition">
                Services
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white transition">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Our Services</h4>
          <ul className="space-y-3">
            <li>Civil Engineering</li>
            <li>Mechanical Works</li>
            <li>Electrical Installations</li>
            <li>Project Management</li>
            <li>Consultancy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Contact Info</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-500 mt-1" />
              <span>
                42 Engineering Close, Ikeja Industrial Estate,
                <br /> Lagos, Nigeria
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-blue-500" />
              <a href="tel:+2348000000000" className="hover:text-white transition">
                +234 800 000 0000
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-500" />
              <a href="mailto:info@rayobengineering.com" className="hover:text-white transition">
                info@rayobengineering.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-gray-300 font-medium">Rayob Engineering</span>. 
        All rights reserved. | Designed by <span className="text-blue-500">Rayob Dev Team</span>
      </div>
    </footer>
  );
}
