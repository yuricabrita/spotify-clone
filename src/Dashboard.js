import React, { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Button, Card, Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "./TrackSearchResult";
import Title from "./Title";
import ImageCard from "./ImageCard";
import ProfileInfo from "./ProfileInfo";
import Carrousel from "./Carrousel";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const spotifyApi = new SpotifyWebApi({
  clientId: "7da4614683774b88acddfcd8ad23bf35",
});

export default function Dashboard() {
  const location = useLocation();
  const accessToken = useAuth(location.state.code);

  const [search, setSearch] = useState("");
  const [trackSearchResults, setTrackSearchResults] = useState([]);
  const [artistSearchResults, setArtistSearchResults] = useState([]);
  const [playlistSearchResults, setPlaylistSearchResults] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [myAlbums, setMyAlbums] = useState([]);
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [myArtists, setMyArtists] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  // useEffect(() => {
  //   if (!search)
  //     return setSearchResults({
  //       tracks: [],
  //       playlists: [],
  //       artists: [],
  //     });
  //   if (!accessToken) return;
  //   spotifyApi.searchTracks(search).then((res) => {
  //     setSearchResults({ tracks: res.body.tracks.items });
  //     console.log("searchResults", searchResults);
  //     console.log("search term", search);
  //   });
  // }, [search, accessToken]);

  useEffect(() => {
    // Get the authenticated user
    if (!accessToken) return;
    spotifyApi.getMe().then((res) => {
      console.log("user info", res.body.images.length);
      setUserInfo({
        name: res.body.display_name,
        email: res.body.email,
        product: res.body.product,
        profile: res.body.external_urls.spotify,
        followers: res.body.followers.total,
        images: res.body.images,
      });
      console.log("user", res);
    });
  }, [accessToken]);

  useEffect(() => {
    //  Retrieve featured playlists
    if (!accessToken) return;
    spotifyApi
      .getFeaturedPlaylists({
        offset: 1,
        timestamp: "2022-02-10T09:00:00",
      })
      .then((res) => {
        setFeaturedPlaylists(res.body.playlists.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    // Get albums in the signed in user's Your Music library
    spotifyApi
      .getMySavedAlbums({
        offset: 0,
      })
      .then((res) => {
        console.log("my albums", res.body.items);
        setMyAlbums(res.body.items);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [accessToken]);

  useEffect(() => {
    // Retrieve new releases
    if (!accessToken) return;

    spotifyApi
      .getNewReleases({ offset: 0 })
      .then((res) => {
        console.log("new releases", res.body.albums.items);
        setNewReleases(res.body.albums.items);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    /* Get followed artists */
    spotifyApi.getFollowedArtists().then(
      function (data) {
        // 'This user is following 1051 artists!'
        setMyArtists(data.body.artists.items);
        console.log("MY ARTISTS", data.body.artists);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    // Get a user's playlists
    spotifyApi
      .getUserPlaylists(userInfo.name)
      .then((res) => {
        setMyPlaylists(res.body.items);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [accessToken]);

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      if (!search) return setTrackSearchResults([]);
      if (!accessToken) return;
      spotifyApi.searchTracks(`track:${search}`).then((res) => {
        setTrackSearchResults(res.body.tracks.items);
      });
      // Search artists whose name contains 'Love'
      spotifyApi.searchArtists(search).then((res) => {
        setArtistSearchResults(res.body.artists.items);
      });
      // Search playlists whose name or description contains 'workout'
      spotifyApi.searchPlaylists(search).then((res) => {
        setPlaylistSearchResults(res.body.playlists.items);
      });
      // Search playlists whose name or description contains 'workout'
      spotifyApi.searchPlaylists(search).then((res) => {
        console.log("playlists search res", res.body);
        // setArtistSearchResults(res.body.playlists.items);
      });
    }
  }

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <ProfileInfo userInfo={userInfo}></ProfileInfo>
      <Title title="Search"></Title>
      <Form.Control
        className="mb-5"
        type="search"
        placeholder="Search Artist/Album/Track"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => handleKeyPress(e)}
      ></Form.Control>
      {trackSearchResults.length > 0 && (
        <Carrousel itemList={trackSearchResults} type="album" />
      )}
      {artistSearchResults.length > 0 && (
        <Carrousel itemList={artistSearchResults} type="artist" />
      )}
      {playlistSearchResults.length > 0 && (
        <Carrousel itemList={playlistSearchResults} type="playlist" />
      )}
      <Title title="Browse"></Title>
      <Carrousel itemList={featuredPlaylists} type="playlist" />
      <Carrousel itemList={newReleases} type="newReleases" />
      <Title title="My Library"></Title>
      <Carrousel itemList={myAlbums} title="My Albums" type="album" />
      <Carrousel itemList={myPlaylists} type="playlist" />
      <Carrousel itemList={myArtists} type="artist" />
    </Container>
  );
}
