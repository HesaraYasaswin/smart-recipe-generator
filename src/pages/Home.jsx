import React from 'react';
import { ChefHat, Sparkles, ArrowRight } from "lucide-react";
import heroBackground from "../assets/hero-background.jpg";

// Home component for landing page
const Home = ({ navigateTo }) => {
  return (
         <div
       className="min-h-screen bg-black relative text-white"
       style={{
         backgroundImage: `url(${heroBackground})`,
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         backgroundPosition: "center",
         backgroundAttachment: "fixed",
       }}
     >
       <div className="absolute inset-0 bg-black/80 z-0"></div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ChefHat className="text-orange-500" size={40} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500">Fridge</span>
            <span className="text-white">2</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-blue-500">Fork</span>
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="text-orange-400" size={24} />
              <span className="text-orange-400 font-medium">AI-Powered Recipe Discovery</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-8 tracking-tight">
                  Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 animate-pulse">Leftovers</span> Into Amazing Meals
                </h2>
              </div>
              
              <div className="text-left">
                <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed font-medium">
                  Simply tell us what ingredients you have, and our AI will generate personalized recipe suggestions
                  that make the most of what's in your kitchen.
                </p>
                
                <div
                  onClick={() => navigateTo('ingredient-demo')}
                  className="group cursor-pointer relative inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 px-12 rounded-2xl text-2xl font-black shadow-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-orange-500/25 border-2 border-orange-400/20"
                  aria-label="Go to Ingredient Demo"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full"></div>
                  </div>
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center">
                    <span className="mr-3">✨</span>
                    Start Cooking
                    <ArrowRight size={28} className="ml-4 relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                  </span>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 rounded-2xl group-hover:from-orange-500/20 group-hover:to-red-500/20 transition-all duration-500"></div>
                </div>
              </div>
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
              
                             <div className="relative bg-black/40 p-6 rounded-xl border border-white/10 group-hover:border-orange-400/30 transition-all duration-300 h-full">
                 <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors duration-300">
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
              
                             <div className="relative bg-black/40 p-6 rounded-xl border border-white/10 group-hover:border-green-400/30 transition-all duration-300 h-full">
                 <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors duration-300">
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
              
                             <div className="relative bg-black/40 p-6 rounded-xl border border-white/10 group-hover:border-yellow-400/30 transition-all duration-300 h-full">
                 <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-500/30 transition-colors duration-300">
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