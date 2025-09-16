
import React from 'react';
import type { CompanyProfile } from '../types';
import { TECHNOLOGIES } from '../types';

interface InputFormProps {
  profile: CompanyProfile;
  setProfile: React.Dispatch<React.SetStateAction<CompanyProfile>>;
  onSubmit: () => void;
  isLoading: boolean;
  isDisabled?: boolean;
}

const RadioGroup = ({ label, value, onChange, name, disabled }: { label: string; value: boolean | null; onChange: (val: boolean) => void; name: string, disabled: boolean }) => (
    <div>
        <label className="block text-base font-medium text-slate-300 mb-2">{label}</label>
        <div className="flex items-center gap-x-4">
            <div className="flex items-center">
                <input
                    id={`${name}-yes`}
                    name={name}
                    type="radio"
                    checked={value === true}
                    onChange={() => onChange(true)}
                    disabled={disabled}
                    className="h-4 w-4 border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-600 disabled:opacity-50"
                />
                <label htmlFor={`${name}-yes`} className="ml-2 block text-base text-slate-200">
                    있음 (Yes)
                </label>
            </div>
            <div className="flex items-center">
                <input
                    id={`${name}-no`}
                    name={name}
                    type="radio"
                    checked={value === false}
                    onChange={() => onChange(false)}
                    disabled={disabled}
                    className="h-4 w-4 border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-600 disabled:opacity-50"
                />
                <label htmlFor={`${name}-no`} className="ml-2 block text-base text-slate-200">
                    없음 (No)
                </label>
            </div>
        </div>
    </div>
);

const INDUSTRIES = [
  '제조 (Manufacturing)',
  '금융 (Finance & Insurance)',
  '의료/헬스케어 (Healthcare)',
  '유통/소매 (Retail & E-commerce)',
  'IT/소프트웨어 (IT & Software)',
  '미디어/엔터테인먼트 (Media & Entertainment)',
  '교육 (Education)',
  '공공/국방 (Public Sector & Defense)',
  '에너지/자원 (Energy & Resources)',
  '건설/부동산 (Construction & Real Estate)',
  '기타 (Other)',
];

export const InputForm: React.FC<InputFormProps> = ({ profile, setProfile, onSubmit, isLoading, isDisabled = false }) => {

  const handleTechnologyChange = (tech: string) => {
    setProfile(prev => {
      const newTech = prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech];
      
      const newOtherTech = newTech.includes('기타 (Other)') ? prev.otherTechnologies : '';

      return { ...prev, technologies: newTech, otherTechnologies: newOtherTech };
    });
  };

  const isOtherChecked = profile.technologies.includes('기타 (Other)');
  const isFormValid = profile.industry.trim() !== '' && profile.hasTF !== null && profile.specialists.trim() !== '' && profile.hasTraining !== null && profile.priorityArea.trim() !== '';

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6 sticky top-8">
      <h2 className="text-2xl font-bold text-white mb-6">1단계: 회사 현황 입력 (Company Profile)</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
        
        <fieldset className="p-4 border border-slate-700 rounded-md">
            <legend className="text-lg font-semibold text-cyan-400 px-2">산업분야 (Industry)</legend>
            <div className="mt-2">
                <label htmlFor="industry" className="sr-only">산업분야 (Industry)</label>
                <select
                    id="industry"
                    name="industry"
                    value={profile.industry}
                    onChange={(e) => setProfile(p => ({ ...p, industry: e.target.value }))}
                    disabled={isDisabled}
                    className="block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="">산업분야를 선택해주세요</option>
                    {INDUSTRIES.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                </select>
            </div>
        </fieldset>

        <fieldset className="p-4 border border-slate-700 rounded-md">
          <legend className="text-lg font-semibold text-cyan-400 px-2">조직 및 인력 (Organization & People)</legend>
          <div className="space-y-4 mt-2">
            <RadioGroup label="AI 전담 조직 (Task Force)" name="tf" value={profile.hasTF} onChange={(val) => setProfile(p => ({ ...p, hasTF: val }))} disabled={isDisabled} />
            <div>
              <label htmlFor="specialists" className="block text-base font-medium text-slate-300">AI 전문 인력 (Specialists)</label>
              <input
                type="text"
                name="specialists"
                id="specialists"
                value={profile.specialists}
                onChange={(e) => setProfile(p => ({ ...p, specialists: e.target.value }))}
                disabled={isDisabled}
                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="예: 1~2명, 외주 의존"
              />
            </div>
            <RadioGroup label="내부 교육 체계 (Internal Training)" name="training" value={profile.hasTraining} onChange={(val) => setProfile(p => ({ ...p, hasTraining: val }))} disabled={isDisabled} />
          </div>
        </fieldset>

        <fieldset className="p-4 border border-slate-700 rounded-md">
          <legend className="text-lg font-semibold text-cyan-400 px-2">기술 (Technology)</legend>
           <div className="mt-2 space-y-2">
              <label className="block text-base font-medium text-slate-300 mb-2">현재 도입/활용 중인 기술 (체크)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                {TECHNOLOGIES.map(tech => (
                    <div key={tech} className="relative flex items-start">
                        <div className="flex h-6 items-center">
                            <input
                                id={tech}
                                name="technologies"
                                type="checkbox"
                                checked={profile.technologies.includes(tech)}
                                onChange={() => handleTechnologyChange(tech)}
                                disabled={isDisabled}
                                className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                        </div>
                        <div className="ml-3 text-base leading-6">
                            <label htmlFor={tech} className="font-medium text-slate-200">{tech}</label>
                        </div>
                    </div>
                ))}
              </div>
              {isOtherChecked && (
                <div className="mt-4">
                  <label htmlFor="otherTechnologies" className="block text-base font-medium text-slate-300 sr-only">
                    기타 기술명
                  </label>
                  <input
                    type="text"
                    name="otherTechnologies"
                    id="otherTechnologies"
                    value={profile.otherTechnologies}
                    onChange={(e) => setProfile(p => ({ ...p, otherTechnologies: e.target.value }))}
                    disabled={isDisabled}
                    className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="기타 기술명을 입력해주세요. (예: Quantum AI)"
                    aria-label="기타 기술명"
                  />
                </div>
              )}
           </div>
        </fieldset>

        <fieldset className="p-4 border border-slate-700 rounded-md">
          <legend className="text-lg font-semibold text-cyan-400 px-2">핵심 목표 (Business Goal)</legend>
          <div className="mt-2">
            <label htmlFor="priorityArea" className="block text-base font-medium text-slate-300">가장 중요한 목표 또는 업무 영역</label>
            <textarea
              id="priorityArea"
              name="priorityArea"
              rows={3}
              value={profile.priorityArea}
              onChange={(e) => setProfile(p => ({ ...p, priorityArea: e.target.value }))}
              disabled={isDisabled}
              className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="예: 마케팅 ROI 개선, 생산 공정 불량률 감소"
            />
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isLoading || !isFormValid || isDisabled}
          className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              진단 중...
            </>
          ) : '진단 시작하기'}
        </button>
        {!isFormValid && !isDisabled && <p className="text-sm text-center text-slate-400 mt-2">모든 필드를 입력해주세요.</p>}
        {isDisabled && <p className="text-sm text-center text-slate-400 mt-2">이것은 샘플 화면입니다. 입력은 비활성화되어 있습니다.</p>}
      </form>
    </div>
  );
};
