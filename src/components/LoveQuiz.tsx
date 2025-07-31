import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    question: "What's my favorite way to spend a lazy Sunday with you?",
    options: [
      "Binge-watching shows in pajamas",
      "Going on outdoor adventures", 
      "Cooking together and making a mess",
      "All of the above because every moment with you is perfect"
    ],
    correct: 3,
    explanation: "You know me so well! Every moment with you is my favorite 💕"
  },
  {
    question: "What always makes me smile, no matter what kind of day I'm having?",
    options: [
      "Your terrible dad jokes",
      "The way you sing off-key in the shower",
      "Your sleepy voice when you first wake up",
      "Everything about you"
    ],
    correct: 3,
    explanation: "Trick question! Everything about you lights up my world ✨"
  },
  {
    question: "What's our secret superpower as a couple?",
    options: [
      "Making each other laugh until we cry",
      "Finding the best food spots wherever we go",
      "Communicating with just a look",
      "All of these and more"
    ],
    correct: 3,
    explanation: "We're basically superheroes when we're together! 🦸‍♀️🦸‍♂️"
  }
];

const LoveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const createCelebrationHearts = () => {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.textContent = '💕';
      heart.className = 'fixed pointer-events-none z-50';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.top = '100vh';
      heart.style.fontSize = Math.random() * 30 + 20 + 'px';
      heart.style.animation = `floatingHearts ${3 + Math.random() * 2}s linear forwards`;
      heart.style.animationDelay = Math.random() * 1 + 's';
      document.body.appendChild(heart);

      setTimeout(() => {
        if (document.body.contains(heart)) {
          document.body.removeChild(heart);
        }
      }, 5000);
    }
  };

  if (quizCompleted) {
    createCelebrationHearts();
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 magical-gradient opacity-10"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="font-romantic text-5xl md:text-6xl text-center mb-4 text-primary">
          How Well Do You Know Me?
        </h2>
        <p className="font-elegant text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          A little quiz to see if you've been paying attention 😉💕
        </p>

        {!quizCompleted ? (
          <Card className="p-8 md:p-12 romantic-shadow bg-white/90 backdrop-blur-sm">
            {!showResult ? (
              <>
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-handwritten text-primary">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                    <span className="font-handwritten text-primary">Score: {score}</span>
                  </div>
                  <div className="w-full bg-love-blue/30 rounded-full h-2">
                    <div 
                      className="heart-gradient h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-elegant text-2xl md:text-3xl text-center mb-8 text-foreground">
                  {quizQuestions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="space-y-4 mb-8">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left font-handwritten text-lg rounded-xl transition-all duration-300 ${
                        selectedAnswer === index 
                          ? 'heart-gradient text-white heart-shadow' 
                          : 'bg-white hover:bg-love-pink/20 text-foreground border-2 border-love-pink/30'
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Submit Button */}
                {selectedAnswer !== null && (
                  <div className="text-center">
                    <Button
                      onClick={handleNextQuestion}
                      className="heart-gradient text-white px-8 py-3 font-handwritten text-lg rounded-full heart-shadow hover:scale-105 transition-bounce"
                    >
                      {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz 💕' : 'Next Question 💖'}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Result Display */
              <div className="text-center animate-bounce-in-heart">
                <div className="text-6xl mb-4">
                  {selectedAnswer === quizQuestions[currentQuestion].correct ? '🎉' : '💕'}
                </div>
                <h3 className="font-elegant text-3xl mb-4 text-primary">
                  {selectedAnswer === quizQuestions[currentQuestion].correct ? 'Correct!' : 'Close, but...'}
                </h3>
                <p className="font-handwritten text-xl text-foreground leading-relaxed">
                  {quizQuestions[currentQuestion].explanation}
                </p>
              </div>
            )}
          </Card>
        ) : (
          /* Quiz Completed */
          <Card className="p-8 md:p-12 romantic-shadow bg-white/90 backdrop-blur-sm text-center">
            <div className="text-8xl mb-6 animate-heart-pulse">🏆</div>
            <h3 className="font-romantic text-4xl md:text-5xl mb-4 text-primary">
              Quiz Complete!
            </h3>
            <p className="font-elegant text-2xl mb-6 text-foreground">
              You scored {score} out of {quizQuestions.length}
            </p>
            <div className="font-handwritten text-xl text-muted-foreground mb-8 leading-relaxed">
              {score === quizQuestions.length ? (
                "Perfect score! You really do know me inside and out. That's what makes us so special 💕"
              ) : score >= quizQuestions.length / 2 ? (
                "Not bad! You know me pretty well, but there's always more to discover about each other 😊"
              ) : (
                "We still have so much to learn about each other, and I can't wait for every discovery! 💖"
              )}
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={resetQuiz}
                className="heart-gradient text-white px-8 py-3 font-handwritten text-lg rounded-full heart-shadow hover:scale-105 transition-bounce mr-4"
              >
                Take Quiz Again 🔄
              </Button>
            </div>

            {/* Celebration elements */}
            <div className="mt-8 text-4xl animate-bounce">
              💕 🎉 💖 ✨ 🌟 💕
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default LoveQuiz;