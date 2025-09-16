import React from 'react';
import { NetworkNodeIcon } from './icons/NetworkNodeIcon';

interface IntroScreenProps {
  onShowServiceSample: () => void;
  onShowSample: () => void;
}

const deliverables = [
    { 
        title: '현재 상태 진단', 
        description: 'AI 준비도 및 역량 평가' 
    },
    { 
        title: 'AI트랜스포메이션 전략 수립', 
        description: '기업 맞춤형 혁신 전략 제안' 
    },
    { 
        title: '단계별 실행 로드맵', 
        description: '단기·중기·장기 실행 계획 제시' 
    },
    { 
        title: '핵심성과지표 분석', 
        description: '성과 추적 가능한 KPI 설계' 
    },
];

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);


export const IntroScreen: React.FC<IntroScreenProps> = ({ onShowServiceSample, onShowSample }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 relative overflow-x-hidden">
      {/* Background Glow Effect */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-[-20%] right-[-20%] w-[1000px] h-[1000px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 items-center gap-12 min-h-[calc(100vh-100px)]">
          <div className="text-center md:text-left">
            <p className="text-lg text-cyan-400">
              “AI컨설턴트가 회사현황에 맞는 AI트랜스포메이션 전략추진 보고서를 작성합니다.”
            </p>
            <h1 className="mt-4 text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              AI트랜스포메이션<br/>전략추진 서비스
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto md:mx-0 leading-loose">
              AI트랜스포메이션 전략수립부터, 단계별 실행 로드맵까지 전략추진 보고서 제공
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button
                onClick={onShowServiceSample}
                className="w-full sm:w-auto py-3 px-8 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all transform hover:scale-105"
              >
                AX전략추진 서비스 샘플보기
              </button>
              <button
                onClick={onShowSample}
                className="w-full sm:w-auto py-3 px-8 border border-slate-600 rounded-lg shadow-sm text-lg font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-all"
              >
                샘플 리포트 보기
              </button>
            </div>
             <div className="mt-6 text-center md:text-left">
                <a href="https://digitaltransformation.co.kr/ax-contact/" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center group">
                    AX전략추진 서비스 문의하기
                    <span aria-hidden="true" className="ml-1.5 transition-transform group-hover:translate-x-1">&rarr;</span>
                </a>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <NetworkNodeIcon className="w-full h-auto max-w-lg text-slate-700" />
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="py-20">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                    🚀 서비스 산출물
                </h2>
                <p className="mt-4 text-lg text-slate-400">
                    AI 컨설턴트는 다음과 같은 핵심적인 결과물을 통해 귀사의 성공적인 AI 도입을 지원합니다.
                </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {deliverables.map((item, index) => (
                    <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex items-start gap-4 transition-all duration-300 transform hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
                        <CheckIcon className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1"/>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-100">{item.title}</h3>
                            <p className="text-slate-400 mt-1 leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 text-center bg-slate-800/30 rounded-2xl my-12">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    지금, AI트랜스포메이션<br/>전략 추진 서비스를 받아보세요!
                </h2>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto leading-loose">
                  AI컨설턴트가 전략에서 실행까지 완성된 AI트랜스포메이션 전략추진 로드맵을 제공해드립니다
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    onClick={onShowServiceSample}
                    className="w-full sm:w-auto py-3 px-8 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-all transform hover:scale-105"
                >
                    AX전략추진 서비스 샘플보기
                </button>
                <button
                    onClick={onShowSample}
                    className="w-full sm:w-auto py-3 px-8 border border-slate-600 rounded-lg shadow-sm text-lg font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-all"
                >
                    샘플 리포트 보기
                </button>
                </div>
                <div className="mt-6">
                    <a href="https://digitaltransformation.co.kr/ax-contact/" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center group">
                        AX전략추진 서비스 문의하기
                        <span aria-hidden="true" className="ml-1.5 transition-transform group-hover:translate-x-1">&rarr;</span>
                    </a>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};