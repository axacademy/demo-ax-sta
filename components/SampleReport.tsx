
import React from 'react';
import { sampleCompanyProfile, sampleStrategy } from '../data/sampleData';
import { getDisplayableTechnologies } from '../utils/profileUtils';
import { formatStrategy } from '../utils/formatters';
import { PrintableReport } from './PrintableReport';
import { handlePrint } from '../utils/printUtils';

interface SampleReportProps {
  onBack: () => void;
}

const ReportSection: React.FC<{title: string; content: string;}> = ({title, content}) => (
    <section className="mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-6 mb-3 pb-2 border-b border-slate-700">{title}</h2>
        <div>{formatStrategy(content)}</div>
    </section>
);


export const SampleReport: React.FC<SampleReportProps> = ({ onBack }) => {
  const profile = sampleCompanyProfile;
  const strategy = sampleStrategy;
  const displayedTechnologies = getDisplayableTechnologies(profile);
  const reportId = "printable-sample-report";

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              전략 리포트 결과 샘플
            </h1>
            <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
              AI 컨설턴트가 생성하는 최종 결과물의 예시입니다.
            </p>
          </header>

          <main className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6 sm:p-8">
              <section className="mb-8 p-4 border border-slate-600 rounded-lg bg-slate-900/30">
                  <h2 className="text-2xl font-bold text-cyan-400 border-b border-slate-700 pb-2 mb-4">입력된 회사 현황 (Sample)</h2>
                  <ul className="space-y-2 text-md sm:text-lg text-slate-300">
                      <li><strong className="font-semibold text-slate-100 w-48 inline-block">산업분야:</strong> {profile.industry}</li>
                      <li><strong className="font-semibold text-slate-100 w-48 inline-block">AI 전담 조직:</strong> {profile.hasTF ? '있음' : '없음'}</li>
                      <li><strong className="font-semibold text-slate-100 w-48 inline-block">AI 전문 인력:</strong> {profile.specialists}</li>
                      <li><strong className="font-semibold text-slate-100 w-48 inline-block">내부 교육 체계:</strong> {profile.hasTraining ? '있음' : '없음'}</li>
                      <li className="flex items-start"><strong className="font-semibold text-slate-100 w-48 inline-block flex-shrink-0">도입 기술:</strong> <span>{displayedTechnologies}</span></li>
                      <li className="flex items-start"><strong className="font-semibold text-slate-100 w-48 inline-block flex-shrink-0">핵심 목표/업무 영역:</strong> <span>{profile.priorityArea}</span></li>
                  </ul>
              </section>
              
              <ReportSection title="1. 현재 상태 진단" content={strategy.diagnosis} />
              <ReportSection title="2. AX전략수립" content={strategy.strategy} />
              <ReportSection title="3. AX실행로드맵" content={strategy.roadmap} />
              <ReportSection title="4. 최종 기획 결과" content={strategy.review} />
          </main>

          <div className="mt-8 flex justify-center items-center gap-x-4">
              <button 
                onClick={() => handlePrint('전략 리포트 결과 샘플', reportId)} 
                className="py-2 px-5 rounded-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500">
                PDF 저장
            </button>
            <button 
                onClick={onBack} 
                className="py-2 px-5 rounded-lg text-base font-medium text-white bg-slate-600 hover:bg-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500">
                시작 화면으로
            </button>
        </div>
        </div>
      </div>
      <PrintableReport profile={profile} strategy={strategy} reportId={reportId} />
    </>
  );
};
