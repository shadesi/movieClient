import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const storedToken = localStorage.getItem("token");
    setUser(storedUser);
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    fetch("https://movie-api-c3t5.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImagePath,
          directors: movie?.Director?.Name || "Unknown Director",
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const checkUserAndMovies = (component) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    if (movies.length === 0) {
      return <Col>The list is empty!</Col>;
    }
    return component;
  };

  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                      }}
                    />
                  </Col>
                )
              }
            />
            <Route
              path="/profile"
              element={
                checkUserAndMovies(
                  <ProfileView user={user} token={token} setUser={setUser} movies={movies} />
                )
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                checkUserAndMovies(
                  <MovieDetails />
                )
              }
            />
            <Route
              path="/"
              element={
                checkUserAndMovies(
                  <>
                    {movies.map((movie) => (
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4"
                        key={movie.id}
                      >
                        <MovieCard movie={movie} onAddToFavorites={(movieId) => {
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
                        }} />
                      </Col>
                    ))}
                    <Button variant="danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                )
              }
            />
          </Routes>
        </Row>
      </Container>
    </Router>
  );
};

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null)
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const storedToken = localStorage.getItem("token");
    setUser(storedUser);
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    fetch(`https://movie-api-c3t5.onrender.com/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMovie(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [user, movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <Col md={8}>
      <MovieView movie={movie} onBackClick={() => navigate("/")} />
    </Col>
  );
};
