import React from 'react';
import type { CompanyProfile, ParsedStrategy } from '../types';
import { getDisplayableTechnologies } from '../utils/profileUtils';
import { formatStrategy } from '../utils/formatters';

interface PrintableReportProps {
  profile: CompanyProfile;
  strategy: ParsedStrategy;
  reportId: string;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ profile, strategy, reportId }) => {
    const displayedTechnologies = getDisplayableTechnologies(profile);
    
    return (
        <div id={reportId} style={{ display: 'none' }}>
            <h1>AI Transformation Strategy Report</h1>
            <p style={{textAlign: 'center', marginTop: '-16px', marginBottom: '32px'}}>Generated on: {new Date().toLocaleDateString()}</p>

            <section className="profile-section">
                <h2>입력된 회사 현황 (Company Profile)</h2>
                <ul>
                    <li><strong>산업분야:</strong> {profile.industry}</li>
                    <li><strong>AI 전담 조직:</strong> {profile.hasTF ? '있음' : '없음'}</li>
                    <li><strong>AI 전문 인력:</strong> {profile.specialists}</li>
                    <li><strong>내부 교육 체계:</strong> {profile.hasTraining ? '있음' : '없음'}</li>
                    <li><strong>도입 기술:</strong> {displayedTechnologies}</li>
                    <li><strong>핵심 목표/업무 영역:</strong> {profile.priorityArea}</li>
                </ul>
            </section>

            <section>
                <h2>1. 현재 상태 진단</h2>
                <div>{formatStrategy(strategy.diagnosis, true)}</div>
            </section>
            <section className="page-break">
                <h2>2. AX전략수립</h2>
                <div>{formatStrategy(strategy.strategy, true)}</div>
            </section>
            <section className="page-break">
                <h2>3. AX실행로드맵</h2>
                <div>{formatStrategy(strategy.roadmap, true)}</div>
            </section>
            <section className="page-break">
                <h2>4. 최종 기획 결과</h2>
                <div>{formatStrategy(strategy.review, true)}</div>
            </section>
        </div>
    );
};