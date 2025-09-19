"use client";
import React, { useState } from "react";

interface CollapsibleTextProps {
  text: string;
  maxLength?: number;
  slicedAt?: number;
}

const CollapsibleText: React.FC<CollapsibleTextProps> = ({
  text,
  maxLength = 100,
  slicedAt,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const sliceLength = slicedAt ?? maxLength;

  if (text.length <= sliceLength) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {collapsed ? text.slice(0, sliceLength) + "..." : text}
      <button
        style={{
          marginLeft: 8,
          background: "none",
          border: "none",
          color: "blue",
          cursor: "pointer",
          fontWeight: "light",
          padding: 0,
        }}
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Read more..." : "Read less"}
      >
        {collapsed ? "Read more..." : "Read less"}
      </button>
    </span>
  );
};

export default CollapsibleText;
