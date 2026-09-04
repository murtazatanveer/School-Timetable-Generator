import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../Theme/colors";
import { getInitials } from "./utils/helper";

import SubjectCard from "./SubjectCard";

const TeacherCard = ({ teacher }) => {
  const hasClassTeacher = teacher.classTeacher !== null;

  // Find the subject the class teacher teaches to their own class
  const getClassTeacherSubject = () => {
    if (!hasClassTeacher) return null;

    const classTeacherSubject = teacher.subjects.find(
      (subject) =>
        subject.className === teacher.classTeacher.className &&
        subject.section === teacher.classTeacher.section,
    );

    return classTeacherSubject ? classTeacherSubject.name : null;
  };

  const classTeacherSubject = getClassTeacherSubject();

  return (
    <View style={styles.teacherCard}>
      <View style={styles.teacherHeader}>
        <View style={styles.teacherAvatar}>
          <Text style={styles.teacherAvatarText}>
            {getInitials(teacher.name)}
          </Text>
        </View>
        <View style={styles.teacherInfo}>
          <Text style={styles.teacherName}>{teacher.name}</Text>
          <View style={styles.teacherStats}>
            <Ionicons name="book-outline" size={14} color={COLORS.textLight} />
            <Text style={styles.teacherStatsText}>
              {teacher.subjects.length} Subject
              {teacher.subjects.length > 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        {/* Timetable Icon - Positioned to the right of teacher name */}
        <TouchableOpacity style={styles.timetableIconContainer}>
          <Ionicons name="calendar-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.teacherDivider} />

      <View style={styles.subjectsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectsScrollContent}
        >
          {/* Class Teacher Card - Displayed first if exists */}
          {hasClassTeacher && (
            <View style={styles.subjectCardWrapper}>
              <SubjectCard
                name={classTeacherSubject}
                className={teacher.classTeacher.className}
                section={teacher.classTeacher.section}
                isClassTeacher={true}
              />
            </View>
          )}

          {/* Subject Cards */}
          {teacher.subjects.map((subject, index) => (
            <View key={index} style={styles.subjectCardWrapper}>
              <SubjectCard
                name={subject.name}
                className={subject.className}
                section={subject.section}
                isClassTeacher={false}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  teacherCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  teacherHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  teacherAvatar: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  teacherAvatarText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  teacherStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  teacherStatsText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textLight,
  },
  timetableIconContainer: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primaryFade,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary + "20",
    ...SHADOWS.small,
    marginLeft: SPACING.sm,
    flexShrink: 0,
  },
  teacherDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  subjectsContainer: {
    marginTop: 2,
  },
  subjectsScrollContent: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    gap: SPACING.sm,
  },
  subjectCardWrapper: {
    marginRight: SPACING.sm,
  },
});

export default TeacherCard;
