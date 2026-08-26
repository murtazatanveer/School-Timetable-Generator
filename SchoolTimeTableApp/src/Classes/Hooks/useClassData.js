import { useMemo } from "react";

export const useClassData = (classesData) => {
  const totalClasses = useMemo(() => {
    return classesData.length;
  }, [classesData]);

  const totalSections = useMemo(() => {
    return classesData.reduce((acc, cls) => acc + cls.sections.length, 0);
  }, [classesData]);

  const totalSubjects = useMemo(() => {
    return classesData.reduce(
      (acc, cls) =>
        acc + cls.sections.reduce((s, sec) => s + sec.subjects.length, 0),
      0,
    );
  }, [classesData]);

  return {
    totalClasses,
    totalSections,
    totalSubjects,
  };
};
