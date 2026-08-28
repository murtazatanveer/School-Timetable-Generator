export const CLASSES = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
];

export const SECTIONS = ["A", "B", "C", "D"];

export const mockGetTeacher = (selectedClass, selectedSection) => {
  return {
    teacher: "Mr. Ahmed",
    subject: "Mathematics",
    startTime: "09:00 AM",
    endTime: "09:45 AM",
    className: selectedClass,
    section: selectedSection,
  };
};
