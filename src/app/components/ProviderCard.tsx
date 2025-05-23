import Image from 'next/image';

interface ProviderCardProps {
  provider: {
    name: string;
    imageUrl?: string; // Optional image URL
    degree: string;
    bio: string;
    // Add other relevant provider fields here, e.g.:
    // specialties: string[];
    // availability: string;
    // acceptsNewPatients: boolean;
  };
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      {provider.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={provider.imageUrl}
            alt={`Photo of ${provider.name}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-brand-dark-blue mb-2">{provider.name}</h3>
        <p className="text-brand-teal font-semibold mb-1">{provider.degree}</p>
        <p className="text-brand-text text-sm mb-4 flex-grow min-h-[60px]">
          {provider.bio.substring(0, 100)}{provider.bio.length > 100 && '...'}
          {provider.bio.length > 100 && (
            <button className="text-brand-teal hover:underline ml-1 font-semibold">See more</button>
          )}
        </p>
        {/* Placeholder for other info like licenses, specializations, etc. */}
        {/* Example: <div className="mt-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            LPC
          </span>
        </div> */}
        <div className="mt-auto pt-4 border-t border-gray-200">
            <button 
                className="w-full bg-brand-teal text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-dark-teal transition duration-150 ease-in-out"
            >
                Book a Session
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard; 