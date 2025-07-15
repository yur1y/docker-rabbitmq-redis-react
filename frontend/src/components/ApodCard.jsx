import React from "react";
import { Card } from "react-bootstrap";
const ApodCard = ({ data, onImageClick }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        {data.media_type === "image" ? (
          <Card.Img
            variant="top"
            src={data.url}
            alt={data.title}
            style={{ width: "25rem", cursor: "pointer" }}
            onClick={() => onImageClick(data.url)}
          />
        ) : (
          <div className="ratio ratio-16x9">
            <iframe src={data.url} title={data.title} allowFullScreen />
          </div>
        )}
        <Card.Text className="mt-3">{data.explanation}</Card.Text>
        <Card.Footer>Date: {data.date}</Card.Footer>
      </Card.Body>
    </Card>
  );
};
export default ApodCard;
