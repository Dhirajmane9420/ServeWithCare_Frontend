import { FaUsers, FaRecycle, FaChartLine } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const benefits = [
  {
    icon: <FaUsers size={40} className="text-primary" />,
    title: 'Reduce Hunger',
    description: 'Directly support individuals and families in your local community.',
  },
  {
    icon: <FaRecycle size={40} className="text-primary" />,
    title: 'Save Food Waste',
    description: 'Redirect surplus food from landfills, helping the environment.',
  },
  {
    icon: <FaChartLine size={40} className="text-primary" />,
    title: 'Build Community',
    description: 'Foster a spirit of giving and support between businesses and charities.',
  },
];

const BenefitsSection = () => {
    const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <div ref={ref} id="about-us" className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold font-serif text-primary-dark mb-12">
          The Impact of Your Donation
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="`bg-light-bg dark:bg-dark-bg-secondary p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-3">{benefit.title}</h3>
  <p className="text-text-dark dark:text-text-light">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;