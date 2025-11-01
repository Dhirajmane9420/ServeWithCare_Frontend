import CountUp from 'react-countup';
import { FaUtensils, FaUsers, FaLeaf } from 'react-icons/fa';

// This is the component for a single animated stat
const StatCard = ({ icon, end, label }) => {
  return (
    <div className="bg-white dark:bg-dark-bg-secondary p-8 rounded-lg shadow-xl text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-5xl font-bold text-primary mb-2">
        {/* This component animates the number */}
        <CountUp end={end} duration={3} separator="," />
      </h3>
      <p className="text-lg text-dark-text dark:text-dark-text">{label}</p>
    </div>
  );
};

// This is the main page
const Impact = () => {
  return (
    <div className="bg-light-bg dark:bg-dark-bg py-20 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold font-serif text-primary-dark dark:text-white mb-6">
          Our Collective Impact
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-16">
          Every donation, big or small, contributes to a larger movement. See what our community has achieved together.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <StatCard
            icon={<FaUtensils size={50} className="text-accent-orange" />}
            end={4200}
            label="Meals Donated"
          />
          <StatCard
            icon={<FaUsers size={50} className="text-accent-yellow" />}
            end={1250}
            label="People Helped"
          />
          <StatCard
            icon={<FaLeaf size={50} className="text-primary" />}
            end={1500}
            label="kg of Food Saved from Landfill"
          />
        </div>
      </div>
    </div>
  );
};

export default Impact;