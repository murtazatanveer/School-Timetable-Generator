export const validateClass = (classData) => {
  const errors = {};
  let isValid = true;

  // Validate Class Name
  if (!classData.name.trim()) {
    errors.className = "Class name is required";
    isValid = false;
  }

  // Validate Subjects
  if (classData.subjects.length === 0) {
    errors.subjects = "Please add at least one subject";
    isValid = false;
  }

  // Validate Sections
  if (classData.sections.length === 0) {
    errors.sections = "Please add at least one section";
    isValid = false;
  }

  return { isValid, errors };
};

export const getSectionOptions = () => {
  return ["A", "B", "C", "D", "E", "F", "G"].map((section) => ({
    label: `Section ${section}`,
    value: section,
  }));
};
