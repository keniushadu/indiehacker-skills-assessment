export const saveResults = (results: Record<string, number>) => {
  localStorage.setItem('developerSkillsResults', JSON.stringify(results));
};

export const getResults = (): Record<string, number> | null => {
  const results = localStorage.getItem('developerSkillsResults');
  return results ? JSON.parse(results) : null;
};

