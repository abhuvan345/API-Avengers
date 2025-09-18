import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import FarmDetailsPage from './components/FarmDetailsPage';
import RecommendedCropsPage from './components/RecommendedCropsPage';
import CropPlanPage from './components/CropPlanPage';
import Dashboard from './components/Dashboard';

export type PageType = 'landing' | 'signin' | 'signup' | 'farmDetails' | 'crops' | 'plan' | 'dashboard';

export interface FarmData {
  soilType: string;
  soilImage?: File | null;
  location: string;
  farmSize: string;
  climate: string;
}

export interface UserData {
  phone: string;
  gmail: string;
  username: string;
  password: string;
  name: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('signin');
  const [farmData, setFarmData] = useState<FarmData>({
    soilType: '',
    soilImage: null,
    location: '',
    farmSize: '',
    climate: ''
  });
  const [userData, setUserData] = useState<UserData>({
    phone: '',
    gmail: '',
    username: '',
    password: '',
    name: 'John Farmer',
  });
  const [selectedCrop, setSelectedCrop] = useState<any>(null);

  const navigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => navigate('signin')} />;
      case 'signin':
        return (
          <SignInPage
            onSubmit={(data) => {
              setUserData({ ...userData, ...data });
              navigate('farmDetails');
            }}
            onBack={() => navigate('landing')}
            onSignUp={() => navigate('signup')}
          />
        );
      case 'signup':
        return (
          <SignUpPage
            onSubmit={(data) => {
              setUserData({ ...userData, ...data });
              navigate('signin');
            }}
            onBack={() => navigate('signin')}
          />
        );
      case 'farmDetails':
        return (
          <FarmDetailsPage
            onNext={(data) => {
              setFarmData(data);
              navigate('crops');
            }}
            onBack={() => navigate('signin')}
          />
        );
      case 'crops':
        return (
          <RecommendedCropsPage
            farmData={farmData}
            onCropSelect={(crop) => {
              setSelectedCrop(crop);
              navigate('plan');
            }}
            onBack={() => navigate('farmDetails')}
          />
        );
      case 'plan':
        return (
          <CropPlanPage
            selectedCrop={selectedCrop}
            onNext={() => navigate('dashboard')}
            onBack={() => navigate('crops')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            userData={userData}
            farmData={farmData}
            selectedCrop={selectedCrop}
            onNewPlan={() => navigate('farmDetails')}
            onBack={() => navigate('plan')}
          />
        );
      default:
        return <LandingPage onGetStarted={() => navigate('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {renderCurrentPage()}
    </div>
  );
}

export default App;