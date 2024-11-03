import React, { useState } from "react";
import { Form, Button, Card, Col, Row, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, movies }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday.split("T")[0]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://movie-api-c3t5.onrender.com/users/${user.Username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUser(data);
          alert("Profile updated successfully");
        } else {
          alert("Profile update failed");
        }
      })
      .catch((e) => {
        console.error("Profile update error: ", e);
        alert("Something went wrong");
      });
  };

  const handleDeregister = () => {
    fetch(`https://movie-api-c3t5.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully");
          setUser(null);
        } else {
          alert("Account deletion failed");
        }
      })
      .catch((e) => {
        console.error("Account deletion error: ", e);
        alert("Something went wrong");
      });
  };

  const handleAddToFavorites = (movieId) => {
    fetch(`https://movie-api-c3t5.onrender.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          setUser({
            ...user,
            FavoriteMovies: [...user.FavoriteMovies, movieId],
          });
          alert("Movie added to favorites");
        } else {
          alert("Failed to add movie to favorites");
        }
      })
      .catch((e) => {
        console.error("Add favorite movie error: ", e);
        alert("Something went wrong");
      });
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(`https://movie-api-c3t5.onrender.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          setUser({
            ...user,
            FavoriteMovies: user.FavoriteMovies.filter((id) => id !== movieId),
          });
          alert("Movie removed from favorites");
        } else {
          alert("Failed to remove movie from favorites");
        }
      })
      .catch((e) => {
        console.error("Remove favorite movie error: ", e);
        alert("Something went wrong");
      });
  };

  const favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m.id));

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBirthday" className="mt-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                  Update Profile
                </Button>
              </Form>
              <Button variant="danger" onClick={handleDeregister} className="mt-3">
                Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h4>Favorite Movies</h4>
          <Row>
            {favoriteMovies.map((movie) => (
              <Col key={movie.id} md={3}>
                <MovieCard movie={movie} onAddToFavorites={handleAddToFavorites} />
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFavorite(movie.id)}
                  className="mt-2"
                >
                  Remove from Favorites
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
