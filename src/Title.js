import React from "react";

export default function Title({ title }) {
  return (
    <div className="mb-2 mt-5" style={{ borderBottom: "1px solid black" }}>
      <h1>{title}</h1>
    </div>
  );
}
