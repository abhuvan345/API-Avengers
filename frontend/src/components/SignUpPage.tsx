import React, { useState } from 'react';
import { ArrowLeft, Phone, Lock, Sprout } from 'lucide-react';

interface SignUpPageProps {
  onSubmit: (data: { phone: string; password: string }) => void;
  onBack: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
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
          Back to Sign In
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
                  Create Account
                </h2>
                <p className="text-gray-600 text-lg">
                  Join thousands of smart farmers using AI-powered crop recommendations
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
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>At least 8 characters</li>
                      <li>One uppercase letter</li>
                      <li>One lowercase letter</li>
                      <li>One number</li>
                      <li>One special character (@$!%*?&)</li>
                    </ul>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xl font-bold py-4 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </button>
              </form>
            </div>

            {/* Right side - Illustration */}
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-8 lg:p-12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-48 h-48 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-8 mx-auto">
                  <div className="w-32 h-32 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <Sprout className="w-16 h-16 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Start Your Smart Farming Journey
                </h3>
                <p className="text-lg opacity-90">
                  Get personalized crop recommendations, optimize your yields, and increase profitability with AI-powered insights
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                    <span>AI Crop Analysis</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                    <span>Budget Planning</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
                    <span>Activity Scheduling</span>
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

export default SignUpPage;