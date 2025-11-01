import React, { useState } from 'react'; // Import useState for accordion functionality

const FAQ = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg py-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-5xl font-bold font-serif text-primary-dark dark:text-white mb-8 text-center md:text-left">
          Frequently Asked Questions (FAQ)
        </h1>
        <p className="text-xl text-text-dark dark:text-gray-300 mb-10 text-center md:text-left">
          Find quick answers to common questions about ServeWithCare.
        </p>
        
        <div className="space-y-6">
          <FAQItem title="1. Who can donate food on ServeWithCare?">
            <p className="text-text-dark dark:text-text-light">
              Our platform is designed for registered food businesses such as restaurants, caterers, grocery stores, bakeries, and event venues that often have surplus food. Individuals interested in donating can connect with local food drives or charities directly.
            </p>
          </FAQItem>
          
          <FAQItem title="2. What types of food are acceptable for donation?">
            <p className="text-text-dark dark:text-text-light">
              We accept a wide range of food items, including fresh produce, packaged goods, baked items, and prepared meals. All donated food must be within its safe consumption date, properly stored, and meet local food safety guidelines.
            </p>
          </FAQItem>
          
          <FAQItem title="3. How do I, as a receiver, request food?">
            <p className="text-text-dark dark:text-text-light">
              Verified non-profit organizations, food banks, and shelters can browse available donations on their dashboard. Once you find a suitable donation, you can send a request directly through the platform. Donors will review and approve requests.
            </p>
          </FAQItem>
          
          <FAQItem title="4. Is there a cost to use ServeWithCare?">
            <p className="text-text-dark dark:text-text-light">
              No, ServeWithCare is a free platform dedicated to connecting food donors with receivers to reduce waste and fight hunger. Our mission is to facilitate these connections without any charges to users.
            </p>
          </FAQItem>

          <FAQItem title="5. How are pickups arranged?">
            <p className="text-text-dark dark:text-text-light">
              After a donation request is approved, the donor and receiver can communicate directly through our secure chat system to coordinate a convenient pickup time and location. Responsibility for transportation lies with the receiving organization.
            </p>
          </FAQItem>

          <FAQItem title="6. What if I have a problem with a donation or pickup?">
            <p className="text-text-dark dark:text-text-light">
              If you encounter any issues, please contact our support team immediately through the "Contact Us" section in the footer or directly via email. We are here to help resolve any disputes or logistical challenges.
            </p>
          </FAQItem>
        </div>
      </div>
    </div>
  );
};

// Reusable FAQ Item Component with Accordion Functionality
const FAQItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-dark-bg-secondary p-5 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold text-xl text-primary-dark dark:text-white leading-relaxed">
          {title}
        </h3>
        <span className="text-2xl text-primary dark:text-accent-orange">
          {isOpen ? '-' : '+'}
        </span>
      </div>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-text-dark dark:text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
};

export default FAQ;