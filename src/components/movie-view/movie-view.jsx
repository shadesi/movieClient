// movie-view.jsx
import React from "react";
import { useParams } from "react-router";  // Import useParams
import { Link } from "react-router-dom";   // Import Link for navigation
import { Card, Button } from "react-bootstrap";
//import "./movie-view";  // Assuming you may want custom styles, similar to book-view.scss

export const MovieView = ({ movie }) => {
  const { movieId } = useParams();  // Get movieId from the route


  return (
    <Card className="mt-4">
      <Card.Img variant="top" src={movie.ImagePath} alt={movie.Title} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          Director: {movie.Director.Name} <br />
          {movie.Description}
        </Card.Text>
        {/* Use Link to go back to the main movie list */}
        <Link to={`/`}>
          <Button variant="secondary">Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
