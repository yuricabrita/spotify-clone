import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Link, Outlet, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const spotifyApi = new SpotifyWebApi({
  clientId: "7da4614683774b88acddfcd8ad23bf35",
});

export default function Album() {
  const [album, setAlbum] = useState([]);
  const [albumInSaved, setAlbumInSaved] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    spotifyApi.setAccessToken(token);
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    // Get album
    spotifyApi
      .getAlbum(params.id)
      .then((res) => {
        setAlbum(res.body);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    // Check if albums are in the signed in user's Your Music library
    spotifyApi.containsMySavedAlbums([album.id]).then(
      function (data) {
        // An array is returned, where the first element corresponds to the first album ID in the query
        var albumIsInYourMusic = data.body[0];

        if (albumIsInYourMusic) {
          setAlbumInSaved(!albumInSaved);
          console.log("Album was found in the user's Your Music library");
        } else {
          setAlbumInSaved(!albumInSaved);
          console.log("Album was not found.");
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [album]);

  function handleClick(albumInSaved) {
    // Add albums to the signed in user's Your Music library
    if (!albumInSaved) {
      spotifyApi
        .addToMySavedAlbums([album.id])
        .then((res) => {
          console.log("Added album!", res);
          setAlbumInSaved(!albumInSaved);
          alert("Succesfully added album to saved albums.");
        })
        .catch((err) => console.log(err));
    } else {
      //rem// Remove albums from the signed in user's Your Music library
      spotifyApi.removeFromMySavedAlbums([album.id]).then(
        function (data) {
          setAlbumInSaved(!albumInSaved);
          alert("Succesfully removed album from saved albums.");
          console.log("Removed!");
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }
  return (
    <Container>
      {/* <Container className="position-absolute x-50" style={{ left: "10px" }}>
        <Link to="/">
          <FontAwesomeIcon
            icon={faHome}
            style={{ height: "64px", width: "64px" }}
          />
        </Link>
      </Container> */}
      {album.length !== 0 ? (
        <Container className="d-flex flex-row py-2 justify-content-around">
          <Container className="my-5">
            <Card
              style={{
                width: "20rem",
                marginRight: "1rem",
              }}
            >
              <Card.Img variant="top" src={album.images[0].url} />
            </Card>
            <div className="my-5 mx-5">
              <p className="mb-2">
                <b>Artist:</b>
                {album.artists.map((artist, idx) => (
                  <span key={idx}> {artist.name}</span>
                ))}
              </p>
              <p>
                <b>Album:</b> {album.name}
              </p>
            </div>
            <div className="mx-5">
              <button
                className="btn btn-success btn-lg"
                onClick={() => handleClick(albumInSaved)}
              >
                {albumInSaved ? "Remove from My Albums" : "Save Album"}
              </button>
            </div>
          </Container>
          <Container className="d-flex flex-column py-2">
            <div>
              <p>Tracks:</p>
              {album.tracks.items.map((track) => (
                <p key={track.uri}>
                  <a href={track.href}>{track.name}</a>
                  <br />
                </p>
              ))}
            </div>
          </Container>{" "}
        </Container>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
