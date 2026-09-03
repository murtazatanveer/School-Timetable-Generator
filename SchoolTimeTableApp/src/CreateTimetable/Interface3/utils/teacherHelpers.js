// teacherHelpers.js

// Get all unique subjects with their frequency (remaining class-sections)
export const getSubjectsWithFrequency = (
  classes,
  teachers,
  currentTeacherAssignments = [],
) => {
  const subjectFrequency = {};

  // Count all possible subject-class-section combinations
  classes.forEach((cls) => {
    cls.sections.forEach((section) => {
      cls.subjects.forEach((subject) => {
        const key = `${subject}`;
        if (!subjectFrequency[key]) {
          subjectFrequency[key] = {
            subject,
            frequency: 0,
            availableClassSections: [],
          };
        }
        subjectFrequency[key].frequency++;
        subjectFrequency[key].availableClassSections.push({
          className: cls.name,
          section,
        });
      });
    });
  });

  // Subtract already assigned teachers
  teachers.forEach((teacher) => {
    teacher.assignments.forEach((assignment) => {
      if (subjectFrequency[assignment.subject]) {
        subjectFrequency[assignment.subject].frequency--;
        // Remove this class-section from available
        subjectFrequency[assignment.subject].availableClassSections =
          subjectFrequency[assignment.subject].availableClassSections.filter(
            (cs) =>
              !(
                cs.className === assignment.className &&
                cs.section === assignment.section
              ),
          );
      }
    });
  });

  // Subtract current teacher's assignments (not yet saved)
  currentTeacherAssignments.forEach((assignment) => {
    if (subjectFrequency[assignment.subject]) {
      subjectFrequency[assignment.subject].frequency--;
      // Remove this class-section from available
      subjectFrequency[assignment.subject].availableClassSections =
        subjectFrequency[assignment.subject].availableClassSections.filter(
          (cs) =>
            !(
              cs.className === assignment.className &&
              cs.section === assignment.section
            ),
        );
    }
  });

  // Return only subjects with frequency > 0
  return Object.values(subjectFrequency)
    .filter((item) => item.frequency > 0)
    .map((item) => ({
      subject: item.subject,
      frequency: item.frequency,
    }));
};

// Get classes that still need a teacher for a specific subject
export const getAvailableClassesForSubject = (
  classes,
  teachers,
  subject,
  currentTeacherAssignments = [],
) => {
  if (!subject) return [];

  // Get all classes that teach this subject
  const classesWithSubject = classes.filter((cls) =>
    cls.subjects.includes(subject),
  );

  // Get all assigned class-sections (from saved teachers + current teacher)
  const assignedClassSections = [];

  // From saved teachers
  teachers.forEach((teacher) => {
    teacher.assignments.forEach((assignment) => {
      if (assignment.subject === subject) {
        assignedClassSections.push(
          `${assignment.className}|${assignment.section}`,
        );
      }
    });
  });

  // From current teacher (unsaved assignments)
  currentTeacherAssignments.forEach((assignment) => {
    if (assignment.subject === subject) {
      assignedClassSections.push(
        `${assignment.className}|${assignment.section}`,
      );
    }
  });

  // For each class, check which sections still need a teacher
  const availableClasses = [];
  classesWithSubject.forEach((cls) => {
    cls.sections.forEach((section) => {
      const key = `${cls.name}|${section}`;
      if (!assignedClassSections.includes(key)) {
        if (!availableClasses.find((c) => c.name === cls.name)) {
          availableClasses.push({ name: cls.name });
        }
      }
    });
  });

  return availableClasses;
};

// Get sections that still need a teacher for a specific subject and class
export const getAvailableSectionsForClass = (
  classes,
  teachers,
  subject,
  className,
  currentTeacherAssignments = [],
) => {
  if (!subject || !className) return [];

  const selectedClass = classes.find((cls) => cls.name === className);
  if (!selectedClass) return [];

  // Get all assigned class-sections (from saved teachers + current teacher)
  const assignedClassSections = [];

  // From saved teachers
  teachers.forEach((teacher) => {
    teacher.assignments.forEach((assignment) => {
      if (
        assignment.subject === subject &&
        assignment.className === className
      ) {
        assignedClassSections.push(
          `${assignment.className}|${assignment.section}`,
        );
      }
    });
  });

  // From current teacher (unsaved assignments)
  currentTeacherAssignments.forEach((assignment) => {
    if (assignment.subject === subject && assignment.className === className) {
      assignedClassSections.push(
        `${assignment.className}|${assignment.section}`,
      );
    }
  });

  return selectedClass.sections.filter((section) => {
    const key = `${className}|${section}`;
    return !assignedClassSections.includes(key);
  });
};

// Check for clash (same subject + class + section already assigned to another teacher OR same teacher)
export const checkForClash = (
  teachers,
  newAssignment,
  currentTeacherId = null,
) => {
  if (
    !newAssignment.subject ||
    !newAssignment.className ||
    !newAssignment.section
  )
    return { isClash: false, clashWith: null };

  // Check against saved teachers
  for (const teacher of teachers) {
    // Skip if this is the same teacher being edited
    if (teacher.id === currentTeacherId) continue;

    const clash = teacher.assignments.some(
      (assignment) =>
        assignment.subject === newAssignment.subject &&
        assignment.className === newAssignment.className &&
        assignment.section === newAssignment.section,
    );

    if (clash) {
      return { isClash: true, clashWith: teacher.name };
    }
  }

  return { isClash: false, clashWith: null };
};

// Check for duplicate within the same teacher
export const checkForDuplicateInTeacher = (
  currentTeacherAssignments,
  newAssignment,
) => {
  if (
    !newAssignment.subject ||
    !newAssignment.className ||
    !newAssignment.section
  )
    return false;

  return currentTeacherAssignments.some(
    (assignment) =>
      assignment.subject === newAssignment.subject &&
      assignment.className === newAssignment.className &&
      assignment.section === newAssignment.section,
  );
};

// Get subject frequency count for display
export const getSubjectFrequency = (
  classes,
  teachers,
  subject,
  currentTeacherAssignments = [],
) => {
  if (!subject) return 0;

  let totalCount = 0;
  classes.forEach((cls) => {
    if (cls.subjects.includes(subject)) {
      totalCount += cls.sections.length;
    }
  });

  // Subtract assigned (from saved teachers)
  teachers.forEach((teacher) => {
    teacher.assignments.forEach((assignment) => {
      if (assignment.subject === subject) {
        totalCount--;
      }
    });
  });

  // Subtract assigned (from current teacher)
  currentTeacherAssignments.forEach((assignment) => {
    if (assignment.subject === subject) {
      totalCount--;
    }
  });

  return totalCount > 0 ? totalCount : 0;
};

// Validate teacher
export const validateTeacher = (teacherData) => {
  const errors = {};
  let isValid = true;

  if (!teacherData.name.trim()) {
    errors.teacherName = "Teacher name is required";
    isValid = false;
  }

  if (teacherData.assignments.length === 0) {
    errors.assignments = "Please add at least one assignment";
    isValid = false;
  }

  return { isValid, errors };
};
