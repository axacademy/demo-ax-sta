import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-4 mb-8">
      <div className="flex">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300
                    ${isCompleted ? 'bg-cyan-600 text-white' : ''}
                    ${isCurrent ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/50' : ''}
                    ${!isCompleted && !isCurrent ? 'bg-slate-700 text-slate-400' : ''}
                  `}
                >
                  {stepNumber}
                </div>
                <p className={`text-sm mt-2 font-medium w-24 sm:w-32 
                  ${isCurrent ? 'text-cyan-400' : 'text-slate-500'}
                `}>
                  {step}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 self-start mt-4 sm:mt-5 transition-all duration-300 ${isCompleted ? 'bg-cyan-600' : 'bg-slate-700'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};