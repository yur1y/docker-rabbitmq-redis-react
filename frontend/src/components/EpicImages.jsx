import React from "react";
import { Row, Col, Card } from "react-bootstrap";
const EpicImages = ({ images, onImageClick }) => {
  const getEpicImageUrl = (img) => {
    const [date] = img.date.split(" "); // "2025-07-13"
    const [year, month, day] = date.split("-");
    return `https://epic.gsfc.nasa.gov/archive/${img.imageType}/${year}/${month}/${day}/png/${img.image}.png`; // Use imageType here
  };
  if (images.length === 0) {
    return <p>No images found.</p>;
  }
  return (
    <Row>
      {images.map((img) => (
        <Col key={img.identifier} xs={12} sm={6} md={4} lg={3} className="mb-4">
          <Card>
            <Card.Img
              variant="top"
              src={getEpicImageUrl(img)}
              alt={img.caption}
              style={{
                cursor: "pointer",
                height: "200px",
                objectFit: "cover",
              }}
              onClick={() => onImageClick(getEpicImageUrl(img))}
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "1rem" }}>
                {img.caption}
              </Card.Title>
              <Card.Text style={{ fontSize: "0.9rem" }}>{img.date}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default EpicImages;
