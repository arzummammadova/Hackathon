import React from 'react';

const AboutPage = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://themewagon.github.io/luxury-hotel/images/img_1.jpg)'
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-serif font-light mb-4 tracking-wide">About Our Luxury Hotel</h1>
          <p className="text-lg font-light tracking-wider opacity-90">Discover our heritage and exceptional service</p>
        </div>
      </div>

      {/* History Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <img 
              src="https://themewagon.github.io/luxury-hotel/images/img_2.jpg" 
              alt="Hotel History" 
              className="w-full h-auto object-cover rounded shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif font-semibold mb-6 text-[#003B95]">Our History</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 1985, our luxury hotel has been serving distinguished guests for over three decades. 
              What began as a small boutique establishment has grown into an award-winning luxury destination, 
              while maintaining our commitment to personalized service.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our historic building has been meticulously restored to preserve its original grandeur while 
              incorporating modern amenities. Each renovation has been carefully planned to maintain the 
              architectural integrity that makes our property unique.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#003B95] text-white px-6 py-3 text-center">
                <span className="block text-2xl font-serif">35+</span>
                <span className="text-sm">Years of Service</span>
              </div>
              <div className="bg-[#003B95] text-white px-6 py-3 text-center">
                <span className="block text-2xl font-serif">120+</span>
                <span className="text-sm">Rooms & Suites</span>
              </div>
              <div className="bg-[#003B95] text-white px-6 py-3 text-center">
                <span className="block text-2xl font-serif">50+</span>
                <span className="text-sm">Awards Won</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold mb-12 text-center text-[#003B95]">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={`https://themewagon.github.io/luxury-hotel/images/person_${item}.jpg`} 
                  alt={`Team Member ${item}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-1">James Wilson</h3>
                  <p className="text-[#c4a47c] mb-3">General Manager</p>
                  <p className="text-gray-600 text-sm mb-4">
                    With over 20 years in hospitality, James ensures every guest experiences unparalleled service.
                  </p>
                  <div className="flex space-x-3">
                    <a href="#" className="text-[#003B95] hover:text-[#c4a47c]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-[#003B95] hover:text-[#c4a47c]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="text-[#003B95] hover:text-[#c4a47c]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-semibold mb-12 text-center text-[#003B95]">Guest Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-[#c4a47c]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">
                "The service was exceptional from the moment we arrived. The attention to detail in our suite made our anniversary truly special."
              </p>
              <div className="flex items-center">
                <img 
                  src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`} 
                  alt="Guest" 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-serif">Michael Johnson</h4>
                  <p className="text-sm text-gray-500">New York, USA</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards & Recognition */}
      <div className="bg-[#003B95] text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold mb-12 text-center">Awards & Recognition</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { name: "World Luxury Hotel Awards", year: "2023" },
              { name: "Travelers' Choice", year: "2022" },
              { name: "Five Star Diamond", year: "2021" },
              { name: "Best Spa Resort", year: "2020" }
            ].map((award, index) => (
              <div key={index} className="p-6 border border-white border-opacity-20 rounded-lg">
                <svg className="w-12 h-12 mx-auto mb-4 text-[#c4a47c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h3 className="font-serif text-lg mb-1">{award.name}</h3>
                <p className="text-sm opacity-80">{award.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-screen-xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-semibold mb-12 text-center text-[#003B95]">Our Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="group relative overflow-hidden rounded-lg cursor-pointer">
              <img 
                src={`https://themewagon.github.io/luxury-hotel/images/img_${item}.jpg`} 
                alt={`Gallery ${item}`}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:bg-opacity-50 transition-opacity">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-screen-md mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-4 text-[#003B95]">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive offers, events, and luxury travel inspiration.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#003B95]"
            />
            <button className="bg-[#003B95] text-white px-6 py-3 uppercase tracking-widest text-sm hover:bg-[#b8956d] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;