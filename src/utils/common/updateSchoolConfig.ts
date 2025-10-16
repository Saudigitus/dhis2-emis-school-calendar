

export function updateSchoolConfig(original: SchoolConfig, updates: Partial<SchoolConfig>): SchoolConfig {
  return {
    ...original,
    ...updates,
  };
}
