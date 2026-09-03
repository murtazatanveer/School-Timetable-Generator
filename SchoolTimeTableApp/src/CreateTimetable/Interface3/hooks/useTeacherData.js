import { useState, useEffect, useCallback, useRef } from "react";
import {
  validateTeacher,
  getSubjectsWithFrequency,
  getAvailableClassesForSubject,
  getAvailableSectionsForClass,
  checkForDuplicateInTeacher,
} from "../utils/teacherHelpers";

export const useTeacherData = (initialData, onNext) => {
  const [teachers, setTeachers] = useState(initialData.teachers || []);
  const [currentTeacher, setCurrentTeacher] = useState({
    id: null,
    name: "",
    assignments: [],
    newAssignment: {
      subject: "",
      className: "",
      section: "",
      isClassTeacher: false,
    },
  });
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // State for AppAlert
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    type: "info",
    title: "",
    message: "",
    details: null,
    confirmText: "Got It",
    onConfirm: null,
  });

  // Use refs to track latest state
  const teachersRef = useRef(teachers);
  teachersRef.current = teachers;

  const currentTeacherRef = useRef(currentTeacher);
  currentTeacherRef.current = currentTeacher;

  // Get class data from initial data
  const classData = initialData.classes || [];

  // State for dynamic options
  const [subjectsWithFrequency, setSubjectsWithFrequency] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);

  // Update subjects with frequency when teachers OR currentTeacher.assignments change
  useEffect(() => {
    const subjects = getSubjectsWithFrequency(
      classData,
      teachers,
      currentTeacher.assignments,
    );
    setSubjectsWithFrequency(subjects);
  }, [teachers, currentTeacher.assignments, classData]);

  // Update available classes when subject changes
  useEffect(() => {
    if (currentTeacher.newAssignment.subject) {
      const classes = getAvailableClassesForSubject(
        classData,
        teachers,
        currentTeacher.newAssignment.subject,
        currentTeacher.assignments,
      );
      setAvailableClasses(classes);
    } else {
      setAvailableClasses([]);
    }
  }, [
    currentTeacher.newAssignment.subject,
    teachers,
    currentTeacher.assignments,
    classData,
  ]);

  // Update available sections when class changes
  useEffect(() => {
    if (
      currentTeacher.newAssignment.subject &&
      currentTeacher.newAssignment.className
    ) {
      const sections = getAvailableSectionsForClass(
        classData,
        teachers,
        currentTeacher.newAssignment.subject,
        currentTeacher.newAssignment.className,
        currentTeacher.assignments,
      );
      setAvailableSections(sections);
    } else {
      setAvailableSections([]);
    }
  }, [
    currentTeacher.newAssignment.subject,
    currentTeacher.newAssignment.className,
    teachers,
    currentTeacher.assignments,
    classData,
  ]);

  // Validate form
  useEffect(() => {
    validateForm();
  }, [currentTeacher]);

  const validateForm = useCallback(() => {
    const { isValid, errors: newErrors } = validateTeacher(
      currentTeacherRef.current,
    );
    setErrors(newErrors);
    setIsFormValid(isValid);
    return isValid;
  }, []);

  // Show alert
  const showAlert = (
    type,
    title,
    message,
    details = null,
    confirmText = "Got It",
    onConfirm = null,
  ) => {
    setAlertConfig({
      visible: true,
      type,
      title,
      message,
      details,
      confirmText,
      onConfirm,
    });
  };

  // Hide alert
  const hideAlert = () => {
    setAlertConfig((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setCurrentTeacher((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  // Handle assignment field change
  const handleAssignmentChange = (field, value) => {
    setCurrentTeacher((prevState) => ({
      ...prevState,
      newAssignment: {
        ...prevState.newAssignment,
        [field]: value,
      },
    }));

    // Reset dependent fields
    if (field === "subject") {
      setCurrentTeacher((prevState) => ({
        ...prevState,
        newAssignment: {
          ...prevState.newAssignment,
          subject: value,
          className: "",
          section: "",
        },
      }));
      setAvailableClasses([]);
      setAvailableSections([]);
    }

    if (field === "className") {
      setCurrentTeacher((prevState) => ({
        ...prevState,
        newAssignment: {
          ...prevState.newAssignment,
          className: value,
          section: "",
        },
      }));
      setAvailableSections([]);
    }

    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  // Add assignment to current teacher
  const addAssignment = () => {
    const newAssignment = currentTeacher.newAssignment;

    if (!newAssignment.subject) {
      showAlert("warning", "Missing Subject", "Please select a subject");
      return;
    }
    if (!newAssignment.className) {
      showAlert("warning", "Missing Class", "Please select a class");
      return;
    }
    if (!newAssignment.section) {
      showAlert("warning", "Missing Section", "Please select a section");
      return;
    }

    // Check for duplicate within same teacher
    const isDuplicate = checkForDuplicateInTeacher(
      currentTeacher.assignments,
      newAssignment,
    );

    if (isDuplicate) {
      showAlert(
        "duplicate",
        "Duplicate Assignment",
        `This assignment already exists for this teacher.`,
        {
          subject: newAssignment.subject,
          className: newAssignment.className,
          section: newAssignment.section,
        },
      );
      return;
    }

    // Add assignment
    setCurrentTeacher((prevState) => ({
      ...prevState,
      assignments: [
        ...prevState.assignments,
        {
          subject: newAssignment.subject,
          className: newAssignment.className,
          section: newAssignment.section,
          isClassTeacher: newAssignment.isClassTeacher,
        },
      ],
      newAssignment: {
        subject: "",
        className: "",
        section: "",
        isClassTeacher: false,
      },
    }));

    if (errors.assignments) {
      setErrors((prevErrors) => ({ ...prevErrors, assignments: null }));
    }
  };

  // Remove assignment from current teacher
  const removeAssignment = (index) => {
    setCurrentTeacher((prevState) => ({
      ...prevState,
      assignments: prevState.assignments.filter((_, i) => i !== index),
    }));
  };

  // Add teacher
  const addTeacher = () => {
    const isValid = validateForm();

    if (!isValid) {
      if (!currentTeacher.name.trim()) {
        showAlert("warning", "Missing Name", "Please enter teacher name");
        return;
      }
      if (currentTeacher.assignments.length === 0) {
        showAlert(
          "warning",
          "Missing Assignments",
          "Please add at least one assignment",
        );
        return;
      }
      return;
    }

    const isDuplicate = teachers.some(
      (t) =>
        t.name.toLowerCase() === currentTeacher.name.trim().toLowerCase() &&
        t.id !== editingTeacherId,
    );

    if (isDuplicate) {
      showAlert(
        "error",
        "Duplicate Teacher",
        "A teacher with this name already exists",
      );
      return;
    }

    const newTeacher = {
      id: editingTeacherId || Date.now().toString(),
      name: currentTeacher.name.trim(),
      assignments: [...currentTeacher.assignments],
    };

    if (editingTeacherId) {
      setTeachers(
        teachers.map((t) => (t.id === editingTeacherId ? newTeacher : t)),
      );
      setEditingTeacherId(null);
    } else {
      setTeachers([...teachers, newTeacher]);
    }

    // Reset form
    resetForm();
    showAlert(
      "success",
      "Success",
      editingTeacherId
        ? "Teacher updated successfully!"
        : "Teacher added successfully!",
    );
  };

  // Edit teacher
  const editTeacher = (teacher) => {
    setEditingTeacherId(teacher.id);
    setCurrentTeacher({
      id: teacher.id,
      name: teacher.name,
      assignments: [...teacher.assignments],
      newAssignment: {
        subject: "",
        className: "",
        section: "",
        isClassTeacher: false,
      },
    });
    setErrors({});
  };

  // Remove teacher
  const removeTeacher = (id) => {
    const teacherToRemove = teachers.find((t) => t.id === id);
    // Use AppAlert for confirmation
    setAlertConfig({
      visible: true,
      type: "warning",
      title: "Remove Teacher",
      message: `Are you sure you want to remove "${teacherToRemove?.name}"?`,
      details: null,
      confirmText: "Remove",
      onConfirm: () => {
        setTeachers(teachers.filter((t) => t.id !== id));
        if (editingTeacherId === id) {
          resetForm();
        }
        showAlert("success", "Success", "Teacher removed successfully!");
      },
    });
  };

  // Reset form
  const resetForm = () => {
    setCurrentTeacher({
      id: null,
      name: "",
      assignments: [],
      newAssignment: {
        subject: "",
        className: "",
        section: "",
        isClassTeacher: false,
      },
    });
    setEditingTeacherId(null);
    setErrors({});
    setIsFormValid(false);
    setAvailableClasses([]);
    setAvailableSections([]);
    setAlertConfig({
      visible: false,
      type: "info",
      title: "",
      message: "",
      details: null,
      confirmText: "Got It",
      onConfirm: null,
    });
  };

  // Cancel edit
  const cancelEdit = () => {
    resetForm();
  };

  // Handle next
  const handleNext = () => {
    if (teachers.length === 0) {
      showAlert(
        "warning",
        "No Teachers",
        "Please add at least one teacher before proceeding",
      );
      return;
    }
    onNext({ teachers });
  };

  const isProceedDisabled = teachers.length === 0;

  return {
    teachers,
    currentTeacher,
    editingTeacherId,
    errors,
    uniqueSubjects: subjectsWithFrequency,
    classData,
    availableClasses,
    availableSections,
    isFormValid,
    isProceedDisabled,
    alertConfig,
    hideAlert,
    addTeacher,
    editTeacher,
    removeTeacher,
    cancelEdit,
    addAssignment,
    removeAssignment,
    handleAssignmentChange,
    handleInputChange,
    handleNext,
  };
};
