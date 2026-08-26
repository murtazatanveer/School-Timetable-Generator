import { useMemo } from "react";

export const useTeacherTimetable = (teacherData) => {
  const days = useMemo(() => {
    return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  }, []);

  const slots = useMemo(() => {
    if (!teacherData?.timetable?.Monday) return [];
    return teacherData.timetable.Monday.map((_, index) => index);
  }, [teacherData]);

  const teacher = useMemo(() => {
    return teacherData;
  }, [teacherData]);

  return {
    days,
    slots,
    teacher,
  };
};
