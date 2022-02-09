import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ImageCard({ item, type }) {
  function setLink(type) {
    if (type === "album") {
      return { to: `/albums/${item.id}`, state: { album: item } };
    } else if (type === "newReleases") {
      return { to: `/releases/${item.id}`, state: { release: item } };
    } else if (type === "playlist") {
      return { to: `/playlists/${item.id}`, state: { playlist: item } };
    }
  }
  const linkParams = setLink(type);
  return (
    <Card
      style={{
        width: "20rem",
        marginRight: "1rem",
      }}
      key={item.uri}
    >
      <Link to={linkParams.to} state={linkParams.state}>
        <Card.Img variant="top" src={item.images[0].url} />
      </Link>
    </Card>
  );
}
