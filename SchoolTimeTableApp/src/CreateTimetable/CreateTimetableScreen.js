import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../Theme/colors";

const CreateTimetableScreen = ({ navigation }) => {
  // State for Schedule
  const [schedule, setSchedule] = useState({
    workingDays: "",
    slotsPerDay: "",
    breakAfterSlot: "",
    slotDuration: "45",
    firstSlotTime: "08:00 AM",
  });

  // State for Classes
  const [classes, setClasses] = useState([{ id: 1, name: "", subjects: [] }]);
  const [newSubject, setNewSubject] = useState("");

  // State for Teachers
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "",
      subjects: [{ id: 1, name: "", section: "" }],
    },
  ]);
  const [teacherSubjectName, setTeacherSubjectName] = useState("");
  const [teacherSubjectSection, setTeacherSubjectSection] = useState("");

  // State for Subject Assignments (Class-wise)
  const [classSubjects, setClassSubjects] = useState([
    { id: 1, className: "", subjects: [] },
  ]);
  const [classSubjectName, setClassSubjectName] = useState("");

  // Validation states
  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState({
    schedule: false,
    classes: false,
    teachers: false,
    subjects: false,
  });

  // Schedule Handlers
  const handleScheduleChange = (field, value) => {
    setSchedule({ ...schedule, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
    const {
      workingDays,
      slotsPerDay,
      breakAfterSlot,
      slotDuration,
      firstSlotTime,
    } = {
      ...schedule,
      [field]: value,
    };
    if (
      workingDays &&
      slotsPerDay &&
      breakAfterSlot &&
      slotDuration &&
      firstSlotTime
    ) {
      setCompletedSections({ ...completedSections, schedule: true });
    } else {
      setCompletedSections({ ...completedSections, schedule: false });
    }
  };

  // Class Handlers (for Class & Section Overview)
  const addClass = () => {
    const newId =
      classes.length > 0 ? Math.max(...classes.map((c) => c.id)) + 1 : 1;
    setClasses([...classes, { id: newId, name: "", subjects: [] }]);
    setCompletedSections({ ...completedSections, classes: false });
  };

  const removeClass = (id) => {
    if (classes.length > 1) {
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  const updateClass = (id, name) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, name } : c)));
    const allHaveNames = classes.every((c) => c.name.trim() !== "");
    if (classes.length > 0 && allHaveNames) {
      setCompletedSections({ ...completedSections, classes: true });
    } else {
      setCompletedSections({ ...completedSections, classes: false });
    }
  };

  const addClassSubject = (id) => {
    if (newSubject.trim()) {
      setClasses(
        classes.map((c) =>
          c.id === id
            ? { ...c, subjects: [...c.subjects, newSubject.trim()] }
            : c,
        ),
      );
      setNewSubject("");
    }
  };

  const removeClassSubject = (classId, subjectIndex) => {
    setClasses(
      classes.map((c) =>
        c.id === classId
          ? {
              ...c,
              subjects: c.subjects.filter((_, i) => i !== subjectIndex),
            }
          : c,
      ),
    );
  };

  // Teacher Handlers
  const addTeacher = () => {
    const newId =
      teachers.length > 0 ? Math.max(...teachers.map((t) => t.id)) + 1 : 1;
    setTeachers([
      ...teachers,
      {
        id: newId,
        name: "",
        subjects: [{ id: 1, name: "", section: "" }],
      },
    ]);
    setCompletedSections({ ...completedSections, teachers: false });
  };

  const removeTeacher = (id) => {
    if (teachers.length > 1) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  const updateTeacher = (id, name) => {
    setTeachers(teachers.map((t) => (t.id === id ? { ...t, name } : t)));
    const allHaveNames = teachers.every((t) => t.name.trim() !== "");
    if (teachers.length > 0 && allHaveNames) {
      setCompletedSections({ ...completedSections, teachers: true });
    } else {
      setCompletedSections({ ...completedSections, teachers: false });
    }
  };

  const addTeacherSubject = (teacherId) => {
    const newId =
      teachers
        .find((t) => t.id === teacherId)
        ?.subjects.reduce((max, s) => Math.max(max, s.id), 0) + 1 || 1;
    setTeachers(
      teachers.map((t) =>
        t.id === teacherId
          ? {
              ...t,
              subjects: [...t.subjects, { id: newId, name: "", section: "" }],
            }
          : t,
      ),
    );
  };

  const removeTeacherSubject = (teacherId, subjectId) => {
    setTeachers(
      teachers.map((t) =>
        t.id === teacherId
          ? {
              ...t,
              subjects: t.subjects.filter((s) => s.id !== subjectId),
            }
          : t,
      ),
    );
  };

  const updateTeacherSubject = (teacherId, subjectId, field, value) => {
    setTeachers(
      teachers.map((t) =>
        t.id === teacherId
          ? {
              ...t,
              subjects: t.subjects.map((s) =>
                s.id === subjectId ? { ...s, [field]: value } : s,
              ),
            }
          : t,
      ),
    );
  };

  // Class Subjects Handlers (Subject-wise)
  const addClassSubjectEntry = () => {
    const newId =
      classSubjects.length > 0
        ? Math.max(...classSubjects.map((c) => c.id)) + 1
        : 1;
    setClassSubjects([
      ...classSubjects,
      { id: newId, className: "", subjects: [] },
    ]);
    setCompletedSections({ ...completedSections, subjects: false });
  };

  const removeClassSubjectEntry = (id) => {
    if (classSubjects.length > 1) {
      setClassSubjects(classSubjects.filter((c) => c.id !== id));
    }
  };

  const updateClassSubjectEntry = (id, className) => {
    setClassSubjects(
      classSubjects.map((c) => (c.id === id ? { ...c, className } : c)),
    );
    const allHaveNames = classSubjects.every((c) => c.className.trim() !== "");
    if (classSubjects.length > 0 && allHaveNames) {
      setCompletedSections({ ...completedSections, subjects: true });
    } else {
      setCompletedSections({ ...completedSections, subjects: false });
    }
  };

  const addSubjectToClass = (id) => {
    if (classSubjectName.trim()) {
      setClassSubjects(
        classSubjects.map((c) =>
          c.id === id
            ? { ...c, subjects: [...c.subjects, classSubjectName.trim()] }
            : c,
        ),
      );
      setClassSubjectName("");
    }
  };

  const removeSubjectFromClass = (classId, subjectIndex) => {
    setClassSubjects(
      classSubjects.map((c) =>
        c.id === classId
          ? {
              ...c,
              subjects: c.subjects.filter((_, i) => i !== subjectIndex),
            }
          : c,
      ),
    );
  };

  // Validate and Generate
  const validateAndGenerate = () => {
    const newErrors = {};
    let isValid = true;

    if (!schedule.workingDays) {
      newErrors.workingDays = "Please enter the number of working days.";
      isValid = false;
    }
    if (!schedule.slotsPerDay) {
      newErrors.slotsPerDay = "Please enter the number of slots.";
      isValid = false;
    }
    if (!schedule.breakAfterSlot) {
      newErrors.breakAfterSlot = "Please specify the break slot.";
      isValid = false;
    }
    if (!schedule.slotDuration) {
      newErrors.slotDuration = "Please enter slot duration.";
      isValid = false;
    }
    if (!schedule.firstSlotTime) {
      newErrors.firstSlotTime = "Please enter a starting time.";
      isValid = false;
    }

    const emptyClasses = classes.filter((c) => c.name.trim() === "");
    if (emptyClasses.length > 0) {
      newErrors.classes = "Please enter all class names.";
      isValid = false;
    }

    const emptyTeachers = teachers.filter((t) => t.name.trim() === "");
    if (emptyTeachers.length > 0) {
      newErrors.teachers = "Please enter all teacher names.";
      isValid = false;
    }

    const emptyClassSubjects = classSubjects.filter(
      (c) => c.className.trim() === "",
    );
    if (emptyClassSubjects.length > 0) {
      newErrors.classSubjects = "Please enter all class names for subjects.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      Alert.alert(
        "Success!",
        "All data entered successfully. Generating timetable...",
        [
          {
            text: "View Timetable",
            onPress: () => navigation?.navigate("Timetable"),
          },
          { text: "OK", style: "cancel" },
        ],
      );
    }
  };

  // Render Time Slots Preview
  const renderTimeSlotsPreview = () => {
    const { firstSlotTime, slotDuration, slotsPerDay } = schedule;
    if (!firstSlotTime || !slotDuration || !slotsPerDay) return null;

    const slots = [];
    const [hours, minutes] = firstSlotTime.split(":");
    let currentHour = parseInt(hours);
    let currentMinute = parseInt(minutes.replace(" AM", "").replace(" PM", ""));
    const isPM = firstSlotTime.includes("PM");

    for (let i = 0; i < parseInt(slotsPerDay); i++) {
      const displayHour = currentHour > 12 ? currentHour - 12 : currentHour;
      const displayMinute = currentMinute.toString().padStart(2, "0");
      const ampm = currentHour >= 12 ? "PM" : "AM";
      slots.push(`${displayHour}:${displayMinute} ${ampm}`);

      currentMinute += parseInt(slotDuration);
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }

    return (
      <View style={styles.timePreviewContainer}>
        <Text style={styles.timePreviewTitle}>Time Slots Preview</Text>
        <View style={styles.timePreviewGrid}>
          {slots.map((time, index) => (
            <View key={index} style={styles.timeSlotItem}>
              <View style={styles.timeSlotNumber}>
                <Text style={styles.timeSlotNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.timeSlotText}>{time}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Timetable</Text>
            <Text style={styles.headerSubtitle}>
              Enter your school information to generate a timetable
            </Text>
          </View>

          {/* Section 1: Schedule */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons
                  name="calendar-outline"
                  size={22}
                  color={COLORS.primary}
                />
                <Text style={styles.sectionTitle}>School & Schedule</Text>
              </View>
              {completedSections.schedule && (
                <View style={styles.completedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={COLORS.success}
                  />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>

            <View style={styles.card}>
              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Working Days per Week</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.workingDays && styles.inputError,
                    ]}
                    placeholder="e.g., 5"
                    keyboardType="numeric"
                    value={schedule.workingDays}
                    onChangeText={(text) =>
                      handleScheduleChange("workingDays", text)
                    }
                  />
                  {errors.workingDays && (
                    <Text style={styles.errorText}>{errors.workingDays}</Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Slots per Day</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.slotsPerDay && styles.inputError,
                    ]}
                    placeholder="e.g., 8"
                    keyboardType="numeric"
                    value={schedule.slotsPerDay}
                    onChangeText={(text) =>
                      handleScheduleChange("slotsPerDay", text)
                    }
                  />
                  {errors.slotsPerDay && (
                    <Text style={styles.errorText}>{errors.slotsPerDay}</Text>
                  )}
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Break After Slot</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.breakAfterSlot && styles.inputError,
                    ]}
                    placeholder="e.g., 4"
                    keyboardType="numeric"
                    value={schedule.breakAfterSlot}
                    onChangeText={(text) =>
                      handleScheduleChange("breakAfterSlot", text)
                    }
                  />
                  {errors.breakAfterSlot && (
                    <Text style={styles.errorText}>
                      {errors.breakAfterSlot}
                    </Text>
                  )}
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Slot Duration (mins)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      errors.slotDuration && styles.inputError,
                    ]}
                    placeholder="e.g., 45"
                    keyboardType="numeric"
                    value={schedule.slotDuration}
                    onChangeText={(text) =>
                      handleScheduleChange("slotDuration", text)
                    }
                  />
                  {errors.slotDuration && (
                    <Text style={styles.errorText}>{errors.slotDuration}</Text>
                  )}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>First Slot Starting Time</Text>
                <TextInput
                  style={[
                    styles.input,
                    errors.firstSlotTime && styles.inputError,
                  ]}
                  placeholder="e.g., 08:00 AM"
                  value={schedule.firstSlotTime}
                  onChangeText={(text) =>
                    handleScheduleChange("firstSlotTime", text)
                  }
                />
                {errors.firstSlotTime && (
                  <Text style={styles.errorText}>{errors.firstSlotTime}</Text>
                )}
              </View>

              {renderTimeSlotsPreview()}
            </View>
          </View>

          {/* Section 2: Classes (Moved before Teachers) */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons
                  name="school-outline"
                  size={22}
                  color={COLORS.primary}
                />
                <Text style={styles.sectionTitle}>Classes</Text>
              </View>
              {completedSections.classes && (
                <View style={styles.completedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={COLORS.success}
                  />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>

            {classes.map((cls, index) => (
              <View key={cls.id} style={styles.card}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemNumber}>Class {index + 1}</Text>
                  {classes.length > 1 && (
                    <TouchableOpacity onPress={() => removeClass(cls.id)}>
                      <Ionicons
                        name="close-circle"
                        size={24}
                        color={COLORS.error}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <TextInput
                  style={[styles.input, errors.classes && styles.inputError]}
                  placeholder="Enter class name (e.g., Class 6)"
                  value={cls.name}
                  onChangeText={(text) => updateClass(cls.id, text)}
                />
                <View style={styles.chipContainer}>
                  {cls.subjects.map((subject, idx) => (
                    <View key={idx} style={styles.chip}>
                      <Text style={styles.chipText}>{subject}</Text>
                      <TouchableOpacity
                        onPress={() => removeClassSubject(cls.id, idx)}
                      >
                        <Ionicons
                          name="close"
                          size={16}
                          color={COLORS.textLight}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
                <View style={styles.addRow}>
                  <TextInput
                    style={[styles.inputSmall, styles.input]}
                    placeholder="Add subject for this class"
                    value={newSubject}
                    onChangeText={setNewSubject}
                  />
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addClassSubject(cls.id)}
                  >
                    <Ionicons name="add" size={24} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
                {errors.classes && (
                  <Text style={styles.errorText}>{errors.classes}</Text>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.addSectionButton}
              onPress={addClass}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.addSectionButtonText}>Add Class</Text>
            </TouchableOpacity>
          </View>

          {/* Section 3: Teachers (Moved after Classes) */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons
                  name="people-outline"
                  size={22}
                  color={COLORS.primary}
                />
                <Text style={styles.sectionTitle}>Teachers</Text>
              </View>
              {completedSections.teachers && (
                <View style={styles.completedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={COLORS.success}
                  />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>

            {teachers.map((teacher, index) => (
              <View key={teacher.id} style={styles.card}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemNumber}>Teacher {index + 1}</Text>
                  {teachers.length > 1 && (
                    <TouchableOpacity onPress={() => removeTeacher(teacher.id)}>
                      <Ionicons
                        name="close-circle"
                        size={24}
                        color={COLORS.error}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <TextInput
                  style={[styles.input, errors.teachers && styles.inputError]}
                  placeholder="Enter teacher name"
                  value={teacher.name}
                  onChangeText={(text) => updateTeacher(teacher.id, text)}
                />

                <View style={styles.teacherSubjectsContainer}>
                  <Text style={styles.subLabel}>Subjects Taught</Text>
                  {teacher.subjects.map((subject) => (
                    <View key={subject.id} style={styles.teacherSubjectRow}>
                      <View style={styles.teacherSubjectInputs}>
                        <TextInput
                          style={[styles.input, styles.teacherSubjectInput]}
                          placeholder="Subject name"
                          value={subject.name}
                          onChangeText={(text) =>
                            updateTeacherSubject(
                              teacher.id,
                              subject.id,
                              "name",
                              text,
                            )
                          }
                        />
                        <TextInput
                          style={[styles.input, styles.teacherSectionInput]}
                          placeholder="Section (e.g., 6A)"
                          value={subject.section}
                          onChangeText={(text) =>
                            updateTeacherSubject(
                              teacher.id,
                              subject.id,
                              "section",
                              text,
                            )
                          }
                        />
                      </View>
                      {teacher.subjects.length > 1 && (
                        <TouchableOpacity
                          style={styles.removeSubjectButton}
                          onPress={() =>
                            removeTeacherSubject(teacher.id, subject.id)
                          }
                        >
                          <Ionicons
                            name="close-circle"
                            size={20}
                            color={COLORS.error}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.addSubjectButton}
                  onPress={() => addTeacherSubject(teacher.id)}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text style={styles.addSubjectButtonText}>Add Subject</Text>
                </TouchableOpacity>
                {errors.teachers && (
                  <Text style={styles.errorText}>{errors.teachers}</Text>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.addSectionButton}
              onPress={addTeacher}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.addSectionButtonText}>Add Teacher</Text>
            </TouchableOpacity>
          </View>

          {/* Section 4: Subjects (Class-wise) */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons
                  name="book-outline"
                  size={22}
                  color={COLORS.primary}
                />
                <Text style={styles.sectionTitle}>Subjects by Class</Text>
              </View>
              {completedSections.subjects && (
                <View style={styles.completedBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={COLORS.success}
                  />
                  <Text style={styles.completedText}>Completed</Text>
                </View>
              )}
            </View>

            {classSubjects.map((item, index) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemNumber}>Class {index + 1}</Text>
                  {classSubjects.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeClassSubjectEntry(item.id)}
                    >
                      <Ionicons
                        name="close-circle"
                        size={24}
                        color={COLORS.error}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <TextInput
                  style={[
                    styles.input,
                    errors.classSubjects && styles.inputError,
                  ]}
                  placeholder="Enter class name (e.g., Class 6)"
                  value={item.className}
                  onChangeText={(text) =>
                    updateClassSubjectEntry(item.id, text)
                  }
                />

                <View style={styles.chipContainer}>
                  {item.subjects.map((subject, idx) => (
                    <View key={idx} style={[styles.chip, styles.subjectChip]}>
                      <Text style={styles.chipText}>{subject}</Text>
                      <TouchableOpacity
                        onPress={() => removeSubjectFromClass(item.id, idx)}
                      >
                        <Ionicons name="close" size={16} color={COLORS.white} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                <View style={styles.addRow}>
                  <TextInput
                    style={[styles.inputSmall, styles.input]}
                    placeholder="Add subject for this class"
                    value={classSubjectName}
                    onChangeText={setClassSubjectName}
                  />
                  <TouchableOpacity
                    style={[styles.addButton, styles.subjectAddButton]}
                    onPress={() => addSubjectToClass(item.id)}
                  >
                    <Ionicons name="add" size={24} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
                {errors.classSubjects && (
                  <Text style={styles.errorText}>{errors.classSubjects}</Text>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.addSectionButton}
              onPress={addClassSubjectEntry}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={COLORS.primary}
              />
              <Text style={styles.addSectionButtonText}>Add Class</Text>
            </TouchableOpacity>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={styles.generateButton}
            onPress={validateAndGenerate}
          >
            <Ionicons name="rocket-outline" size={24} color={COLORS.white} />
            <Text style={styles.generateButtonText}>Generate Timetable</Text>
          </TouchableOpacity>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.sizes.xxxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: {
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.success + "15",
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.md,
  },
  completedText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: 2,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    marginBottom: 4,
  },
  input: {
    height: 46,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.backgroundLight,
  },
  inputSmall: {
    flex: 1,
    height: 40,
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: "#FFF5F5",
  },
  errorText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.error,
    marginTop: 4,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  itemNumber: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  subjectAddButton: {
    backgroundColor: COLORS.primary,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryFade,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  subjectChip: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textPrimary,
  },
  addSectionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  addSectionButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.primary,
    marginLeft: SPACING.xs,
  },
  // Teacher specific styles
  teacherSubjectsContainer: {
    marginTop: SPACING.xs,
  },
  teacherSubjectRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
    gap: SPACING.xs,
  },
  teacherSubjectInputs: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.xs,
  },
  teacherSubjectInput: {
    flex: 2,
    height: 40,
  },
  teacherSectionInput: {
    flex: 1,
    height: 40,
  },
  removeSubjectButton: {
    padding: 4,
  },
  addSubjectButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    paddingVertical: 4,
  },
  addSubjectButtonText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
    marginLeft: 4,
  },
  timePreviewContainer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  timePreviewTitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  timePreviewGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  timeSlotItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
    gap: 4,
  },
  timeSlotNumber: {
    width: 20,
    height: 20,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  timeSlotNumberText: {
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.white,
  },
  timeSlotText: {
    fontSize: TYPOGRAPHY.sizes.xs,
    color: COLORS.textSecondary,
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    paddingVertical: SPACING.md,
    marginTop: SPACING.xl,
    ...SHADOWS.large,
    gap: SPACING.sm,
  },
  generateButtonText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  bottomSpacing: {
    height: SPACING.xxl,
  },
});

export default CreateTimetableScreen;
