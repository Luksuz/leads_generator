import "./App.css";
import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { getPlaceInfo, getNearbyPlacesIDs } from "./APIUtils";
import FormComponent from "./components/FormComponent";

export default function App() {
  const [placeIds, setPlaceIds] = useState([]);
  const [placesInfo, setPlacesInfo] = useState([]);
  const [FieldMask, setFieldMask] = useState([]);
  const [includedTypes, setIncludedTypes] = useState(["restaurant"]);
  const [maxResultCount, setMaxResultCount] = useState(10);
  const [coordinates, setCoordinates] = useState({
    latitude: 46.309933,
    longitude: 16.334291,
  });
  const [radius, setRadius] = useState(1000);

  useEffect(() => {
    if (placeIds.length > 0) {
      getPlaceInfo(FieldMask, setPlacesInfo, placeIds);
    }
    // eslint-disable-next-line
  }, [placeIds]);

  function handleGetNearbyPlacesIDs() {
    getNearbyPlacesIDs(
      includedTypes,
      maxResultCount,
      coordinates.latitude,
      coordinates.longitude,
      radius,
      setPlaceIds
    );
  }

  return (
    <div className="App">
      <Container>
        <Row className="my-3">
          <Col className="text-center">
            <Button variant="primary" onClick={handleGetNearbyPlacesIDs}>
              Get Nearby Places
            </Button>
          </Col>
        </Row>
        <Row>
          <FormComponent
            FieldMask={FieldMask}
            setFieldMask={setFieldMask}
            includedTypes={includedTypes}
            setIncludedTypes={setIncludedTypes}
            maxResultCount={maxResultCount}
            setMaxResultCount={setMaxResultCount}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            radius={radius}
            setRadius={setRadius}
          />
        </Row>
        <Row>
          {placesInfo.length > 0 &&
            placesInfo.map((place, index) => (
              <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{place.displayName.text}</Card.Title>
                    <Card.Text>
                      <strong>Address:</strong> {place.formattedAddress}
                      <br />
                      <strong>Phone:</strong> {place.nationalPhoneNumber}
                      <br />
                      <strong>Website:</strong>{" "}
                      <a href={place.websiteUri}>{place.websiteUri}</a>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}
