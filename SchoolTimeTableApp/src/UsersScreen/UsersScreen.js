import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from "react-native";
import { COLORS, SPACING } from "../Theme/colors";
import { useUserScroll } from "./hooks/useUserScroll";
import { usePasswordVisibility } from "./hooks/usePasswordVisibility";
import { users as initialUsers } from "./data/usersData";
import CredentialsHeader from "../ChangeCredentialsScreen/components/CredentialsHeader";
import UserStats from "./components/UserStats";
import UserCard from "./components/UserCard";
import AddUserButton from "./components/AddUserButton";
import BottomNavigation from "../Navigation/BottomNavigation";
import UserPopup from "./components/UserPopup";

const UsersScreen = ({ navigation }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const { handleScroll } = useUserScroll(translateY);
  const { visiblePasswords, togglePasswordVisibility } =
    usePasswordVisibility();
  const [users, setUsers] = useState(initialUsers);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const adminCount = users.filter((u) => u.role === "Admin").length;
  const teacherCount = users.filter((u) => u.role === "Teacher").length;

  const handleAddUser = () => {
    setEditingUser(null);
    setShowUserPopup(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserPopup(true);
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: userData.userName,
                password: userData.password,
                role:
                  userData.role ||
                  (userData.accountType === "admin" ? "Admin" : "Teacher"),
                updatedDate: new Date().toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
                updatedTime: new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }
            : u,
        ),
      );
    } else {
      // Add new user
      const newUser = {
        id: String(users.length + 1),
        name: userData.userName,
        password: userData.password,
        role:
          userData.role ||
          (userData.accountType === "admin" ? "Admin" : "Teacher"),
        addedDate: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        addedTime: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        updatedDate: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        updatedTime: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        email: `${userData.userName.toLowerCase().replace(/\s/g, ".")}@school.edu`,
      };
      setUsers([...users, newUser]);
    }
    setShowUserPopup(false);
    setEditingUser(null);
  };

  const handleClosePopup = () => {
    setShowUserPopup(false);
    setEditingUser(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <View style={styles.container}>
        <CredentialsHeader
          navigation={navigation}
          title="Users"
          icon="people-outline"
          subtitle="Manage all registered users"
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          <UserStats
            total={users.length}
            admins={adminCount}
            teachers={teacherCount}
          />

          <View style={styles.cardsContainer}>
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isPasswordVisible={visiblePasswords[user.id] || false}
                onTogglePassword={() => togglePasswordVisibility(user.id)}
                onEdit={() => handleEditUser(user)}
              />
            ))}
          </View>

          <AddUserButton onPress={handleAddUser} />

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>

      {/* Add/Edit User Popup */}
      <UserPopup
        visible={showUserPopup}
        onClose={handleClosePopup}
        onSave={handleSaveUser}
        editingUser={editingUser}
        title="Add New User"
        icon="person-add-outline"
        buttonText="Add User"
      />

      <BottomNavigation
        navigation={navigation}
        activeScreen="Profile"
        translateY={translateY}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 120,
  },
  cardsContainer: {
    marginTop: SPACING.md,
  },
  bottomSpacing: {
    height: SPACING.xxl,
  },
});

export default UsersScreen;
