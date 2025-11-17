"use client";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Clock } from "lucide-react";

export default function ContactUsMain() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Thank you! Your message has been submitted.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(data.message || "Failed to submit message.");
      }
    } catch (error) {
      alert("Failed to submit message.");
      console.error("Contact form error:", error);
    }
  };

  return (
    <section className="bg-gray-50 py-16" id="contact">
      <div className="container mx-auto px-6 lg:px-20">

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md">
              <div className="grid gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-blue-600 transition cursor-pointer"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Location / Map */}
            <div className="rounded-xl overflow-hidden shadow-md h-64 relative">
              <iframe
                title="Rayob Engineering Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.1234567890!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf0f1e4e92dff%3A0x123456789abcdef!2sIkeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1234567890"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-500" />
                <p>Lagos, Nigeria</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-500" />
                <a href="tel:+2348000000000" className="hover:text-blue-700 transition">
                  +234 800 000 0000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-blue-500" />
                <a href="mailto:info@rayobengineering.com" className="hover:text-blue-700 transition">
                  info@rayobengineering.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-blue-500" />
                <p>Mon - Fri: 9:00 AM - 5:00 PM</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com" target="_blank" className="hover:text-blue-700 transition">
                <Facebook size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-blue-700 transition">
                <Linkedin size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" className="hover:text-blue-700 transition">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
