"use client";

import { Calendar, Heart, MapPin, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const ConstellationLoveMap = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showMemory, setShowMemory] = useState(null);
  const [stars, setStars] = useState([]);
  const [viewedCount, setViewedCount] = useState(0);
  const [showLoveLetter, setShowLoveLetter] = useState(false);
  const [letterText, setLetterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [show3DScene, setShow3DScene] = useState(false);
  const [carPosition, setCarPosition] = useState(0);
  const [showCrashCard, setShowCrashCard] = useState(false);
  const [showGiftBox, setShowGiftBox] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const typewriterRef = useRef(null);

  const memories = [
    {
      id: 1,
      constellation: "First Message",
      date: "Jan 18th 2025",
      location: "Somewhere Random",
      memory: "The moment I knew you were special ✨",
      photo: "🌹",
      stars: [
        { x: 15, y: 25, size: 3 },
        { x: 20, y: 20, size: 2 },
        { x: 25, y: 30, size: 4 },
        { x: 30, y: 28, size: 2 }
      ]
    },
    {
      id: 2,
      constellation: "First I love you",
      date: "April 4th 2025",
      location: "Somewhere special",
      memory: "Time stopped for a perfect moment 💋",
      photo: "🌙",
      stars: [
        { x: 70, y: 20, size: 4 },
        { x: 75, y: 15, size: 3 },
        { x: 80, y: 25, size: 2 },
        { x: 85, y: 22, size: 3 }
      ]
    },
    {
      id: 3,
      constellation: "My Birthday",
      date: "April 17th 2025",
      location: "In Your Presence",
      memory: "When you made a regular day even more special",
      photo: "⛰️",
      stars: [
        { x: 20, y: 65, size: 3 },
        { x: 25, y: 60, size: 4 },
        { x: 30, y: 70, size: 2 },
        { x: 35, y: 68, size: 3 }
      ]
    },
    {
      id: 4,
      constellation: "Your Birthday",
      date: "Today",
      location: "My Heart",
      memory: "Happy Birthday, Beautiful! 🎂",
      photo: "💖",
      stars: [
        { x: 65, y: 70, size: 4 },
        { x: 70, y: 65, size: 3 },
        { x: 75, y: 75, size: 4 },
        { x: 80, y: 72, size: 3 },
        { x: 85, y: 68, size: 2 }
      ]
    }
  ];

  const fullLetterText = `My Dearest Love,

Today marks another beautiful year of your existence, and I couldn't be more grateful to witness the magic that is you.

From our first message in some random corner of the digital universe, to the moment you whispered "I love you" and made my heart skip a beat, every day with you has been written in the stars.

You have this incredible ability to transform ordinary moments into extraordinary memories. Just like how you made my birthday so special simply by being there - in your presence, everything becomes more beautiful, more meaningful, more alive.

Watching you grow, laugh, dream, and shine brighter with each passing day fills my heart with so much joy. You are my constellation, my guiding star, my home.

Happy Birthday, Beautiful! 

Here's to another year of adventures, inside jokes, midnight conversations, and love letters written in starlight.

Forever yours,
With all my love ✨💕`;

  useEffect(() => {
    const backgroundStars = [];
    for (let i = 0; i < 150; i++) {
      backgroundStars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2
      });
    }
    setStars(backgroundStars);
  }, []);

  useEffect(() => {
    if (currentScene < memories.length - 1) {
      const timer = setTimeout(() => {
        setCurrentScene(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScene, memories.length]);

  useEffect(() => {
    if (showLoveLetter && !isTyping) {
      setIsTyping(true);
      let index = 0;
      
      const typeWriter = () => {
        if (index < fullLetterText.length) {
          setLetterText(fullLetterText.slice(0, index + 1));
          index++;
          typewriterRef.current = setTimeout(typeWriter, 50);
          
          const letterContainer = document.getElementById('letter-container');
          if (letterContainer) {
            letterContainer.scrollTop = letterContainer.scrollHeight;
          }
        } else {
          setIsTyping(false);
        }
      };
      
      typeWriter();
    }
    
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
      }
    };
  }, [showLoveLetter]);

  useEffect(() => {
    if (show3DScene) {
      let animationId;
      let startTime = null;
      
      const animateCar = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const duration = 5000;
        
        if (elapsed < duration) {
          const progress = elapsed / duration;
          const easeInOut = 0.5 * (1 - Math.cos(progress * Math.PI));
          setCarPosition(easeInOut * 100);
          animationId = requestAnimationFrame(animateCar);
        } else {
          setCarPosition(100);
          setTimeout(() => {
            setShowCrashCard(true);
          }, 500);
        }
      };
      
      animationId = requestAnimationFrame(animateCar);
      
      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [show3DScene]);

  useEffect(() => {
    if (showGiftBox) {
      const openTimer = setTimeout(() => {
        setBoxOpened(true);
        setTimeout(() => {
          setShowCard(true);
        }, 1000);
      }, 2000);
      
      return () => clearTimeout(openTimer);
    }
  }, [showGiftBox]);

  const handleConstellationClick = (memory) => {
    setShowMemory(memory);
  };

  const closeMemory = () => {
    if (showMemory && viewedCount < 4) {
      setViewedCount(prev => prev + 1);
    }
    setShowMemory(null);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,400&family=Dancing+Script:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap" rel="stylesheet" />
      
      <div className="absolute inset-0">
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h1 className="text-4xl md:text-6xl text-white mb-2 tracking-wide" style={{fontFamily: 'Playfair Display, serif', fontWeight: 300, fontStyle: 'italic'}}>
          Our Love Story
        </h1>
        <p className="text-lg text-purple-200 opacity-80" style={{fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, letterSpacing: '1px'}}>
          Written in the Stars ✨
        </p>
      </div>

      <div className="absolute inset-0 w-full h-full">
        {memories.map((memory, index) => (
          <div key={memory.id} className="absolute w-full h-full">
            {memory.stars.map((star, starIndex) => (
              <div key={starIndex}>
                <button
                  onClick={() => handleConstellationClick(memory)}
                  className={`absolute rounded-full transition-all duration-1000 hover:scale-150 cursor-pointer z-10 ${
                    index <= currentScene 
                      ? 'bg-gradient-to-r from-pink-400 to-purple-400 shadow-lg shadow-pink-500/50 animate-pulse' 
                      : 'bg-gray-600 opacity-30'
                  }`}
                  style={{
                    left: `calc(${star.x}% - ${star.size}px)`,
                    top: `calc(${star.y}% - ${star.size}px)`,
                    width: `${star.size * 3}px`,
                    height: `${star.size * 3}px`,
                    animationDelay: `${starIndex * 200}ms`
                  }}
                />
              </div>
            ))}

            {index <= currentScene && (
              <div 
                className="absolute transform -translate-x-1/2 pointer-events-none"
                style={{
                  left: `${memory.stars[0].x}%`,
                  top: `${memory.stars[0].y - 8}%`
                }}
              >
                <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-pink-500/30 shadow-lg">
                  <p className="text-pink-200 text-sm font-medium whitespace-nowrap" style={{fontFamily: 'Dancing Script, cursive', fontWeight: 500}}>{memory.constellation}</p>
                  <p className="text-purple-300 text-xs whitespace-nowrap" style={{fontFamily: 'Cormorant Garamond, serif', fontWeight: 300}}>{memory.date}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showMemory && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          onClick={closeMemory}
        >
          <div 
            className="relative bg-gradient-to-br from-purple-900/95 via-indigo-900/95 to-pink-900/95 backdrop-blur-xl rounded-3xl border border-pink-400/20 shadow-2xl shadow-purple-500/30 p-10 max-w-lg w-full transform overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-pink-500/10 rounded-3xl"></div>
            
            <button
              onClick={closeMemory}
              className="absolute top-6 right-6 text-white/60 hover:text-white/90 text-3xl transition-all duration-300 hover:scale-110 z-10"
            >
              ×
            </button>
            
            <div className="text-center relative z-10">
              <div className="text-7xl mb-6 filter drop-shadow-lg">{showMemory.photo}</div>
              <h3 className="text-3xl text-white mb-3 tracking-wide" style={{fontFamily: 'Playfair Display, serif', fontWeight: 400, fontStyle: 'italic'}}>{showMemory.constellation}</h3>
              
              <div className="flex items-center justify-center gap-6 text-purple-100 text-sm mb-6" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-pink-300" />
                  <span className="font-medium">{showMemory.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-purple-300" />
                  <span className="font-medium">{showMemory.location}</span>
                </div>
              </div>
              
              <div className="bg-black/20 rounded-2xl p-6 mb-6 border border-white/10 backdrop-blur-sm">
                <p className="text-pink-100 text-xl leading-relaxed" style={{fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, lineHeight: '1.7'}}>
                  {showMemory.memory}
                </p>
              </div>
              
              <div className="flex justify-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className="w-6 h-6 text-pink-400 fill-current filter drop-shadow-sm animate-pulse" 
                    style={{animationDelay: `${i * 200}ms`}} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        {viewedCount >= 4 ? (
          <div>
            <button
              onClick={() => setShowLoveLetter(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-pink-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
              style={{fontFamily: 'Playfair Display, serif'}}
            >
              <span>Continue to your surprise</span>
              <div className="animate-bounce">→</div>
            </button>
          </div>
        ) : (
          <div>
            <p className="text-purple-200 text-sm animate-bounce" style={{fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, letterSpacing: '0.5px'}}>
              Click the constellations to explore our memories ({viewedCount}/4)
            </p>
            <Sparkles className="w-5 h-5 text-pink-400 mx-auto mt-2 animate-pulse" />
          </div>
        )}
      </div>

      {showLoveLetter && (
        <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black z-50 overflow-hidden">
          <button
            onClick={() => setShowLoveLetter(false)}
            className="absolute top-8 left-8 bg-black/40 backdrop-blur-sm text-white/90 hover:text-white hover:bg-black/60 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 z-20 border border-white/20 flex items-center gap-2"
            style={{fontFamily: 'Cormorant Garamond, serif'}}
          >
            <span>←</span>
            <span>Back to Stars</span>
          </button>

          <div id="letter-container" className="flex items-start justify-center min-h-screen p-8 pt-20 overflow-y-auto max-h-screen">
            <div className="bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl border border-pink-400/20 shadow-2xl shadow-purple-500/20 p-12 max-w-4xl w-full my-auto mt-8">
              <div className="text-center mb-8">
                <h1 className="text-5xl text-white mb-4" style={{fontFamily: 'Dancing Script, cursive', fontWeight: 600}}>
                  A Love Letter Written in Starlight
                </h1>
                <div className="w-32 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto"></div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-purple-100 leading-relaxed whitespace-pre-line text-lg"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif', 
                    fontWeight: 400, 
                    lineHeight: '1.8'
                  }}
                >
                  {letterText}
                  <span className="animate-pulse">|</span>
                </div>
              </div>

              {letterText.length >= fullLetterText.length && (
                <div className="text-center">
                  <div className="flex justify-center gap-3 mt-8">
                    {[...Array(7)].map((_, i) => (
                      <Heart 
                        key={i} 
                        className="w-6 h-6 text-pink-400 fill-current animate-pulse" 
                        style={{animationDelay: `${i * 300}ms`}} 
                      />
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <button
                      onClick={() => setShow3DScene(true)}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-red-500/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto cursor-pointer"
                      style={{fontFamily: 'Playfair Display, serif'}}
                    >
                      <span>See how hard I fell for you</span>
                      <div className="animate-bounce">💕</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {show3DScene && (
        <div className="fixed inset-0 bg-gradient-to-b from-blue-950 via-purple-950 to-black overflow-hidden" style={{zIndex: 9999}}>
          <button
            onClick={() => {
              setShow3DScene(false);
              setCarPosition(0);
              setShowCrashCard(false);
            }}
            className="absolute top-8 left-8 bg-black/40 backdrop-blur-sm text-white/90 hover:text-white hover:bg-black/60 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 border border-white/20 flex items-center gap-2"
            style={{fontFamily: 'Cormorant Garamond, serif', zIndex: 10000}}
          >
            <span>←</span>
            <span>Back</span>
          </button>

          <div className="flex items-center justify-center min-h-screen relative">
            {/* Road */}
            <div className="absolute bottom-1/3 left-0 right-0 h-24 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 transform perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-yellow-400 opacity-60"></div>
              </div>
              {/* Road markings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-8 w-full justify-center">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-8 h-1 bg-yellow-300 opacity-40"></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute left-16 top-1/2 transform -translate-y-1/2 text-center">
              <div className="text-6xl mb-2">💙</div>
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-blue-400/30">
                <p className="text-blue-200 font-semibold" style={{fontFamily: 'Dancing Script, cursive'}}>
                  My Heart
                </p>
              </div>
            </div>

            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 text-center">
              <div className="text-6xl mb-2">💖</div>
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-pink-400/30">
                <p className="text-pink-200 font-semibold" style={{fontFamily: 'Dancing Script, cursive'}}>
                  Your Heart
                </p>
              </div>
            </div>

            <div 
              className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-100 z-10"
              style={{
                left: `${10 + (carPosition * 0.7)}%`,
                transform: `translateY(-50%) scale(${1 + carPosition * 0.01}) scaleX(-1)`
              }}
            >
              <div className="text-6xl filter drop-shadow-lg">🚗</div>
              {/* Car trail effect */}
              {carPosition > 20 && (
                <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-1 bg-blue-400 rounded opacity-60 animate-pulse"
                        style={{animationDelay: `${i * 100}ms`}}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {carPosition >= 90 && (
              <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
                <div className="text-6xl animate-bounce">💥</div>
              </div>
            )}
          </div>

          {showCrashCard && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4" style={{zIndex: 10001}}>
              <div className="bg-gradient-to-br from-red-900/95 via-pink-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl border border-red-400/20 shadow-2xl shadow-red-500/30 p-12 max-w-lg w-full text-center">
                <div className="text-8xl mb-6">💕</div>
                <h2 className="text-4xl text-white mb-4" style={{fontFamily: 'Playfair Display, serif', fontStyle: 'italic'}}>
                  CRASH!
                </h2>
                <p className="text-xl text-pink-100 leading-relaxed mb-6" style={{fontFamily: 'Cormorant Garamond, serif', lineHeight: '1.6'}}>
                  This is exactly how hard I fell in love with you 🫶🏼 completely, recklessly, and beautifully out of control.
                </p>
                <p className="text-lg text-red-200 mb-6" style={{fontFamily: 'Dancing Script, cursive'}}>
                  No brakes, no looking back, just pure love and no refunds
                </p>
                
                <button
                  onClick={() => {
                    setShow3DScene(false);
                    setCarPosition(0);
                    setShowCrashCard(false);
                    setShowGiftBox(true);
                  }}
                  className="bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{fontFamily: 'Playfair Display, serif'}}
                >
                  One last thing ... 🌹
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showGiftBox && (
        <div className="fixed inset-0 bg-gradient-to-b from-purple-950 via-pink-950 to-black overflow-hidden" style={{zIndex: 9999}}>
          <button
            onClick={() => {
              setShowGiftBox(false);
              setBoxOpened(false);
              setShowCard(false);
            }}
            className="absolute top-8 left-8 bg-black/40 backdrop-blur-sm text-white/90 hover:text-white hover:bg-black/60 px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105 border border-white/20 flex items-center gap-2"
            style={{fontFamily: 'Cormorant Garamond, serif', zIndex: 10000}}
          >
            <span>←</span>
            <span>Back</span>
          </button>

          <div className="flex items-center justify-center min-h-screen">
            <div className="relative">
              <div className="relative">
                <div 
                  className={`w-32 h-32 rounded-lg shadow-2xl transition-all duration-1000 ${
                    boxOpened ? 'transform scale-110' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(45deg, #dc2626, #991b1b)',
                    boxShadow: '0 20px 40px rgba(220, 38, 38, 0.4)'
                  }}
                >
                  <div className="absolute top-1/2 left-0 right-0 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 transform -translate-y-1/2"></div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-6 bg-gradient-to-b from-yellow-400 to-yellow-600 transform -translate-x-1/2"></div>
                </div>

                <div 
                  className={`absolute -top-2 left-0 w-32 h-8 rounded-t-lg transition-all duration-2000 shadow-lg ${
                    boxOpened ? 'transform -rotate-45 -translate-y-12 translate-x-8' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(45deg, #ef4444, #dc2626)',
                    transformOrigin: 'bottom left'
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-2xl">🎀</div>
                  </div>
                </div>

                {showCard && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white rounded-lg p-6 shadow-2xl border border-pink-200 transform rotate-3 hover:rotate-0 transition-all duration-300">
                      <div className="text-center">
                        <div className="text-4xl mb-2">💖</div>
                        <h3 className="text-2xl font-bold text-red-600 mb-2" style={{fontFamily: 'Dancing Script, cursive'}}>
                          I Love You
                        </h3>
                        <p className="text-gray-700 text-sm" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                          Forever & Always
                        </p>
                      </div>
                      
                      <div className="absolute -top-2 -right-2 text-xl animate-bounce">💕</div>
                      <div className="absolute -bottom-2 -left-2 text-lg animate-pulse">🌹</div>
                    </div>
                  </div>
                )}
              </div>

              {!boxOpened && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  <p className="text-pink-200 text-lg animate-pulse" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                    Opening your gift...
                  </p>
                </div>
              )}
            </div>
          </div>

          {showCard && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-pink-100 text-xl mb-4" style={{fontFamily: 'Playfair Display, serif', fontStyle: 'italic'}}>
                Happy Birthday, my love! 🎂
              </p>
              <p className="text-pink-200 text-sm" style={{fontFamily: 'Cormorant Garamond, serif'}}>
                Thank you for being the most amazing gift in my life ✨
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConstellationLoveMap;

