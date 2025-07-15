import React, { useEffect, useState } from "react";
import { fetchMarsPhotoStats } from "../api/nasa";
import { Container, Card, Spinner, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip
);
export default function MarsPhotoStats({
  sol: initialSol = 1000,
  rover: initialRover = "curiosity",
}) {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [sol, setSol] = useState(initialSol);
  const [rover, setRover] = useState(initialRover);
  // Fetch photo stats whenever sol or rover changes
  useEffect(() => {
    setLoading(true);
    fetchMarsPhotoStats({ sol, rover }) // Assuming fetchMarsPhotoStats accepts sol and rover as parameters
      .then((data) => {
        const photoArray = data.photos || [];
        const counts = {};
        photoArray.forEach((photo) => {
          const cameraName = photo.camera.full_name;
          counts[cameraName] = (counts[cameraName] || 0) + 1;
        });
        setStats(counts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sol, rover]);
  const handleSolChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setSol(Math.max(0, Math.min(1000, value))); // Ensure sol is between 0 and 1000
    } else {
      setSol("");
    }
  };
  const handleRoverChange = (e) => {
    setRover(e.target.value);
  };
  const cameras = Object.keys(stats);
  const counts = Object.values(stats);
  const chartData = {
    labels: cameras,
    datasets: [
      {
        label: "Photo Count",
        data: counts,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Container className="mt-4">
      <h2>Mars Rover Photo Stats</h2>
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
      ) : cameras.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <Card>
          <Card.Body>
            <Bar data={chartData} options={chartOptions} />
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
