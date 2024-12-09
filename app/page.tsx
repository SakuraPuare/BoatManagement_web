import Link from 'next/link';
import { Ship, Anchor, Map, Clock, Shield, Users } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Ship className="h-6 w-6" />,
      title: 'Boat Management',
      description: 'Efficiently manage your fleet with real-time tracking and maintenance scheduling.',
    },
    {
      icon: <Anchor className="h-6 w-6" />,
      title: 'Dock Operations',
      description: 'Streamline dock assignments and monitor berth availability.',
    },
    {
      icon: <Map className="h-6 w-6" />,
      title: 'Route Planning',
      description: 'Optimize routes and schedules for maximum efficiency.',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Booking System',
      description: 'Easy-to-use ticket booking system for passengers.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safety Monitoring',
      description: 'Real-time alerts and safety monitoring systems.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'User Management',
      description: 'Comprehensive user management and access control.',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Ship className="mx-auto h-20 w-20 mb-8" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Boat Management System
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              A comprehensive solution for managing your maritime operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="btn bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Maritime Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools you need to manage your maritime operations efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-primary-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join us today and experience the future of maritime management
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </main>
  );
}