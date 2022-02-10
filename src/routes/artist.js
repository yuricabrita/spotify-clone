import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "7da4614683774b88acddfcd8ad23bf35",
});
export default function Artist() {
  const [artist, setArtist] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const params = useParams();
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    spotifyApi.setAccessToken(token);
    setAccessToken(token);
  }, []);

  useEffect(() => {
    // Get a playlist
    spotifyApi
      .getArtist(params.id)
      .then((res) => {
        setArtist(res.body);
        console.log("Some information about this playlist", res.body);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [accessToken]);

  useEffect(() => {
    /* Check if a user is following an artist */

    spotifyApi.isFollowingArtists([artist.id]).then(
      function (data) {
        setIsFollowed(data.body[0]);
        console.log("IS FOLLOWING", data.body[0]);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [artist]);

  function handleClick() {
    if (!isFollowed) {
      /* Follow an artist */
      spotifyApi.followArtists([params.id]).then(
        function (data) {
          setIsFollowed(!isFollowed);
          console.log(data);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
    if (isFollowed) {
      /* Unfollow an artist */
      spotifyApi.unfollowArtists([params.id]).then(
        function (data) {
          setIsFollowed(!isFollowed);
          console.log(data);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }
  return (
    <Container>
      {artist.length !== 0 ? (
        <Container className="d-flex flex-row py-2 justify-content-around">
          <Container className="my-5">
            <Card
              style={{
                width: "20rem",
                marginRight: "1rem",
              }}
            >
              <Card.Img variant="top" src={artist.images[0].url} />
            </Card>
            <div className="my-5 mx-5">
              <p className="mb-2">
                <b>Artist: </b>
                <a href={artist.href}>{artist.name}</a> <br />
                <b>Followers:</b> {artist.followers.total}
                <br />
                <b>Genre:</b> {artist.genres[0]}
              </p>
            </div>
            <div className="mx-5">
              <button
                className="btn btn-success btn-lg"
                onClick={() => handleClick()}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            </div>
          </Container>
        </Container>
      ) : (
        <div>no artist found</div>
      )}
    </Container>
  );
}
