import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "7da4614683774b88acddfcd8ad23bf35",
});
export default function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    spotifyApi.setAccessToken(token);
    setAccessToken(token);
  }, []);

  useEffect(() => {
    // Get a playlist
    spotifyApi
      .getPlaylist(params.id)
      .then((res) => {
        setPlaylist(res.body);
        console.log("Some information about this playlist", res.body);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [accessToken]);

  function handleClick() {
    // Follow a playlist (privately)
    spotifyApi
      .followPlaylist("5ieJqeLJjjI8iJWaxeBLuK", {
        public: false,
      })
      .then(
        function (data) {
          console.log("Playlist successfully followed privately!");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  }
  return (
    <Container>
      {playlist.length !== 0 ? (
        <Container className="d-flex flex-row py-2 justify-content-around">
          <Container className="my-5">
            <Card
              style={{
                width: "20rem",
                marginRight: "1rem",
              }}
            >
              <Card.Img variant="top" src={playlist.images[0].url} />
            </Card>
            <div className="my-5 mx-5">
              <p className="mb-2">
                <b>Owner: </b>
                <a href={playlist.owner.href}>{playlist.owner.display_name}</a>
              </p>
              <p>
                <b>Link: </b> <a href={playlist.href}>{playlist.name}</a>
              </p>
            </div>
          </Container>
          <Container className="d-flex flex-column py-2">
            <div>
              <p>Description: {playlist.description}</p>
            </div>
          </Container>{" "}
        </Container>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
