import React from "react";
import { Container, Card } from "react-bootstrap";

export default function Home() {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>NASA API Demo</Card.Title>
          <Card.Text>
            Welcome! Use the navigation bar to explore NASA CGI data visualizations.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
