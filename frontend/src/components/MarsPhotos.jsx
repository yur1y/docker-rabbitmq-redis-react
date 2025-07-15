import React from "react";
import { Row, Col, Card } from "react-bootstrap";
const MarsPhotos = ({ photos, onImageClick }) => {
  if (photos.length === 0) {
    return <p>No photos found.</p>;
  }
  return (
    <Row>
      {photos.map((photo) => (
        <Col key={photo.id} md={4} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={photo.img_src}
              alt={photo.id}
              style={{ width: "100%", cursor: "pointer" }}
              onClick={() => onImageClick(photo.img_src)}
            />
            <Card.Body>
              <Card.Title>{photo.rover.name}</Card.Title>
              <Card.Text>
                {photo.camera.full_name}
                <br />
                {photo.earth_date}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default MarsPhotos;
