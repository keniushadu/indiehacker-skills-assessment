export const saveResults = async (results: Record<string, number>): Promise<void> => {
  return new Promise((resolve) => {
    try {
      localStorage.setItem('developerSkillsResults', JSON.stringify(results));
      resolve();
    } catch (error) {
      console.error('Error saving results:', error);
      resolve();
    }
  });
};

export const getResults = (): Record<string, number> | null => {
  try {
    const results = localStorage.getItem('developerSkillsResults');
    return results ? JSON.parse(results) : null;
  } catch (error) {
    console.error('Error getting results:', error);
    return null;
  }
};

export const clearResults = (): Promise<void> => {
  return new Promise((resolve) => {
    try {
      localStorage.removeItem('developerSkillsResults');
      resolve();
    } catch (error) {
      console.error('Error clearing results:', error);
      resolve();
    }
  });
};
