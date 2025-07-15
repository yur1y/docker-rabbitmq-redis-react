import React, { useEffect, useState } from "react";
import { fetchNeoStats } from "../api/nasa";
import { Container, Card, Form, Button } from "react-bootstrap";
import NeoStatsChart from "../components/NeoStatsChart";
export default function NeoStats() {
  const [dateCounts, setDateCounts] = useState({});
  const [startDate, setStartDate] = useState(() => {
    // Default to 7 days ago
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(() => {
    // Default to today
    return new Date().toISOString().split("T")[0];
  });
  const [loading, setLoading] = useState(false);
  const fetchData = () => {
    setLoading(true);
    fetchNeoStats({ start_date: startDate, end_date: endDate }).then((data) => {
      const neoData = data.near_earth_objects || {};
      const countsPerDate = {};
      // Iterate over each date key
      Object.keys(neoData).forEach((date) => {
        // Count number of NEOs for the date
        countsPerDate[date] = neoData[date].length;
      });
      setDateCounts(countsPerDate);
      setLoading(false);
    });
  };
  // Fetch data when date range changes
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    const start = new Date(newStartDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    const newEndDate = end.toISOString().split("T")[0];
    setEndDate(newEndDate);
  };
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>NeoWs Near-Earth Object Counts</Card.Title>
          {/* Date range selectors */}
          <Form
            className="d-flex align-items-center mb-3"
            onSubmit={(e) => {
              e.preventDefault();
              fetchData();
            }}
          >
            <Form.Group controlId="startDate" className="me-2">
              <Form.Label className="me-2">Start Date:</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                max={endDate} // Optional: ensure startDate <= endDate
              />
            </Form.Group>
            <Button variant="primary" onClick={fetchData}>
              Update
            </Button>
          </Form>
          {loading ? (
            <div>Loading data...</div>
          ) : (
            <NeoStatsChart dateCounts={dateCounts} />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}