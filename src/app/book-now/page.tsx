import Link from 'next/link';
import ProviderCard from '../components/ProviderCard'; // Import the ProviderCard component

// Placeholder for ProviderCard component - we will create this next
// const ProviderCard = ({ provider }: { provider: any }) => (
//   <div className="bg-white p-4 rounded-lg shadow-md">
//     <h3 className="text-xl font-semibold text-brand-dark-blue">{provider.name}</h3>
//     <p className="text-brand-text">{provider.specialty}</p>
//     {/* Add more provider details here */}
//   </div>
// );

export default function BookNowPage() {
  // Placeholder for provider data - updated to match ProviderCardProps
  const providers = [
    {
      name: "Dr. Elizabeth Sims",
      imageUrl: "/placeholder-therapist-1.jpg", // Replace with actual image path
      degree: "Master's in Counseling",
      bio: "I hold a Master's degree in Counseling and have a deep passion for supporting individuals facing mental health challenges, especially those related to anxiety and depression. My approach is collaborative and client-centered."
    },
    {
      name: "Dr. Johnathan Kramer",
      imageUrl: "/placeholder-therapist-2.jpg", // Replace with actual image path
      degree: "PhD in Clinical Psychology",
      bio: "With over 10 years of experience, I specialize in cognitive behavioral therapy (CBT) and mindfulness-based stress reduction. I work with adults and adolescents."
    },
    {
      name: "Dr. Sarah Chen",
      // imageUrl: "/placeholder-therapist-3.jpg", // Example of provider without an image
      degree: "Licensed Clinical Social Worker (LCSW)",
      bio: "My focus is on trauma-informed care and helping clients build resilience. I am dedicated to creating a safe and supportive space for healing and growth. I often incorporate art and narrative therapy techniques."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-light-teal p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-brand-dark-blue mb-4 text-center">
          Connect with our Providers
        </h1>
        <p className="text-brand-text mb-8 text-lg text-center">
          Find the right professional for your needs.
        </p>

        {/* Filters Section */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-brand-dark-blue mb-4">Filter Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Placeholder for filter dropdowns - we can use a component for this */}
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-brand-text">Specialty</label>
              <select id="specialty" name="specialty" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm rounded-md">
                <option>All</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                {/* Add more options */}
              </select>
            </div>
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-brand-text">Availability</label>
              <select id="availability" name="availability" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm rounded-md">
                <option>Any</option>
                <option>Next 7 days</option>
                <option>Next 30 days</option>
              </select>
            </div>
            {/* Add more filters as needed, similar to Rula (Gender, Race, Language, Treatment approach) */}
          </div>
        </div>

        {/* Provider Listing Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-brand-text">
              {providers.length} available providers who best fit your preferences
            </p>
            <div>
              <label htmlFor="sort" className="sr-only">Sort by</label>
              <select id="sort" name="sort" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-teal focus:border-brand-teal sm:text-sm rounded-md">
                <option>Sort: Recommended</option>
                <option>Sort: Name A-Z</option>
                <option>Sort: Name Z-A</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider, index) => (
              <ProviderCard key={index} provider={provider} />
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="text-brand-teal hover:underline text-lg">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 