import React from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Droplets,
  Leaf,
  Target,
  TrendingUp,
} from "lucide-react";

interface CropPlanPageProps {
  selectedCrop: any;
  onNext: () => void;
  onBack: () => void;
}

const CropPlanPage: React.FC<CropPlanPageProps> = ({
  selectedCrop,
  onNext,
  onBack,
}) => {
  if (!selectedCrop) return null;

  // Crop planning templates for known crops
  const planDetails: Record<string, any> = {
    Wheat: {
      startDate: "March 15, 2025",
      duration: "4-5 months",
      irrigation: "Moderate - 3-4 times per week",
      fertilizer: "NPK 20-10-10 at planting, Urea after 6 weeks",
      stages: [
        {
          stage: "Planting",
          duration: "1-2 weeks",
          description: "Prepare soil and sow seeds",
        },
        {
          stage: "Germination",
          duration: "2-3 weeks",
          description: "Seeds sprout and establish",
        },
        {
          stage: "Tillering",
          duration: "6-8 weeks",
          description: "Plant develops multiple shoots",
        },
        {
          stage: "Flowering",
          duration: "2-3 weeks",
          description: "Wheat flowers and pollinates",
        },
        {
          stage: "Grain Filling",
          duration: "4-6 weeks",
          description: "Grains develop and mature",
        },
        {
          stage: "Harvest",
          duration: "1-2 weeks",
          description: "Harvest mature grain",
        },
      ],
    },
    Tomatoes: {
      startDate: "April 1, 2025",
      duration: "3-4 months",
      irrigation: "Daily drip irrigation recommended",
      fertilizer: "Balanced 10-10-10 initially, high potassium during fruiting",
      stages: [
        {
          stage: "Transplanting",
          duration: "1 week",
          description: "Plant seedlings in prepared beds",
        },
        {
          stage: "Establishment",
          duration: "2-3 weeks",
          description: "Plants establish root systems",
        },
        {
          stage: "Flowering",
          duration: "4-6 weeks",
          description: "Flowers develop continuously",
        },
        {
          stage: "Fruit Development",
          duration: "6-8 weeks",
          description: "Fruits form and grow",
        },
        {
          stage: "Harvest",
          duration: "8-12 weeks",
          description: "Continuous harvest of ripe fruits",
        },
      ],
    },
    Carrots: {
      startDate: "March 1, 2025",
      duration: "3-4 months",
      irrigation: "Consistent moisture - every 2-3 days",
      fertilizer: "Low nitrogen, high phosphorus for root development",
      stages: [
        {
          stage: "Seeding",
          duration: "1 week",
          description: "Direct sow seeds in rows",
        },
        {
          stage: "Germination",
          duration: "2-3 weeks",
          description: "Seeds germinate and emerge",
        },
        {
          stage: "Leaf Development",
          duration: "4-6 weeks",
          description: "Foliage grows and photosynthesis begins",
        },
        {
          stage: "Root Formation",
          duration: "6-8 weeks",
          description: "Carrot roots develop and expand",
        },
        {
          stage: "Maturation",
          duration: "4-6 weeks",
          description: "Roots reach full size and sweetness",
        },
        {
          stage: "Harvest",
          duration: "2-4 weeks",
          description: "Harvest mature carrots",
        },
      ],
    },
    Spinach: {
      startDate: "February 15, 2025",
      duration: "6-8 weeks",
      irrigation: "Light, frequent watering",
      fertilizer: "High nitrogen for leaf growth",
      stages: [
        {
          stage: "Seeding",
          duration: "1 week",
          description: "Sow seeds in prepared beds",
        },
        {
          stage: "Germination",
          duration: "1-2 weeks",
          description: "Seeds sprout quickly in cool weather",
        },
        {
          stage: "Leaf Development",
          duration: "3-4 weeks",
          description: "Rapid leaf growth",
        },
        {
          stage: "Harvest Ready",
          duration: "2-3 weeks",
          description: "Continuous harvest of young leaves",
        },
      ],
    },
  };

  // Use crop name for lookup, fallback to generic template
  const cropName = selectedCrop.crop || selectedCrop.name || selectedCrop;
  const currentPlan = planDetails[cropName] || {
    startDate: "Custom date",
    duration: "Varies",
    irrigation: "Refer to local guidelines",
    fertilizer: "Refer to crop-specific recommendations",
    stages: [
      {
        stage: "Planting",
        duration: "Varies",
        description: "Prepare soil and sow seeds",
      },
      {
        stage: "Growth",
        duration: "Varies",
        description: "Monitor crop development and health",
      },
      {
        stage: "Harvest",
        duration: "Varies",
        description: "Harvest when crop is mature",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-green-700 hover:text-green-800 mb-6 text-lg font-medium"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back to Crop Selection
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              {selectedCrop.icon ? (
                <div className="bg-white p-3 rounded-full mr-4">
                  <selectedCrop.icon className="w-10 h-10 text-green-600" />
                </div>
              ) : null}
              <h2 className="text-4xl font-bold text-white">
                {cropName} Growing Plan
              </h2>
            </div>
            <p className="text-green-100 text-xl">
              Your complete guide to successful {cropName.toLowerCase()} cultivation
            </p>
          </div>

          <div className="p-8">
            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  Start Date
                </h3>
                <p className="text-blue-600 font-semibold">
                  {currentPlan.startDate}
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-green-800 mb-2">
                  Duration
                </h3>
                <p className="text-green-600 font-semibold">
                  {currentPlan.duration}
                </p>
              </div>

              <div className="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-6 text-center">
                <Droplets className="w-8 h-8 text-cyan-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-cyan-800 mb-2">
                  Irrigation
                </h3>
                <p className="text-cyan-600 font-semibold text-sm">
                  {currentPlan.irrigation}
                </p>
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 text-center">
                <Leaf className="w-8 h-8 text-amber-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-amber-800 mb-2">
                  Fertilizer
                </h3>
                <p className="text-amber-600 font-semibold text-sm">
                  {currentPlan.fertilizer}
                </p>
              </div>
            </div>

            {/* Growing Stages */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Target className="w-8 h-8 mr-3 text-green-600" />
                Growing Stages Timeline
              </h3>

              <div className="space-y-4">
                {currentPlan.stages.map((stage, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-grow bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className="text-xl font-bold text-gray-800">
                          {stage.stage}
                        </h4>
                        <span className="text-green-600 font-semibold text-sm bg-green-100 px-3 py-1 rounded-full">
                          {stage.duration}
                        </span>
                      </div>
                      <p className="text-gray-600">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Tips */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                Success Tips for {cropName}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Monitor soil moisture regularly to maintain optimal growing
                    conditions
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Apply fertilizer according to the schedule for best results
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Watch for common pests and diseases in your region
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Harvest at the right time for maximum quality and yield
                  </li>
                </ul>
              </div>
            </div>

            {/* Next Button */}
            <div className="text-center">
              <button
                onClick={onNext}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-2xl font-bold py-4 px-12 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Start My {cropName} Journey
              </button>
              <p className="text-gray-600 mt-4 text-lg">
                Ready to begin? Let's set up your farming dashboard!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPlanPage;
