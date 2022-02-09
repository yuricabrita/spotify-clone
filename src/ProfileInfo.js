import React from "react";
import { Container } from "react-bootstrap";
import Title from "./Title";

export default function ProfileInfo({ userInfo }) {
  return (
    <Container className="d-flex flex-column py-2">
      <Title title="User Info"></Title>
      <Container className="d-flex flex-row py-2">
        <Container>
          <img src={userInfo.images} alt="profile image"></img>
        </Container>
        <Container>
          <div>
            <p className="mb-2">
              <b>Name:</b> {userInfo.name}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <b>Email:</b> {userInfo.email}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <b>Product:</b> {userInfo.product}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <b>Profile:</b> <a href={userInfo.profile}>{userInfo.profile}</a>
            </p>
          </div>
          <div>
            <p className="mb-2">
              <b>Followers:</b> {userInfo.followers}
            </p>
          </div>
        </Container>
      </Container>
    </Container>
  );
}
