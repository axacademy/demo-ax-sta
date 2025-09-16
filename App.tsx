
import React, { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { SampleReport } from './components/SampleReport';
import { ServiceSample } from './components/ServiceSample';

const App: React.FC = () => {
  const [view, setView] = useState<'intro' | 'sampleReport' | 'serviceSample'>('intro');

  const handleShowSampleReport = () => setView('sampleReport');
  const handleShowServiceSample = () => setView('serviceSample');
  const handleBackToIntro = () => setView('intro');

  if (view === 'serviceSample') {
    return <ServiceSample onBack={handleBackToIntro} onShowSampleReport={handleShowSampleReport} />;
  }

  if (view === 'sampleReport') {
    return <SampleReport onBack={handleBackToIntro} />;
  }

  return <IntroScreen onShowServiceSample={handleShowServiceSample} onShowSample={handleShowSampleReport} />;
};

export default App;
