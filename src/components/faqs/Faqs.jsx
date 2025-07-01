import React, { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const faqs = [
  {
    question: 'Getting Your Key',
    answer: 'You will receive your key via a lockbox or directly from the host upon arrival.',
  },
  {
    question: 'Communicating With Your Host',
    answer: 'You can message your host directly through the platform for any questions or concerns.',
  },
  {
    question: 'Checking In',
    answer: 'Check-in time is usually mentioned in the listing, and instructions will be provided accordingly.',
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">How does it work?</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-md mb-2">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center px-4 py-3 font-medium text-left focus:outline-none"
          >
            <span>{faq.question}</span>
            <IoChevronDown
              className={`transform transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faqs;
