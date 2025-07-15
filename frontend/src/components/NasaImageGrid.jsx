import React from "react";
import { Row, Col, Card, Modal } from "react-bootstrap";

const NasaImageGrid = ({
  results,
  showModal,
  selectedImage,
  handleImageClick,
  handleClose,
}) => {
  return (
    <>
      {/* Results Grid */}
      <Row>
        {results.map((item) => {
          const imageUrl = item.links?.[0]?.href;
          const title = item.data[0].title;
          const id = item.data[0].nasa_id;
          return (
            <Col key={id} xs={12} sm={6} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  alt={title}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImageClick(imageUrl)}
                />
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {/* Modal for zoomed image */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Body className="d-flex justify-content-center p-0">
          {selectedImage && (
            <div
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
                cursor: "zoom-in",
              }}
            >
              <img
                src={selectedImage}
                alt="Zoomed NASA"
                style={{
                  width: "100%",
                  height: "auto",
                  transition: "transform 0.3s",
                }}
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default NasaImageGrid;
