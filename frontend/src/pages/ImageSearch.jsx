import React, { useState } from "react";
import { searchNasaImages } from "../api/nasa";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import NasaImageGrid from "../components/NasaImageGrid";

// Parameter definitions for NASA image search
const initialParams = {
  q: "",
  center: "",
  description: "",
  description_508: "",
  keywords: "",
  location: "",
  media_type: "",
  nasa_id: "",
  page: "",
  page_size: "",
  photographer: "",
  secondary_creator: "",
  title: "",
  year_start: "",
  year_end: "",
};

export default function ImageSearch() {
  const [params, setParams] = useState(initialParams);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Utility for updating params
  const updateParam = (key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // Prepare parameters: remove empty fields
    const searchParams = Object.entries(params)
      .filter(([, val]) => val !== "" && val !== null)
      .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});

    const data = await searchNasaImages(searchParams);
    setResults(data.collection?.items || []);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  // Helper for rendering text input fields
  const renderField = (label, key, type = "text", placeholder = "") => (
    <Form.Group controlId={key} className="mt-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={params[key]}
        onChange={(e) => updateParam(key, e.target.value)}
        placeholder={placeholder}
      />
    </Form.Group>
  );

  // Helper for rendering number input fields
  const renderNumberField = (label, key, placeholder = "") => (
    <Form.Group controlId={key} className="mt-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="number"
        value={params[key]}
        onChange={(e) => updateParam(key, e.target.value)}
        placeholder={placeholder}
        min={0}
      />
    </Form.Group>
  );

  return (
    <Container className="my-4">
      <h2 className="mb-4">NASA Image Search</h2>
      {/* Search Form */}
      <Form onSubmit={handleSearch} className="mb-4">
        <InputGroup>
          <Form.Control
            placeholder="Search NASA images..."
            value={params.q}
            onChange={(e) => updateParam("q", e.target.value)}
            required
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
        </InputGroup>

        {/* Additional Filters */}
        {renderField("NASA Center", "center", "text", "Enter NASA center")}
        {renderField("Description", "description", "text", "Enter description")}
        {renderField(
          "Description (508)",
          "description_508",
          "text",
          "Enter 508-compliant description"
        )}
        {renderField(
          "Keywords",
          "keywords",
          "text",
          "Enter keywords (comma separated)"
        )}
        {renderField("Location", "location", "text", "Enter location")}
        {renderField(
          "Media Type",
          "media_type",
          "text",
          "Enter media type (image, video, audio)"
        )}
        {renderField("NASA ID", "nasa_id", "text", "Enter NASA ID")}
        {renderNumberField("Page", "page", "Page number")}
        {renderNumberField("Page Size", "page_size", "Results per page")}
        {renderField(
          "Photographer",
          "photographer",
          "text",
          "Enter photographer"
        )}
        {renderField(
          "Secondary Creator",
          "secondary_creator",
          "text",
          "Enter secondary creator"
        )}
        {renderField("Title", "title", "text", "Enter title")}
        {renderField("Year Start", "year_start", "text", "Enter starting year")}
        {renderField("Year End", "year_end", "text", "Enter ending year")}
      </Form>

      <NasaImageGrid
        results={results}
        showModal={showModal}
        selectedImage={selectedImage}
        handleImageClick={handleImageClick}
        handleClose={handleClose}
      />
    </Container>
  );
}
