import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TooltipProps {
  visible: boolean;
  text: string;
  children?: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ visible, text, children }) => {
  if (!visible) {
    return <>{children}</>;
  }

  return (
    <View style={styles.tooltipContainer}>
      {children}
      <View style={styles.tooltip}>
        <Text style={styles.tooltipText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  tooltip: {
    position: 'absolute',
    top: -30,
    backgroundColor: 'rgba(0,0,0, 0.8)',
    padding: 5,
    borderRadius: 5,
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Tooltip;
