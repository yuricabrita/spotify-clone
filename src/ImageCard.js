import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ImageCard({ item, pathName }) {
  return (
    <Container>
      <Card
        style={{
          width: "10rem",
          marginRight: "1rem",
        }}
        key={item.uri}
      >
        <Link to={pathName} state={item}>
          <Card.Img
            variant="top"
            src={
              item.images.length > 0
                ? item.images[0].url
                : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            }
            width={160}
            height={160}
          />
        </Link>
      </Card>
    </Container>
  );
}
