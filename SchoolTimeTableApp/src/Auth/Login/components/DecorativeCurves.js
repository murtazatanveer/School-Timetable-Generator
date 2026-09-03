import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../../Theme/colors";

const { width, height } = Dimensions.get("window");

const DecorativeCurves = () => {
  return (
    <>
      {/* Top Curve */}
      <View style={styles.topCurveContainer} pointerEvents="none">
        <Svg width={width} height={height * 0.25}>
          <Path
            d={`M0,0 
                L${width},0 
                L${width},${height * 0.05} 
                C${width * 0.7},${height * 0.15} ${width * 0.4},${height * 0.25} 0,${height * 0.15} 
                Z`}
            fill={COLORS.primary}
          />
        </Svg>
      </View>

      {/* Bottom Curve */}
      <View style={styles.bottomCurveContainer} pointerEvents="none">
        <Svg width={width} height={height * 0.25}>
          <Path
            d={`M0,${height * 0.25} 
                L${width},${height * 0.25} 
                L${width},${height * 0.2} 
                C${width * 0.6},${height * 0.1} ${width * 0.3},${height * 0.05} 0,${height * 0.1} 
                Z`}
            fill={COLORS.primary}
          />
        </Svg>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topCurveContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 1,
  },
  bottomCurveContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 1,
  },
});

export default DecorativeCurves;
