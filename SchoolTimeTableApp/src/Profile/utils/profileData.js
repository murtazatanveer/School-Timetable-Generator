export const userData = {
  name: "Ahmed Khan",
  school: "Government High School",
  email: "ahmed.khan@school.edu",
  role: "Teacher",
  memberSince: "January 2024",
};

export const menuSections = [
  {
    id: "account",
    title: "Account & Security",
    items: [
      {
        id: "app-security",
        icon: "shield-checkmark-outline",
        title: "App & Security",
        description: "Manage app settings and security preferences",
        screen: "AppSecurity",
        destructive: false,
      },
    ],
  },
  {
    id: "theme",
    title: "Appearance",
    items: [
      {
        id: "theme",
        icon: "color-palette-outline",
        title: "Theme",
        description: "Switch between light and dark themes",
        screen: "Theme",
        destructive: false,
      },
    ],
  },
  {
    id: "timetable",
    title: "Timetable Management",
    items: [
      {
        id: "add-timetable",
        icon: "add-circle-outline",
        title: "Add New Timetable",
        description: "Create a new timetable for your school",
        screen: "DataEntry",
        destructive: false,
      },
      {
        id: "view-timetables",
        icon: "list-outline",
        title: "View All Timetables",
        description: "View all created timetables",
        screen: "ViewTimetables",
        destructive: false,
      },
    ],
  },
  {
    id: "users",
    title: "User Management",
    items: [
      {
        id: "add-user",
        icon: "person-add-outline",
        title: "Add New User",
        description: "Add a new teacher or admin to the system",
        screen: "AddUser",
        destructive: false,
      },
      {
        id: "view-users",
        icon: "people-outline",
        title: "View All Users",
        description: "View all registered users",
        screen: "ViewUsers",
        destructive: false,
      },
    ],
  },
];
