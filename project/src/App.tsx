import React, { useState, useEffect } from 'react';
import { Calculator, GraduationCap, Smartphone, Download, Award, BookOpen } from 'lucide-react';
import GradeInput from './components/GradeInput';
import ResultCard from './components/ResultCard';
import { downloadPDF, downloadImage } from './utils/exportUtils';

function App() {
  const [grades, setGrades] = useState({
    S: 0,
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0
  });

  const [cgpa, setCgpa] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const gradePoints = {
    S: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5
  };

  const gradeColors = {
    S: 'bg-emerald-500',
    A: 'bg-blue-500',
    B: 'bg-indigo-500',
    C: 'bg-amber-500',
    D: 'bg-orange-500',
    E: 'bg-red-500'
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleGradeChange = (grade: keyof typeof grades, value: number) => {
    setGrades(prev => ({ ...prev, [grade]: value }));
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let totalSubjects = 0;

    Object.entries(grades).forEach(([grade, count]) => {
      totalPoints += gradePoints[grade as keyof typeof gradePoints] * count;
      totalSubjects += count;
    });

    if (totalSubjects > 0) {
      const calculatedCgpa = totalPoints / totalSubjects;
      setCgpa(calculatedCgpa);
      setTotalSubjects(totalSubjects);
      setShowResult(true);
    }
  };

  const resetForm = () => {
    setGrades({
      S: 0,
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0
    });
    setCgpa(0);
    setTotalSubjects(0);
    setShowResult(false);
  };

  const handleDownloadPDF = () => {
    downloadPDF(cgpa, totalSubjects, grades);
  };

  const handleDownloadImage = () => {
    downloadImage('export-content');
  };

  const installPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          setIsInstallable(false);
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 font-['Inter'] relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400/20 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/20 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-indigo-400/20 rotate-12 animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-emerald-400/20 rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
          <div className="relative container mx-auto px-4 py-12">
            <div className="text-center max-w-3xl mx-auto">
              {/* University Logo and Title */}
              <div className="flex justify-center mb-6">
                <img
                  src="/logo.png"
                  alt="SIMATS Logo"
                  className="h-14 w-auto object-contain rounded"
                />
              </div>



              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 mb-3 tracking-tight">

              </h1>

              <div className="flex items-center justify-center space-x-2 mb-4">
                <Award className="text-amber-400" size={20} />
                <p className="text-lg md:text-xl text-gray-300 font-light">
                  Academic Excellence Calculator
                </p>
                <Award className="text-amber-400" size={20} />
              </div>

              <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed mb-6">
                Calculate your Cumulative Grade Point Average with precision and export professional academic reports
              </p>

              {/* PWA Install Button */}
              {isInstallable && (
                <div className="flex justify-center mb-6">
                  <button
                    onClick={installPWA}
                    className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <div className="relative flex items-center space-x-3">
                      <Smartphone size={18} />
                      <span>Install Mobile App</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Academic Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <BookOpen className="text-blue-400 mx-auto mb-2" size={24} />
                  <div className="text-lg font-bold text-white mb-1">Grade System</div>
                  <div className="text-gray-400 text-sm">S, A, B, C, D, E</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <Calculator className="text-purple-400 mx-auto mb-2" size={24} />
                  <div className="text-lg font-bold text-white mb-1">Precision</div>
                  <div className="text-gray-400 text-sm">Accurate CGPA</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <Download className="text-emerald-400 mx-auto mb-2" size={24} />
                  <div className="text-lg font-bold text-white mb-1">Export</div>
                  <div className="text-gray-400 text-sm">PDF & Image</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Calculator Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Input Section */}
              <div className="space-y-8">
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Calculator className="text-white" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Grade Input</h2>
                      <p className="text-gray-400 text-sm">Enter number of subjects for each grade</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(grades).map(([grade, value]) => (
                      <GradeInput
                        key={grade}
                        grade={grade}
                        points={gradePoints[grade as keyof typeof gradePoints]}
                        value={value}
                        onChange={(newValue) => handleGradeChange(grade as keyof typeof grades, newValue)}
                        color={gradeColors[grade as keyof typeof gradeColors]}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={calculateCGPA}
                    className="group relative flex-1 overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <div className="relative flex items-center justify-center space-x-2">
                      <Calculator size={20} />
                      <span className="text-lg">Calculate CGPA</span>
                    </div>
                  </button>

                  <button
                    onClick={resetForm}
                    className="flex-1 backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white font-semibold py-5 px-8 rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40"
                  >
                    Reset All
                  </button>
                </div>
              </div>

              {/* Result Section */}
              <div className="space-y-8">
                {showResult && (
                  <div className="transform transition-all duration-700 ease-out animate-in slide-in-from-right">
                    <ResultCard
                      cgpa={cgpa}
                      totalSubjects={totalSubjects}
                      onReset={resetForm}
                      onDownloadPDF={handleDownloadPDF}
                      onDownloadImage={handleDownloadImage}
                    />
                  </div>
                )}

                {!showResult && (
                  <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-16 border border-white/10 text-center shadow-2xl">
                    <div className="text-gray-400 mb-6">
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <Calculator size={48} className="opacity-50" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-4 text-white">Ready to Calculate</h3>
                      <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                        Enter your grades and click "Calculate CGPA" to generate your academic performance report
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-purple-900/50 to-indigo-900/50 backdrop-blur-xl"></div>
          <div className="relative container mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <img
                  src="/logo2.png"
                  alt="SIMATS Logo"
                  className="h-8 w-auto object-contain"
                  style={{ filter: 'none' }}
                />
                <span className="text-gray-300 font-medium">SIMATS Engineering</span>
              </div>

              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Designed by{' '}
                <a
                  href="https://jayanth.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium hover:underline"
                >
                  Donavalli Jayanth
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;