import { View, Text, StyleSheet } from "react-native";
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TYPOGRAPHY,
} from "../../Theme/colors";
import CredentialsInput from "./CredentialsInput";

const CredentialsSection = ({
  title,
  fields,
  handleInputChange,
  setFocusedField,
  getInputStyle,
  getIconColor,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <View style={styles.sectionDot} />
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.sectionDivider} />
      </View>

      <View style={styles.card}>
        {fields.map((field, index) => (
          <View key={field.id}>
            <CredentialsInput
              field={field}
              handleInputChange={handleInputChange}
              setFocusedField={setFocusedField}
              getInputStyle={getInputStyle}
              getIconColor={getIconColor}
            />
            {index < fields.length - 1 && <View style={styles.inputDivider} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionDot: {
    width: 4,
    height: 16,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.primary,
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: SPACING.sm,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  inputDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
});

export default CredentialsSection;
