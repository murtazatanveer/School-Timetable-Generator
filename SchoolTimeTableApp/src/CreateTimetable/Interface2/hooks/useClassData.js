import { useState, useEffect, useCallback, useRef } from "react";
import { validateClass } from "../utils/classHelpers";

export const useClassData = (initialData, onNext) => {
  const [classes, setClasses] = useState(initialData.classes || []);
  const [currentClass, setCurrentClass] = useState({
    id: null,
    name: "",
    subjects: [],
    sections: [],
    newSubject: "",
    newSection: "",
  });
  const [editingClassId, setEditingClassId] = useState(null);
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

  // Use ref to track latest state for validation
  const currentClassRef = useRef(currentClass);
  currentClassRef.current = currentClass;

  useEffect(() => {
    validateForm();
  }, [currentClass]);

  const validateForm = useCallback(() => {
    const { isValid, errors: newErrors } = validateClass(
      currentClassRef.current,
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

  const addClass = () => {
    const isValid = validateForm();

    if (!isValid) {
      if (!currentClass.name.trim()) {
        showAlert("warning", "Missing Class Name", "Please enter a class name");
        return;
      }
      if (currentClass.subjects.length === 0) {
        showAlert(
          "warning",
          "Missing Subjects",
          "Please add at least one subject for this class",
        );
        return;
      }
      if (currentClass.sections.length === 0) {
        showAlert(
          "warning",
          "Missing Sections",
          "Please add at least one section for this class",
        );
        return;
      }
      return;
    }

    // Check for duplicate class name
    const isDuplicate = classes.some(
      (c) =>
        c.name.toLowerCase() === currentClass.name.trim().toLowerCase() &&
        c.id !== editingClassId,
    );

    if (isDuplicate) {
      showAlert(
        "duplicate",
        "Duplicate Class",
        `A class with the name "${currentClass.name.trim()}" already exists.`,
        {
          field: "Class Name",
        },
      );
      return;
    }

    const newClass = {
      id: editingClassId || Date.now().toString(),
      name: currentClass.name.trim(),
      subjects: [...currentClass.subjects],
      sections: [...currentClass.sections],
    };

    if (editingClassId) {
      setClasses(classes.map((c) => (c.id === editingClassId ? newClass : c)));
      setEditingClassId(null);
    } else {
      setClasses([...classes, newClass]);
    }

    resetForm();
    showAlert(
      "success",
      "Success",
      editingClassId
        ? "Class updated successfully!"
        : "Class added successfully!",
    );
  };

  const editClass = (classItem) => {
    setEditingClassId(classItem.id);
    setCurrentClass({
      id: classItem.id,
      name: classItem.name,
      subjects: [...classItem.subjects],
      sections: [...classItem.sections],
      newSubject: "",
      newSection: "",
    });
    setErrors({});
  };

  const removeClass = (id) => {
    const classToRemove = classes.find((c) => c.id === id);
    // Use AppAlert for confirmation
    setAlertConfig({
      visible: true,
      type: "warning",
      title: "Remove Class",
      message: `Are you sure you want to remove "${classToRemove?.name}"?`,
      details: null,
      confirmText: "Remove",
      onConfirm: () => {
        setClasses(classes.filter((c) => c.id !== id));
        if (editingClassId === id) {
          resetForm();
        }
        showAlert("success", "Success", "Class removed successfully!");
      },
    });
  };

  const resetForm = () => {
    setCurrentClass({
      id: null,
      name: "",
      subjects: [],
      sections: [],
      newSubject: "",
      newSection: "",
    });
    setEditingClassId(null);
    setErrors({});
    setIsFormValid(false);
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

  const cancelEdit = () => {
    resetForm();
  };

  const addSubject = () => {
    const subject = currentClass.newSubject.trim();
    if (!subject) {
      showAlert("warning", "Missing Subject", "Please enter a subject name");
      return;
    }
    if (currentClass.subjects.includes(subject)) {
      showAlert(
        "duplicate",
        "Duplicate Subject",
        `"${subject}" already exists for this class.`,
        {
          field: "Subject",
        },
      );
      return;
    }
    setCurrentClass({
      ...currentClass,
      subjects: [...currentClass.subjects, subject],
      newSubject: "",
    });
    if (errors.subjects) {
      setErrors({ ...errors, subjects: null });
    }
  };

  const removeSubject = (subject) => {
    setCurrentClass({
      ...currentClass,
      subjects: currentClass.subjects.filter((s) => s !== subject),
    });
  };

  const addSection = (section) => {
    if (!section) {
      showAlert("warning", "Missing Section", "Please select a section first");
      return;
    }
    if (currentClass.sections.includes(section)) {
      showAlert(
        "duplicate",
        "Duplicate Section",
        `Section ${section} already exists for this class.`,
        {
          field: "Section",
        },
      );
      return;
    }
    setCurrentClass({
      ...currentClass,
      sections: [...currentClass.sections, section],
      newSection: "",
    });
    if (errors.sections) {
      setErrors({ ...errors, sections: null });
    }
  };

  const removeSection = (section) => {
    setCurrentClass({
      ...currentClass,
      sections: currentClass.sections.filter((s) => s !== section),
    });
  };

  // ✅ FIXED - Use functional update for all state changes
  const handleInputChange = (field, value) => {
    setCurrentClass((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: null }));
    }
  };

  const handleNext = () => {
    if (classes.length === 0) {
      showAlert(
        "warning",
        "No Classes",
        "Please add at least one class before proceeding",
      );
      return;
    }
    onNext({ classes });
  };

  const isProceedDisabled = classes.length === 0;

  return {
    classes,
    currentClass,
    editingClassId,
    errors,
    isFormValid,
    isProceedDisabled,
    alertConfig,
    hideAlert,
    addClass,
    editClass,
    removeClass,
    cancelEdit,
    addSubject,
    removeSubject,
    addSection,
    removeSection,
    handleInputChange,
    handleNext,
  };
};
