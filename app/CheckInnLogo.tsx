// CheckInnLogo.js
import React from 'react';
import Svg, { G, Circle, Path, Text } from 'react-native-svg';

const CheckInnLogo = ({ width = 180, height = 60 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 60" fill="none">
    {/* Location pin with check mark */}
    <G transform="translate(0, 5)">
      <Circle cx="25" cy="25" r="18" fill="#007AFF" />
      <Path
        d="M18 24l5 5 10-10"
        stroke="#fff"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>

    {/* Text */}
    <Text
      x="50"
      y="40"
      fill="#333"
      fontSize="28"
      fontWeight="bold"
      fontFamily="Arial"
    >
      Check
    </Text>
    <Text
      x="130"
      y="40"
      fill="#007AFF"
      fontSize="28"
      fontWeight="bold"
      fontFamily="Arial"
    >
      Inn
    </Text>
  </Svg>
);

export default CheckInnLogo;
