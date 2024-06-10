import './App.css';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';

export default function App() {
  const [placeIds, setPlaceIds] = useState([]);
  const [placesInfo, setPlacesInfo] = useState([]);

  const nearby_places_url = "https://places.googleapis.com/v1/places:searchNearby";
  const payload = {
    includedTypes: [
      "restaurant"
    ],
    maxResultCount: 20,
    rankPreference: "DISTANCE",
    locationRestriction: {
      circle: {
        center: {
          latitude: 46.309933,
          longitude: 16.334291
        },
        radius: 1000.0
      }
    }
  };

  const headers1 = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": "AIzaSyCdh8z4QAiNOfQNxSGJ2YG4enUBCAokPiw",
    "X-Goog-FieldMask": "places.id"
  };

  const headers2 = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": "AIzaSyCdh8z4QAiNOfQNxSGJ2YG4enUBCAokPiw",
    "X-Goog-FieldMask": "formattedAddress,id,websiteUri,nationalPhoneNumber,displayName"
  };

  async function get_nearby_places_ids() {
    try {
      let response = await fetch(nearby_places_url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: headers1
      });
      let data = await response.json();
      let places = data.places;
      setPlaceIds(places.map(place => place.id)); // assuming each place has an id field
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }

  useEffect(() => {
    async function fetchPlaceInfo() {
      try {
        let placeInfoPromises = placeIds.map(place_id => 
          fetch(`https://places.googleapis.com/v1/places/${place_id}`, {
            method: "GET",
            headers: headers2
          }).then(response => response.json())
        );

        let placesInfoData = await Promise.all(placeInfoPromises);
        setPlacesInfo(placesInfoData);
      } catch (error) {
        console.error("Error fetching place info:", error);
      }
    }

    if (placeIds.length > 0) {
      fetchPlaceInfo();
    }
  // eslint-disable-next-line
  }, [placeIds]);

  return (
    <div className="App">
      <Container>
        <Row className="my-3">
          <Col className="text-center">
            <Button variant="primary" onClick={get_nearby_places_ids}>
              Get Nearby Places
            </Button>
          </Col>
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
                      <strong>Website:</strong> <a href={place.websiteUri}>{place.websiteUri}</a>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    </div>
  );
}
