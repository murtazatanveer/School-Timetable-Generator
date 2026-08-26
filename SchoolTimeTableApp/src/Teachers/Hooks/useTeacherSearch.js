import { useMemo } from "react";

export const useTeacherSearch = (teachers, searchQuery) => {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return teachers;
    }
    return teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [teachers, searchQuery]);
};
