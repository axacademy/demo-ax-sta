
import React from 'react';
import { sampleCompanyProfile, sampleStrategy } from '../data/sampleData';
import { InputForm } from './InputForm';
import { Stepper } from './Stepper';
import { formatStrategy } from '../utils/formatters';
import { ChartBarIcon } from './icons/ChartBarIcon';

interface ServiceSampleProps {
  onBack: () => void;
  onShowSampleReport: () => void;
}

const steps = [
  '회사 현황 입력',
  '현재 상태 진단',
  'AX전략수립',
  'AX실행로드맵',
  '최종 기획 결과'
];

export const ServiceSample: React.FC<ServiceSampleProps> = ({ onBack, onShowSampleReport }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4">
            <ChartBarIcon className="w-12 h-12 text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              AI 트랜스포메이션 전략 추진 서비스(예시)
            </h1>
          </div>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            AI 컨설턴트가 생성하는 진단 단계의 예시입니다. 전체 리포트가 궁금하시면 샘플 리포트를 확인해주세요.
          </p>
        </header>

        <main>
          <div>
            <Stepper steps={steps} currentStep={2} />
          </div>

          <div className="max-w-5xl mx-auto">
            <InputForm
              profile={sampleCompanyProfile}
              setProfile={() => {}}
              onSubmit={() => {}}
              isLoading={false}
              isDisabled={true}
            />
          </div>

          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">2단계: 현재 상태 진단 (Current State Diagnosis)</h2>
              <div className="min-h-[300px]">
                {formatStrategy(sampleStrategy.diagnosis)}
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-700/50 max-w-5xl mx-auto flex justify-center items-center gap-x-4">
              <button 
                onClick={onBack} 
                className="py-2 px-5 rounded-lg text-base font-medium text-white bg-slate-600 hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500">
                처음으로 돌아가기
              </button>
              <button 
                onClick={onShowSampleReport} 
                className="py-2 px-5 rounded-lg text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500">
                샘플 리포트 보기
              </button>
          </div>
        </main>
      </div>
    </div>
  );
};
