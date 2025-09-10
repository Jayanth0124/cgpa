import React from 'react';
import { Download, RotateCcw } from 'lucide-react';
import CircularProgress from './CircularProgress';

interface ResultCardProps {
  cgpa: number;
  totalSubjects: number;
  onReset: () => void;
  onDownloadPDF: () => void;
  onDownloadImage: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
  cgpa,
  totalSubjects,
  onReset,
  onDownloadPDF,
  onDownloadImage
}) => {
  const getGrade = (cgpa: number) => {
    if (cgpa >= 9.5) return { grade: 'O', color: 'text-green-400', desc: 'Outstanding' };
    if (cgpa >= 9.0) return { grade: 'A+', color: 'text-green-400', desc: 'Excellent' };
    if (cgpa >= 8.5) return { grade: 'A', color: 'text-blue-400', desc: 'Very Good' };
    if (cgpa >= 8.0) return { grade: 'B+', color: 'text-blue-400', desc: 'Good' };
    if (cgpa >= 7.5) return { grade: 'B', color: 'text-yellow-400', desc: 'Above Average' };
    if (cgpa >= 7.0) return { grade: 'C+', color: 'text-yellow-400', desc: 'Average' };
    if (cgpa >= 6.5) return { grade: 'C', color: 'text-orange-400', desc: 'Below Average' };
    if (cgpa >= 6.0) return { grade: 'D+', color: 'text-orange-400', desc: 'Marginal' };
    if (cgpa >= 5.5) return { grade: 'D', color: 'text-red-400', desc: 'Poor' };
    return { grade: 'F', color: 'text-red-400', desc: 'Fail' };
  };

  const gradeInfo = getGrade(cgpa);

  return (
    <div>
      <div id="export-content" className="backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-3">CGPA Result</h3>
          <div className="text-gray-400">Based on {totalSubjects} subjects</div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
          <CircularProgress 
            percentage={(cgpa / 10) * 100} 
            size={160} 
            strokeWidth={10} 
            label="CGPA Score"
            className="flex-shrink-0"
          />
          
          <div className="text-center lg:text-left">
            <div className="text-6xl font-bold text-white mb-4">
              {cgpa.toFixed(2)}
            </div>
            <div className={`text-2xl font-bold ${gradeInfo.color} mb-2`}>
              Grade: {gradeInfo.grade}
            </div>
            <div className="text-gray-400 text-lg">
              {gradeInfo.desc}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onDownloadPDF}
          className="group relative flex-1 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center justify-center space-x-2">
            <Download size={20} />
            <span>Download PDF</span>
          </div>
        </button>
        
        <button
          onClick={onDownloadImage}
          className="group relative flex-1 overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <div className="relative flex items-center justify-center space-x-2">
            <Download size={20} />
            <span>Download Image</span>
          </div>
        </button>
        
        <button
          onClick={onReset}
          className="flex-1 backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 border border-white/20 hover:border-white/40"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default ResultCard;