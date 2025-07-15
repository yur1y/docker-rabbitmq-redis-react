import React, { useEffect, useState } from "react";
import { fetchEpic } from "../api/nasa";
import { Container, Spinner, Modal, Form, Button } from "react-bootstrap";
import EpicImages from "../components/EpicImages";
export default function Epic() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [imageType, setImageType] = useState("natural"); // Default value
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // YYYY-MM-DD format
  const fetchImages = () => {
    setLoading(true);
    fetchEpic({ type: imageType, date: date }) // Assuming fetchEpic accepts type and date as parameters
      .then((data) => {
        setImages(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchImages(); // Fetch images on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchImages(); // Fetch images based on user input
  };
  const handleImageClick = (src) => {
    setModalImage(src);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }
  return (
    <Container className="mt-4">
      <h2>EPIC Images</h2>
      {/* Form to select image type and date */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="imageType">
          <Form.Label>Select Image Type</Form.Label>
          <Form.Control
            as="select"
            value={imageType}
            onChange={(e) => setImageType(e.target.value)}
          >
            <option value="natural">Natural</option>
            <option value="enhanced">Enhanced</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Select Date (YYYY-MM-DD)</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Fetch Images
        </Button>
      </Form>
      <EpicImages images={images} onImageClick={handleImageClick} />
      {/* Modal for zoomed image */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Body className="p-0">
          <img
            src={modalImage}
            alt="Epic zoom"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
