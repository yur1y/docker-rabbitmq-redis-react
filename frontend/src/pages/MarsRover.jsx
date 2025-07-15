import React, { useEffect, useState } from "react";
import { fetchMarsPhotos } from "../api/nasa";
import { Container, Spinner, Modal, Form } from "react-bootstrap";
import MarsPhotos from "../components/MarsPhotos";
export default function MarsRover({
  sol: initialSol = 1000,
  rover: initialRover = "curiosity",
}) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sol, setSol] = useState(initialSol);
  const [rover, setRover] = useState(initialRover);
  // Fetch photos whenever sol or rover changes
  useEffect(() => {
    setLoading(true);
    fetchMarsPhotos({ sol, rover }).then((data) => {
      setPhotos(data.photos || []);
      setLoading(false);
    });
  }, [sol, rover]);
  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };
  // Handlers for input changes
  const handleSolChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      setSol("");
    } else {
      const newSol = Math.max(0, Math.min(1000, value));
      setSol(newSol);
    }
  };
  const handleRoverChange = (e) => {
    setRover(e.target.value);
  };
  return (
    <Container className="mt-4">
      <h2>Mars Rover Photos</h2>
      {/* Inputs for user to change sol and rover */}
      <Form className="mb-4" inline={"true"}>
        <Form.Group controlId="solInput" className="mr-3">
          <Form.Label className="mr-2">Day (sol):</Form.Label>
          <Form.Control
            type="number"
            min={0}
            max={1000}
            value={sol}
            onChange={handleSolChange}
            style={{ width: "100px" }}
          />
        </Form.Group>
        <Form.Group controlId="roverSelect" className="mr-3">
          <Form.Label className="mr-2">Rover:</Form.Label>
          <Form.Control
            as="select"
            value={rover}
            onChange={handleRoverChange}
            style={{ width: "150px" }}
          >
            <option value="curiosity">Curiosity</option>
            <option value="opportunity">Opportunity</option>
            <option value="spirit">Spirit</option>
          </Form.Control>
        </Form.Group>
      </Form>
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <MarsPhotos photos={photos} onImageClick={handleImageClick} />
      )}
      {/* Modal for zoomed image */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Body style={{ padding: 0 }}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={selectedImage}
              style={{
                width: "100%",
                height: "auto",
                cursor: "zoom-in",
                maxHeight: "80vh",
                objectFit: "contain",
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
