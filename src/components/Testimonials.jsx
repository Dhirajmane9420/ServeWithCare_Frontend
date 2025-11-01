import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft } from 'react-icons/fa';

// Mock data for our testimonials
const testimonials = [
  {
    quote: "FoodBridge has been a game-changer for our charity. We get alerts for fresh food donations daily, allowing us to serve so many more people in need.",
    name: "Sarah Chen",
    role: "Receiver - Community Food Pantry"
  },
  {
    quote: "As a restaurant owner, I used to hate how much food we wasted. Now, I post our surplus on FoodBridge and a local shelter picks it up. It's simple and makes a real difference.",
    name: "Mike Russo",
    role: "Donor - The Italian Diner"
  },
  {
    quote: "The chat feature is fantastic. We coordinate pickup times directly with the donors, which has eliminated all the confusion we had with other services.",
    name: "David Kim",
    role: "Receiver - Hope City Network"
  }
];

const Testimonials = () => {
  return (
    <div className="py-20 bg-white dark:bg-dark-bg-secondary transition-colors">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-serif text-primary-dark dark:text-white mb-12">
          What Our Community Says
        </h2>
        
        <Swiper
          modules={[Pagination, Autoplay]} // Enable modules
          spaceBetween={30}
          slidesPerView={1} // Show 1 slide at a time
          pagination={{ clickable: true }} // Add clickable dots
          autoplay={{ delay: 5000, disableOnInteraction: false }} // Autoplay every 5 seconds
          loop={true}
          className="max-w-3xl" // Limit the width for a clean look
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="p-10">
              <div className="p-8 rounded-lg shadow-lg bg-light-bg dark:bg-dark-bg">
                <FaQuoteLeft size={40} className="text-primary mx-auto mb-6" />
                <p className="text-lg italic text-dark-text dark:text-dark-text mb-6">
                  "{testimonial.quote}"
                </p>
                <h4 className="text-xl font-bold text-primary-dark dark:text-white">
                  {testimonial.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;