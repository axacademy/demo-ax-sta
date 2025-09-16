import type { CompanyProfile } from '../types';

export const getDisplayableTechnologies = (profile: CompanyProfile): string => {
  const technologiesList = [
    ...profile.technologies.filter(t => t !== '기타 (Other)'),
    profile.otherTechnologies,
  ].filter(t => t && t.trim() !== '').join(', ');

  return technologiesList.length > 0 ? technologiesList : '없음 (None)';
};
