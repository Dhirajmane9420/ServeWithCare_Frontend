import React, { useState } from 'react'; // <-- Import useState for testimonials
import HeroSection from '../components/HeroSection.jsx';
// No Footer import here, as it's handled by App.jsx
import AnimatedSection from '../components/AnimatedSection.jsx'; 

// CRITICAL: Include all necessary icons for the Home page
import { FaHandHoldingHeart, FaCheckCircle, FaUsers, FaLeaf, FaSearch, FaBoxes } from 'react-icons/fa'; 


const Home = () => {
  // --- State for testimonial slider ---
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote: "FoodBridge has revolutionized how we manage our surplus. It's incredibly easy to use and directly impacts our community.",
      author: "- Sarah J., Restaurant Owner",
    },
    {
      quote: "As a food bank, finding reliable donations is crucial. FoodBridge connects us with fresh, quality food quickly and efficiently.",
      author: "- Mark L., Food Bank Director",
    },
    {
      quote: "The interface is intuitive, and the impact is tangible. It feels great knowing our excess goes directly to helping others.",
      author: "- Emily R., Community Volunteer",
    },
    {
      quote: "Thanks to FoodBridge, we've significantly reduced our food waste and reached more families in need than ever before.",
      author: "- Alex T., Community Center Manager",
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      (prevIndex + 1) % testimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) => 
      (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="dark:bg-dark-bg transition-colors duration-300">
      <HeroSection />

      {/* --- 1. Impact Section --- */}
      <section id="about-us" className="py-16 bg-light-bg dark:bg-dark-bg text-center">
        <div className="container mx-auto px-6">
          <AnimatedSection delay={0}>
            <h2 className="text-4xl font-bold font-serif text-primary-dark dark:text-white mb-10 animate-bounce-in">
              Our Impact
            </h2>
            <p className="text-xl text-text-dark dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
              FoodBridge connects surplus food with those in need, reducing waste and fostering community.
              Together, we can make a difference, one donation at a time.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={100}>
              <div className="bg-white dark:bg-dark-bg-secondary p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <FaHandHoldingHeart className="text-primary text-5xl mx-auto mb-4 animate-scale-up" />
                <h3 className="text-2xl font-semibold text-primary-dark dark:text-white mb-3">5,000+ Meals Donated</h3>
                <p className="text-text-dark dark:text-gray-400">Transforming surplus into sustenance.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="bg-white dark:bg-dark-bg-secondary p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4 animate-scale-up" />
                <h3 className="text-2xl font-semibold text-primary-dark dark:text-white mb-3">100+ Active Donors</h3>
                <p className="text-text-dark dark:text-gray-400">A growing network committed to giving.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="bg-white dark:bg-dark-bg-secondary p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <FaUsers className="text-accent-orange text-5xl mx-auto mb-4 animate-scale-up" /> 
                <h3 className="text-2xl font-semibold text-primary-dark dark:text-white mb-3">50+ Partner Organizations</h3>
                <p className="text-text-dark dark:text-gray-400">Reaching communities efficiently.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* --- 2. How It Works Section (IMPROVED COLORS) --- */}
      <section id="how-it-works" className="py-16 bg-gradient-to-br from-primary-dark to-primary text-white text-center"> 
        <div className="container mx-auto px-6">
          <AnimatedSection delay={0}>
            <h2 className="text-4xl font-bold font-serif mb-10 animate-bounce-in">How It Works</h2>
            <p className="text-xl max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
              Our platform simplifies the process of donating and receiving food.
              Follow these simple steps to join our network and start making an impact.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection delay={100}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white border-opacity-20">
                <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">1</div>
                <h3 className="text-2xl font-semibold mb-3">Register & List</h3>
                <p className="opacity-90">Donors sign up and easily list surplus food items.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white border-opacity-20">
                <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">2</div>
                <h3 className="text-2xl font-semibold mb-3">Browse & Request</h3>
                <p className="opacity-90">Receivers browse available donations and send requests.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={300}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white border-opacity-20">
                <div className="bg-white text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">3</div>
                <h3 className="text-2xl font-semibold mb-3">Connect & Collect</h3>
                <p className="opacity-90">Donors approve requests, and receivers arrange pickup.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* --- 3. Community Testimonials Section (UPDATED FOR SLIDER & ORIGINAL STYLING) --- */}
      <section className="py-16 bg-light-bg dark:bg-dark-bg text-center relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-2xl">
          <AnimatedSection delay={0}>
            <h2 className="text-4xl font-bold font-serif text-primary-dark dark:text-white mb-10 animate-bounce-in">
              What Our Community Says
            </h2>
          </AnimatedSection>

          {/* Testimonial Card */}
          {/* AnimatedSection now wraps the individual card for the scroll animation */}
          <AnimatedSection delay={100} className="relative transition-opacity duration-700 ease-in-out">
            <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md min-h-[200px] flex flex-col justify-center"> {/* Original styling */}
              <p className="text-text-dark dark:text-gray-300 mb-4 italic text-lg leading-relaxed">
                "{testimonials[currentTestimonialIndex].quote}"
              </p>
              <p className="font-semibold text-primary-dark dark:text-white text-md">
                {testimonials[currentTestimonialIndex].author}
              </p>
            </div>
          </AnimatedSection>
          
          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8 px-4 sm:px-0">
            <button 
              onClick={prevTestimonial}
              className="bg-primary dark:bg-primary-light text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextTestimonial}
              className="bg-primary dark:bg-primary-light text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </section>

      {/* No Footer here. It's handled by App.jsx or a main Layout component. */}
    </div>
  );
};

export default Home;