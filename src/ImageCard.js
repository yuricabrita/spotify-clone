import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ImageCard({ item, type }) {
  function renderSwitch(type) {
    switch (type) {
      case "album":
        return (
          <Card
            style={{
              width: "10rem",
              marginRight: "1rem",
            }}
            key={item.uri}
          >
            <Link to={`/albums/${item.id}`} state={{ album: item }}>
              <Card.Img variant="top" src={item.images[0].url} />
            </Link>
          </Card>
        );
      case "playlist":
        return (
          <Card
            style={{
              width: "10rem",
              marginRight: "1rem",
            }}
            key={item.uri}
          >
            <Link to={`/playlists/${item.id}`} state={{ playlist: item }}>
              <Card.Img variant="top" src={item.images[0].url} />
            </Link>
          </Card>
        );
      case "newReleases":
        return (
          <Card
            style={{
              width: "10rem",
              marginRight: "1rem",
            }}
            key={item.uri}
          >
            <Link to={`/releases/${item.id}`} state={{ release: item }}>
              <Card.Img variant="top" src={item.images[0].url} />
            </Link>
          </Card>
        );
      default:
        return type;
    }
  }
  return <Container>{renderSwitch(type)}</Container>;
}

{
  /* return (
    <Card
      style={{
        width: "20rem",
        marginRight: "1rem",
      }}
      key={item.uri}
    >
      {type !== "album" ? (
        <Card.Img variant="top" src={item.images[0].url} />
      ) : (
        <Link to={`/album/${item.id}`} state={{ album: item }}>
          <Card.Img variant="top" src={item.images[0].url} />
        </Link>
      )}
    </Card>
  );
} */
}
