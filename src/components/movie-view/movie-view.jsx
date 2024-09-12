// movie-view.jsx
import React from "react";
import { useParams } from "react-router";  // Import useParams
import { Link } from "react-router-dom";   // Import Link for navigation
import { Card, Button } from "react-bootstrap";
//import "./movie-view";  // Assuming you may want custom styles, similar to book-view.scss

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();  // Get movieId from the route

  const movie = movies.find((m) => m.id === movieId);  // Find the movie based on the ID

  if (!movie) return <div>Movie not found</div>;  // Handle case where movie is not found

  return (
    <Card className="mt-4">
      <Card.Img variant="top" src={movie.image} alt={movie.title} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          Director: {movie.directors} <br />
          {movie.description}
        </Card.Text>
        {/* Use Link to go back to the main movie list */}
        <Link to={`/`}>
          <Button variant="secondary">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
