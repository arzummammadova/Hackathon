import React from 'react';

const Contact = () => {
  return (
    <div className="">
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://www.shutterstock.com/image-photo/sky-blue-bedroom-interior-double-600nw-1091043467.jpg)'
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-serif font-light mb-4 tracking-wide">Contact Us</h1>
          <p className="text-lg font-light tracking-wider opacity-90">Get in touch with our team</p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
        {/* Left Side: Contact Form */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-serif font-semibold mb-6">Contact Form</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#c4a47c] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#c4a47c] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#c4a47c] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Write Message</label>
              <textarea
                rows="6"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#c4a47c] transition-colors resize-none"
              ></textarea>
            </div>
            <button
              type="button"
              className="bg-[#003B95] text-white px-6 py-3 mt-4 uppercase tracking-widest text-sm hover:bg-[#b8956d] transition-colors"
            >
              Send Message
            </button>
          </div>
        </div>
 
        {/* Right Side: Paragraph & Image */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-serif font-semibold mb-6">About Our Service</h2>
          <img
            src="https://themewagon.github.io/luxury-hotel/images/img_4.jpg"
            alt="Room"
            className="mb-6 w-full h-64 object-cover"
          />
          <p className="text-gray-600 mb-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae labore
            aspernatur cumque inventore voluptatibus odit doloribus! Ducimus,
            animi perferendis repellat. Ducimus harum alias quas, quibusdam
            provident ea sed, sapiente quo.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Ullam cumque eveniet, fugiat quas maiores, non modi eos deleniti
            minima, nesciunt assumenda sequi vitae culpa labore nulla! Cumque
            vero, magnam ab optio quidem debitis dignissimos nihil nesciunt vitae
            impedit!
          </p>
        </div>
      </div>
      {/* Visit Us Section */}
<div className="bg-gray-50 py-16">
  <div className="max-w-screen-xl mx-auto px-4">
    <h2 className="text-3xl font-serif font-semibold mb-12 text-center">Visit Us</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Location */}
      <div className="text-center">
        <div className="bg-[#003B95] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-serif mb-2">Our Location</h3>
        <p className="text-gray-600">123 Luxury Avenue<br />Beverly Hills, CA 90210</p>
      </div>
      
      {/* Hours */}
      <div className="text-center">
        <div className="bg-[#003B95] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-serif mb-2">Opening Hours</h3>
        <p className="text-gray-600">Monday - Friday: 9am - 6pm<br />Saturday: 10am - 4pm<br />Sunday: Closed</p>
      </div>
      
      {/* Contact Info */}
      <div className="text-center">
        <div className="bg-[#003B95] w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h3 className="text-xl font-serif mb-2">Contact Info</h3>
        <p className="text-gray-600">
          Phone: +1 (310) 555-1234<br />
          Email: info@luxuryhotel.com<br />
          Emergency: +1 (310) 555-9999
        </p>
      </div>
    </div>
    
    {/* Map Embed */}
    <div className="mt-16 h-96 bg-gray-200 overflow-hidden">
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.453007665547!2d-118.40084668478406!3d34.07368088059905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc85f0b0764d%3A0x5a2e3e5b3a61d5a4!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
        width="100%" 
        height="100%" 
        style={{border:0}} 
        allowFullScreen="" 
        loading="lazy"
        title="Hotel Location Map"
      ></iframe>
    </div>
  </div>
</div>
    </div>
  );
};

export default Contact;