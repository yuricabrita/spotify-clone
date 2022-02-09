import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

export default function Carrousel({ title, itemList, type }) {
  function renderSwitch(type) {
    switch (type) {
      case "album":
        return (
          <Container>
            <div className="mt-3">
              <h2>{title}</h2>
            </div>
            <div className="d-flex mt-2">
              {itemList.map((item) => (
                <ImageCard
                  item={item.album}
                  key={item.album.uri}
                  type={type}
                ></ImageCard>
              ))}
            </div>
          </Container>
        );
      case "playlist":
        return (
          <Container>
            <div className="mt-3">
              <h2>{title}</h2>
            </div>
            <div className="d-flex mt-2">
              {itemList.map((item) => (
                <ImageCard item={item} key={item.uri} type={type}></ImageCard>
              ))}
            </div>
          </Container>
        );
      case "newReleases":
        return (
          <Container>
            <div className="mt-3">
              <h2>{title}</h2>
            </div>
            <div className="d-flex mt-2">
              {itemList.map((item) => (
                <ImageCard item={item} key={item.uri} type={type}></ImageCard>
              ))}
            </div>
          </Container>
        );
      default:
        return (
          <Container>
            <div className="mt-3">
              <h2>{title}</h2>
            </div>
            <div className="d-flex mt-2">
              {itemList.map((item) => (
                <ImageCard item={item} key={item.uri} type={type}></ImageCard>
              ))}
            </div>
          </Container>
        );
    }
  }
  return <div>{renderSwitch(type)}</div>;
}
