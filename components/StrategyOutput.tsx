import React from 'react';
import type { ParsedStrategy, CompanyProfile } from '../types';
import { formatStrategy } from '../utils/formatters';
import { PrintableReport } from './PrintableReport';
import { handlePrint } from '../utils/printUtils';

interface StrategyOutputProps {
  strategy: ParsedStrategy;
  companyProfile: CompanyProfile;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onStartOver: () => void;
  onNextStep: () => void;
  isLoading: boolean;
}

const stepTitles: { [key: number]: string } = {
  2: "2단계: 현재 상태 진단 (Current State Diagnosis)",
  3: "3단계: AX전략수립 (AX Strategy)",
  4: "4단계: AX실행로드맵 (AX Roadmap & KPIs)",
  5: "5단계: 최종 기획 결과 (Final Plan & Review)",
};

export const StrategyOutput: React.FC<StrategyOutputProps> = ({ strategy, companyProfile, currentStep, setCurrentStep, onStartOver, onNextStep, isLoading }) => {
    
  let content = '';
  switch (currentStep) {
    case 2:
      content = strategy.diagnosis;
      break;
    case 3:
      content = strategy.strategy;
      break;
    case 4:
      content = strategy.roadmap;
      break;
    case 5:
      content = strategy.review;
      break;
    default:
      content = 'Invalid step.';
  }

  const handlePrev = () => {
    if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const reportId = "printable-final-report";

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{stepTitles[currentStep]}</h2>
            
            <div className="min-h-[300px] sm:min-h-[400px]">
              <div>{formatStrategy(content)}</div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center">
              {(currentStep > 2 && currentStep < 5) ? (
                  <button 
                      onClick={handlePrev} 
                      disabled={isLoading}
                      className="py-2 px-5 rounded-lg text-base font-medium text-white bg-slate-600 hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500 disabled:opacity-50 disabled:cursor-not-allowed">
                      이전 단계
                  </button>
              ) : (
                  <div /> // Placeholder to keep other buttons aligned
              )}
              
              {currentStep < 5 ? (
                  <button 
                      onClick={onNextStep} 
                      disabled={isLoading}
                      className="py-2 px-5 rounded-lg text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed">
                      {isLoading ? '분석 중...' : '다음 단계'}
                  </button>
              ) : (
                 <div className="w-full flex justify-center items-center gap-x-4">
                     <button 
                        onClick={() => handlePrint('AI Transformation Strategy Report', reportId)} 
                        className="py-2 px-5 rounded-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500">
                        PDF로 저장하기
                    </button>
                    <button 
                        onClick={onStartOver} 
                        className="py-2 px-5 rounded-lg text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500">
                        새로 시작하기
                    </button>
                </div>
              )}
            </div>
        </div>
      </div>
      {currentStep === 5 && (
        <PrintableReport profile={companyProfile} strategy={strategy} reportId={reportId} />
      )}
    </>
  );
};