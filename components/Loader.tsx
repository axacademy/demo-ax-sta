import React from 'react';

interface LoaderProps {
    message?: string;
    subMessage?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message, subMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-slate-300 font-semibold">
        {message || 'AI 컨설턴트가 전략을 분석 중입니다...'}
      </p>
      {subMessage && <p className="text-base text-slate-400">{subMessage}</p>}
    </div>
  );
};