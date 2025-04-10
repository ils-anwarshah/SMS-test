import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type GradientButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  colors?: string[];
  style?: ViewStyle;
  disabled?: boolean;
  textStyle?: TextStyle;
  gradientStyle?: ViewStyle;
};

const PrimaryButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  colors = ['#3949AB', '#1E88E5'],
  style = {},
  textStyle = {},
  disabled = false,
  gradientStyle = {},
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style, {opacity: disabled ? 0.7 : 1}]}>
      <LinearGradient colors={colors} style={[styles.gradient, gradientStyle]}>
        <View style={styles.gredientContainer}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    height: 50,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gredientContainer: {
    flex: 1,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrimaryButton;
