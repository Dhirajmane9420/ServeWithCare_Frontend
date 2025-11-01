import React from 'react';
import { Link } from 'react-router-dom'; // <-- THIS LINE WAS MISSING

const PrivacyPolicy = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg py-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-5xl font-bold font-serif text-primary-dark dark:text-white mb-8 text-center md:text-left">
          Privacy Policy
        </h1>
        <p className="text-xl text-text-dark dark:text-gray-300 mb-10 text-center md:text-left">
          Your privacy is important to us. This policy details how we collect, use, and protect your information.
        </p>
        
        {/* --- Policy Content --- */}
        <div className="bg-white dark:bg-dark-bg-secondary p-8 md:p-12 rounded-xl shadow-lg text-text-dark dark:text-gray-300 leading-relaxed space-y-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: November 1, 2025</p>
          
          <p>
            ServeWithCare ("us", "we", or "our") operates the ServeWithCare website (the "Service").
            This page informs you of our policies regarding the collection, use, and disclosure of personal
            information when you use our Service. We will not use or share your information with anyone except
            as described in this Privacy Policy.
          </p>
          
          <h2 className="text-3xl font-semibold text-primary-dark dark:text-white mt-8 mb-4">1. Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our
            Service to you. This includes your name, email address, contact information, and role (Donor/Receiver).
            We only collect information that is necessary for you to use our platform and facilitate food donations.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
              <ul className="list-disc list-inside ml-8 space-y-1 mt-1">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</li>
          </ul>
          
          <h2 className="text-3xl font-semibold text-primary-dark dark:text-white mt-8 mb-4">2. Use of Data</h2>
          <p>
            ServeWithCare uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so (e.g., chat)</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To facilitate the donation and pickup coordination process between donors and receivers.</li>
          </ul>

          <h2 className="text-3xl font-semibold text-primary-dark dark:text-white mt-8 mb-4">3. Security of Data</h2>
          <p>
            The security of your data is paramount to us. We implement industry-standard security measures to protect your Personal Data. We use JSON Web Tokens (JWT) for secure authentication and industry-standard bcrypt for hashing passwords. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. Remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
          </p>
          
          <h2 className="text-3xl font-semibold text-primary-dark dark:text-white mt-8 mb-4">4. Links to Other Sites</h2>
          <p>
            Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
          
          <h2 className="text-3xl font-semibold text-primary-dark dark:text-white mt-8 mb-4">5. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2 className="text-3xl font-semibold text-primary-dark dark:text-white mt-8 mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            {/* The Link component is now defined */}
            <li>By email: contact@ServeWithCare.com</li>
            <li>By visiting this page on our website: <Link to="/#contact" className="text-primary hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;