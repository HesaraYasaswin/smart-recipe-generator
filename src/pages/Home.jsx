import React from 'react';
import { ChefHat, Sparkles, ArrowRight } from "lucide-react";
import heroBackground from "../assets/hero-background.jpg";

const Home = ({ navigateTo }) => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#0f0f1c] via-[#121219] to-[#1a1a2e] relative text-white"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center gap-2">
          <ChefHat className="text-orange-500" size={32} />
          <h1 className="text-2xl font-bold text-white">Smart Recipe Generator</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="text-orange-400" size={24} />
              <span className="text-orange-400 font-medium">AI-Powered Recipe Discovery</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Turn Your <span className="text-orange-500">Leftovers</span> Into Amazing Meals
            </h2>

            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Simply tell us what ingredients you have, and our AI will generate personalized recipe suggestions
              that make the most of what's in your kitchen.
            </p>

            <div
              onClick={() => navigateTo('ingredient-demo')}
              className="group cursor-pointer relative inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-4 px-8 rounded-xl text-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              aria-label="Go to Ingredient Demo"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
              </div>
              
              {/* Button content */}
              <span className="relative z-10">Start Cooking</span>
              <ArrowRight size={24} className="ml-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              
              {/* 3D effect layers */}
              <div className="absolute -bottom-1.5 left-0 right-0 h-2 bg-orange-700 rounded-b-xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-2.5 left-1 right-1 h-1.5 bg-orange-800 rounded-b-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="group relative">
              {/* Uniform squares with consistent sizing */}
              <div className="absolute -inset-2 overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-0 w-12 h-12 bg-orange-400/10 border-2 border-orange-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-1 group-hover:translate-x-1"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-orange-400/10 border-2 border-orange-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-orange-400/10 border-2 border-orange-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-1 group-hover:-translate-x-1"></div>
              </div>
              
              <div className="relative bg-gradient-to-b from-[#121219]/50 to-[#1a1a2e]/50 p-6 rounded-xl backdrop-blur-sm border border-white/10 group-hover:border-orange-400/30 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <ChefHat className="text-orange-500 group-hover:text-orange-400 transition-colors duration-300" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-orange-300 transition-colors duration-300">AI-powered recipe generation</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Our AI analyzes your ingredients and suggests recipes that maximize flavor and minimize waste.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute -inset-2 overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-0 w-12 h-12 bg-green-400/10 border-2 border-green-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-1 group-hover:translate-x-1"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-green-400/10 border-2 border-green-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-green-400/10 border-2 border-green-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-1 group-hover:-translate-x-1"></div>
              </div>
              
              <div className="relative bg-gradient-to-b from-[#121219]/50 to-[#1a1a2e]/50 p-6 rounded-xl backdrop-blur-sm border border-white/10 group-hover:border-green-400/30 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/20 transition-colors duration-300">
                  <Sparkles className="text-green-500 group-hover:text-green-400 transition-colors duration-300" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-green-300 transition-colors duration-300">Ingredient-based suggestions</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Get recipes that match your dietary needs, from vegetarian to gluten-free options.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute -inset-2 overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-0 w-12 h-12 bg-yellow-400/10 border-2 border-yellow-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-1 group-hover:translate-x-1"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-yellow-400/10 border-2 border-yellow-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-yellow-400/10 border-2 border-yellow-400/30 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-1 group-hover:-translate-x-1"></div>
              </div>
              
              <div className="relative bg-gradient-to-b from-[#121219]/50 to-[#1a1a2e]/50 p-6 rounded-xl backdrop-blur-sm border border-white/10 group-hover:border-yellow-400/30 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/20 transition-colors duration-300">
                  <ArrowRight className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-yellow-300 transition-colors duration-300">Step-by-Step Instructions</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Clear, easy-to-follow instructions that guide you through every step of the cooking process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-white/20 relative z-10">
        <div className="text-center text-gray-400">
          <p>Made with ❤️ for home cooks everywhere</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;