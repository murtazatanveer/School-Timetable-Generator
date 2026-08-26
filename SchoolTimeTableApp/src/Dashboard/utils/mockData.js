export const schoolConfig = {
  name: "Government High School",
  emisCode: "1234567",
  workingDays: 5,
  dailySlots: 8,
  breakAfterSlot: 4,
};

export const statistics = {
  totalTeachers: 24,
  totalClasses: 12,
  totalSections: 28,
  totalSubjects: 13,
};

export const classStructure = [
  { name: "Class 6", sections: 2 },
  { name: "Class 7", sections: 3 },
  { name: "Class 8", sections: 2 },
  { name: "Class 9", sections: 3 },
  { name: "Class 10", sections: 2 },
];

export const todaySchedule = [
  {
    id: "1",
    time: "08:00 AM",
    period: 1,
    isCurrent: false,
    entries: [
      {
        teacher: "Mr. Ahmed",
        subject: "Mathematics",
        className: "Class 6",
        section: "A",
      },
      {
        teacher: "Ms. Sara",
        subject: "English",
        className: "Class 8",
        section: "B",
      },
      {
        teacher: "Mr. Ali",
        subject: "Physics",
        className: "Class 10",
        section: "A",
      },
    ],
  },
  {
    id: "2",
    time: "09:00 AM",
    period: 2,
    isCurrent: true,
    entries: [
      {
        teacher: "Mr. Khalid",
        subject: "Chemistry",
        className: "Class 7",
        section: "A",
      },
      {
        teacher: "Ms. Fatima",
        subject: "Biology",
        className: "Class 9",
        section: "B",
      },
      {
        teacher: "Dr. Usman",
        subject: "Physics",
        className: "Class 11",
        section: "A",
      },
    ],
  },
  // ... more entries
];

export const allTeachers = [
  "Mr. Ahmed",
  "Ms. Sara",
  "Mr. Ali",
  "Ms. Fatima",
  "Dr. Usman",
  // ... more teachers
];

export const timetableStatus = {
  isGenerated: true,
  lastUpdated: "Today, 08:30 AM",
  weeklySlots: 40,
};

export const subjectColors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#F0A500",
  "#6C5CE7",
];
