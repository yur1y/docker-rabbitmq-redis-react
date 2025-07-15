import React, { Component } from "react";
import { fetchApod } from "../api/nasa";
import { Container, Spinner, Modal, Form } from "react-bootstrap";
import ApodCard from "../components/ApodCard";
class Apod extends Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    this.state = {
      data: null,
      showModal: false,
      modalImage: "",
      selectedDate: today, // Initialize with today's date
    };
  }
  componentDidMount() {
    this.loadApodData(this.state.selectedDate); // Load data for the default date
  }
  loadApodData = (date) => {
    fetchApod({ date }).then((result) => {
      this.setState({ data: result });
    });
  };
  handleImageClick = (src) => {
    this.setState({ modalImage: src, showModal: true });
  };
  handleClose = () => {
    this.setState({ showModal: false });
  };
  handleDateChange = (event) => {
    const newDate = event.target.value;
    this.setState({ selectedDate: newDate });
    this.loadApodData(newDate); // Fetch data for the new date
  };
  render() {
    const { data, showModal, modalImage, selectedDate } = this.state;
    if (!data) {
      return (
        <Container className="mt-4 text-center">
          <Spinner animation="border" />
        </Container>
      );
    }
    return (
      <Container className="mt-4">
        <Form.Group controlId="datePicker">
          <Form.Label>Select Date</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </Form.Group>
        <ApodCard data={data} onImageClick={this.handleImageClick} />
        {/* Modal for zoomed image */}
        <Modal show={showModal} onHide={this.handleClose} centered size="lg">
          <Modal.Body className="p-0">
            <img
              src={modalImage}
              alt={data.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}
export default Apod;
