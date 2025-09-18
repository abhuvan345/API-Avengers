import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, User, Lock, Sprout } from 'lucide-react';

interface SignInPageProps {
  onSubmit: (data: { phone: string; gmail: string; username: string; password: string }) => void;
  onBack: () => void;
  onSignUp: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSubmit, onBack, onSignUp }) => {
  const [formData, setFormData] = useState({
    phone: '',
    gmail: '',
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateGmail = (gmail: string): boolean => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(gmail);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Validate Gmail
    if (!validateGmail(formData.gmail)) {
      newErrors.gmail = 'Please enter a valid Gmail address (@gmail.com)';
    }

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-green-700 hover:text-green-800 mb-6 text-lg font-medium"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left side - Form */}
            <div className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="bg-green-600 p-3 rounded-full inline-block mb-4">
                  <Sprout className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600 text-lg">
                  Welcome back! Sign in to access your farming dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter 10-digit phone number"
                      className={`w-full pl-14 pr-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-green-200 outline-none transition-all ${
                        errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      maxLength={10}
                      required
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Gmail Address
                  </label>
                  <div className="relative">
                    <Mail className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      value={formData.gmail}
                      onChange={(e) => handleInputChange('gmail', e.target.value)}
                      placeholder="Enter your Gmail address"
                      className={`w-full pl-14 pr-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-green-200 outline-none transition-all ${
                        errors.gmail ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      required
                    />
                  </div>
                  {errors.gmail && <p className="text-red-500 text-sm mt-2">{errors.gmail}</p>}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      placeholder="Enter username"
                      className={`w-full pl-14 pr-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-green-200 outline-none transition-all ${
                        errors.username ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      required
                    />
                  </div>
                  {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      className={`w-full pl-14 pr-4 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-green-200 outline-none transition-all ${
                        errors.password ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                      }`}
                      required
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xl font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Sign In
                </button>

                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={onSignUp}
                      className="text-green-600 hover:text-green-700 font-semibold"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </div>

            {/* Right side - Illustration */}
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-48 h-48 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-8 mx-auto">
                  <div className="w-32 h-32 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <Sprout className="w-16 h-16 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Welcome Back, Farmer!
                </h3>
                <p className="text-lg opacity-90">
                  Continue your journey with AI-powered crop recommendations and smart farming insights
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                    <span>Personalized Crop Plans</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                    <span>Smart Activity Calendar</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                    <span>Budget Optimization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;