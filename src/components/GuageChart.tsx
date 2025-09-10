import React from "react";
import { Path, Svg, Text as SvgText } from "react-native-svg";

type Props = {
  value: number; // 0–3
};

const Gauge = ({ value }: Props) => {
  // Full arc path (copied from your code)
  const arcPath =
    "M22.37 60.987a30.3 30.3 0 0 1-2.357-11.76C20.013 32.54 33.44 19.012 50 19.012S79.987 32.54 79.987 49.226c0 4.172-.84 8.146-2.357 11.76";

  // Arc length (manually splitting into thirds)
  const totalLength = 160;
  const segment = totalLength / 3;

  const getColor = (index: number) => {
    if (index === 0) return "green";   // Low
    if (index === 1) return "orange";  // Medium
    return "red";                      // High
  };

  const getLabel = (val: number) => {
    if (val <= 1) return "Low";
    if (val === 2) return "Medium";
    return "High";
  };

  return (
    <Svg width="250" height="182" viewBox="0 0 100 80">
      {/* Background arc */}
      <Path
        d={arcPath}
        fill="none"
        strokeWidth={12}
        strokeLinecap="round"
        stroke="#3a393e"
      />

      {/* Foreground arcs (3 segments) */}
      {[0, 1, 2].map((i) => (
        <Path
          key={i}
          d={arcPath}
          fill="none"
          strokeWidth={12}
          strokeLinecap="round"
          stroke={getColor(i)}
          strokeDasharray={`${segment} ${totalLength}`}
          strokeDashoffset={-(segment * i)}
          opacity={value > i ? 1 : 0.2} // highlight only up to `value`
        />
      ))}

      {/* Center label */}
      <SvgText
        x="50"
        y="48"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="#161d1f"
      >
        {getLabel(value)}
      </SvgText>
    </Svg>
  );
};

export default Gauge;
