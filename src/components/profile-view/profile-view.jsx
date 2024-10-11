import React, { useState } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
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
      Birthday: birthday
    };

    fetch(`https://movie-api-c3t5.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Update failed");
        return false;
      }
    }).then((updatedUser) => {
      if (updatedUser) {
        alert("Update successful");
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }).catch(e => {
      console.error(e);
      alert("An error occurred");
    });
  };

  const handleDeregister = () => {
    fetch(`https://movie-api-c3t5.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        localStorage.clear();
        alert("Your account has been deleted");
      } else {
        alert("Failed to delete account");
      }
    }).catch(e => {
      console.error(e);
      alert("An error occurred");
    });
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(`https://movie-api-c3t5.onrender.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Failed to remove movie from favorites");
        return false;
      }
    }).then((updatedUser) => {
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Movie removed from favorites");
      }
    }).catch(e => {
      console.error(e);
      alert("An error occurred");
    });
  };

  const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

  return (
    <Row>
      <Col md={6} className="mb-4">
        <Card>
          <Card.Body>
            <Card.Title>Your Profile</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername" className="mb-3">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBirthday" className="mb-3">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </Form>

            <Button variant="danger" onClick={handleDeregister} className="mt-3">
              Delete Account
            </Button>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Favorite Movies</Card.Title>
            {favoriteMovies.map((movie) => (
              <Row key={movie.id} className="mb-4">
                <Col xs={12} md={8}>
                  <MovieCard movie={movie} />
                </Col>
                <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
                  <Button variant="danger" onClick={() => handleRemoveFavorite(movie.id)}>
                    Remove from Favorites
                  </Button>
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};