import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi({
  clientId: "7da4614683774b88acddfcd8ad23bf35",
});

export default function Release() {
  const [release, setRelease] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const params = useParams();
  useEffect(() => {
    if (!accessToken) return;

    const token = localStorage.getItem("accessToken");
    spotifyApi.setAccessToken(token);
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    // Get a playlist
    spotifyApi
      .getAlbum(params.id)
      .then((res) => {
        setRelease(res.body);
        console.log("Some information about this playlist", res.body);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [accessToken]);

  function handleClick(type) {
    // Add track/album to the signed in user's Your Music library
    if (type === "single") {
      spotifyApi
        .addToMySavedTracks([release.id])
        .then((res) => {
          console.log("Added track!");
          alert("Succesfully added track");
        })
        .catch((err) => {
          console.log("Something went wrong!", err);
          alert("Something went wrong!");
        });
    } else {
      spotifyApi
        .addToMySavedAlbums([release.id])
        .then((res) => {
          console.log("Added album!");
          alert("Succesfully added album");
        })
        .catch((err) => {
          console.log("Something went wrong!", err);
          alert("Something went wrong!");
        });
    }
  }
  return (
    <Container>
      {release.length !== 0 ? (
        <Container>
          <Container className="my-5 d-flex flex-row py-2 justify-content-center">
            <Card
              style={{
                width: "20rem",
                marginRight: "1rem",
              }}
            >
              <Card.Img variant="top" src={release.images[0].url} />
            </Card>
            <div className="my-1 mx-5">
              <p>
                <b>Name:</b> {release.name}
              </p>
              <p>
                <b>Artists:</b>
                {release.artists.map((artist, idx) => (
                  <span key={idx}>
                    {" "}
                    {release.artists.length === idx + 1 ? (
                      <span>{artist.name}</span>
                    ) : (
                      <span>{artist.name} & </span>
                    )}
                  </span>
                ))}
              </p>

              <p>
                <b>Type:</b> {release.album_type}
              </p>
              <p>
                <b>Total tracks:</b> {release.total_tracks}
              </p>
              <p>
                <b>Label:</b> {release.label}
              </p>
            </div>

            {release.album_type === "single" ? (
              <div className="mx-5">
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => handleClick("single")}
                >
                  {" "}
                  Save Track{" "}
                </button>
              </div>
            ) : (
              <div className="mx-5">
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => handleClick("album")}
                >
                  {" "}
                  Save Album{" "}
                </button>
              </div>
            )}
          </Container>
        </Container>
      ) : (
        <div>xx</div>
      )}
    </Container>
  );
}
