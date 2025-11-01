import { FaUserPlus, FaBoxOpen, FaTruck } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    icon: <FaUserPlus size={50} className="text-accent-orange" />,
    title: '1. Register',
    description: 'Sign up as a Donor (e.g., restaurant, caterer) or a Receiver (e.g., charity, food bank).',
  },
  {
    icon: <FaBoxOpen size={50} className="text-accent-orange" />,
    title: '2. Add / Request',
    description: 'Donors post available food. Receivers browse and request donations.',
  },
  {
    icon: <FaTruck size={50} className="text-accent-orange" />,
    title: '3. Connect & Deliver',
    description: 'Once a request is accepted, coordinate a pickup or delivery. It\'s that simple!',
  },
];

const HowItWorksSection = () => {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div ref={ref} id="how-it-works" className="py-20 bg-light-bg dark:bg-dark-bg-secondary transition-colors">
      <div className="container mx-auto px-6 text-center">
        <h2 
    className={`text-4xl font-bold font-serif text-primary-dark dark:text-white mb-12 ...`}
  >
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="text-center p-6">
              <div className="flex justify-center items-center mb-6 w-24 h-24 bg-white dark:bg-dark-bg rounded-full mx-auto shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-3">{step.title}</h3>
    <p className="text-dark-text dark:text-dark-text">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;