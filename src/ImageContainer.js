import React from "react";
import { Container } from "react-bootstrap";

export default function ImageContainer({ title, children }) {
  return (
    <Container>
      <div className="mt-3">
        <h2>{title}</h2>
      </div>
      <Container
        style={{
          overflowY: "auto",
        }}
      >
        <div className="d-flex mt-2">{children}</div>
      </Container>
    </Container>
  );
}
