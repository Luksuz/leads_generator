import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function FormComponent(props) {
  const {
    FieldMask,
    setFieldMask,
    includedTypes,
    setIncludedTypes,
    maxResultCount,
    setMaxResultCount,
    coordinates,
    setCoordinates,
    radius,
    setRadius,
    onSubmit,
  } = props;

  const handleFieldMaskChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setFieldMask([...FieldMask, value]);
    } else {
      setFieldMask(FieldMask.filter((field) => field !== value));
    }
  };

  const handleIncludedTypesChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setIncludedTypes([...includedTypes, value]);
    } else {
      setIncludedTypes(includedTypes.filter((type) => type !== value));
    }
  };

  const handleMaxResultCountChange = (e) => {
    setMaxResultCount(Number(e.target.value));
  };

  const handleLatitudeChange = (e) => {
    setCoordinates((prev) => ({ ...prev, latitude: Number(e.target.value) }));
  };

  const handleLongitudeChange = (e) => {
    setCoordinates((prev) => ({ ...prev, longitude: Number(e.target.value) }));
  };

  const handleRadiusChange = (e) => {
    setRadius(Number(e.target.value));
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="fieldMask">
            <Form.Label>Field Mask</Form.Label>
            <Form.Check
              type="checkbox"
              label="Name"
              value="displayName"
              checked={FieldMask.includes("displayName")}
              onChange={handleFieldMaskChange}
            />
            <Form.Check
              type="checkbox"
              label="Address"
              value="formattedAddress"
              checked={FieldMask.includes("formattedAddress")}
              onChange={handleFieldMaskChange}
            />
            <Form.Check
              type="checkbox"
              label="Phone Number"
              value="nationalPhoneNumber"
              checked={FieldMask.includes("nationalPhoneNumber")}
              onChange={handleFieldMaskChange}
            />
            <Form.Check
              type="checkbox"
              label="Website"
              value="websiteUri"
              checked={FieldMask.includes("websiteUri")}
              onChange={handleFieldMaskChange}
            />
            <Form.Check
              type="checkbox"
              label="Rating"
              value="rating"
              checked={FieldMask.includes("rating")}
              onChange={handleFieldMaskChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="includedTypes">
            <Form.Label>Included Types</Form.Label>
            {["restaurant", "cafe", "bar", "bakery", "book_store", "clothing_store", "department_store", "electronics_store", "furniture_store", "jewelry_store", "shopping_mall"].map(type => (
              <Form.Check
                key={type}
                type="checkbox"
                label={type.split('_').join(' ')}
                value={type}
                checked={includedTypes.includes(type)}
                onChange={handleIncludedTypesChange}
              />
            ))}
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="maxResultCount">
            <Form.Label>Max Result Count</Form.Label>
            <Form.Control
              type="number"
              value={maxResultCount}
              onChange={handleMaxResultCountChange}
              placeholder="Enter max result count"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="radius">
            <Form.Label>Radius (meters)</Form.Label>
            <Form.Control
              type="number"
              value={radius}
              onChange={handleRadiusChange}
              placeholder="Enter radius in meters"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              value={coordinates.latitude}
              onChange={handleLatitudeChange}
              placeholder="Enter latitude"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              value={coordinates.longitude}
              onChange={handleLongitudeChange}
              placeholder="Enter longitude"
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="button" onClick={onSubmit}>
        Update Parameters
      </Button>
    </Form>
  );
}
