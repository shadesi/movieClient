// movie-card.jsx
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onAddToFavorites }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>Directed by: {movie.directors}</Card.Text>
        {/* Use Link to navigate to the movie's detail page */}
        <Link to={`/movies/${encodeURIComponent(movie.title)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="primary" onClick={() => onAddToFavorites(movie.id)}>
          Add to Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    directors: PropTypes.string,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};
