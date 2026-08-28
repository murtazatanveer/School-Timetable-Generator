import { useState, useEffect } from "react";
import { mockGetTeacher } from "../constants/teacherData";

export const useTeacherSearch = (visible) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showSectionDropdown, setShowSectionDropdown] = useState(false);

  useEffect(() => {
    if (!visible) {
      setSearchResult(null);
      setSelectedClass("");
      setSelectedSection("");
      setShowClassDropdown(false);
      setShowSectionDropdown(false);
    }
  }, [visible]);

  const handleSearch = () => {
    if (!selectedClass || !selectedSection) return;
    const result = mockGetTeacher(selectedClass, selectedSection);
    setSearchResult(result);
  };

  const handleSelectClass = (className) => {
    setSelectedClass(className);
    setShowClassDropdown(false);
    setSearchResult(null);
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    setShowSectionDropdown(false);
    setSearchResult(null);
  };

  const toggleClassDropdown = () => {
    setShowClassDropdown((prev) => !prev);
    setShowSectionDropdown(false);
  };

  const toggleSectionDropdown = () => {
    setShowSectionDropdown((prev) => !prev);
    setShowClassDropdown(false);
  };

  return {
    selectedClass,
    selectedSection,
    searchResult,
    showClassDropdown,
    showSectionDropdown,
    handleSearch,
    handleSelectClass,
    handleSelectSection,
    toggleClassDropdown,
    toggleSectionDropdown,
  };
};
