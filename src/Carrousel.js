import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";
import ImageContainer from "./ImageContainer";

export default function Carrousel({ itemList, type }) {
  function renderSwitch(type) {
    switch (type) {
      case "album":
        return (
          <ImageContainer title="Albums">
            <>
              {itemList.map((item) => (
                <ImageCard
                  item={item.album}
                  key={item.album.uri}
                  pathName={`albums/${item.album.id}`}
                ></ImageCard>
              ))}
            </>
          </ImageContainer>
        );
      case "playlist":
        return (
          <ImageContainer title="Playlists">
            <>
              {itemList.map((item) => (
                <ImageCard
                  item={item}
                  key={item.uri}
                  pathName={`playlists/${item.id}`}
                ></ImageCard>
              ))}
            </>
          </ImageContainer>
        );
      case "newReleases":
        return (
          <ImageContainer title="New Releases">
            <>
              {itemList.map((item) => (
                <ImageCard
                  item={item}
                  key={item.uri}
                  pathName={`releases/${item.id}`}
                ></ImageCard>
              ))}
            </>
          </ImageContainer>
        );
      case "artist":
        return (
          <ImageContainer title="Artists">
            <>
              {itemList.map((item) => (
                <ImageCard
                  item={item}
                  key={item.uri}
                  pathName={`artists/${item.id}`}
                ></ImageCard>
              ))}
            </>
          </ImageContainer>
        );
      default:
        return (
          <ImageContainer title="">
            <>
              {itemList.map((item) => (
                <ImageCard item={item} key={item.uri} type={type}></ImageCard>
              ))}
            </>
          </ImageContainer>
        );
    }
  }
  return <div>{renderSwitch(type)}</div>;
}
