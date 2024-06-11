const nearby_places_url = "https://places.googleapis.com/v1/places:searchNearby";
const nearbyPlacesHeaders = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": "AIzaSyCdh8z4QAiNOfQNxSGJ2YG4enUBCAokPiw",
    "X-Goog-FieldMask": "places.id"
  };

export async function getNearbyPlacesIDs(includedTypes, maxResultCount, centerLat, centerLon, radius, setPlaceIds) {
    try {
    console.log(includedTypes)
      let response = await fetch(nearby_places_url, {
        method: "POST",
        body: JSON.stringify({ 
            includedTypes: includedTypes,
            maxResultCount: maxResultCount,
            rankPreference: "DISTANCE",
            locationRestriction: {
              circle: {
                center: {
                  latitude: centerLat,
                  longitude: centerLon
                },
                radius: radius
              }
            }}),
        headers: nearbyPlacesHeaders
      });
      let data = await response.json();
      let places = data.places;
      setPlaceIds(places.map(place => place.id));
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }


export async function getPlaceInfo(FieldMask, setPlacesInfo, placeIds) {
    try {
      console.log(FieldMask)
      let placeInfoPromises = placeIds.map(place_id => 
        fetch(`https://places.googleapis.com/v1/places/${place_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": "AIzaSyCdh8z4QAiNOfQNxSGJ2YG4enUBCAokPiw",
            "X-Goog-FieldMask": FieldMask
          }
        }).then(response => response.json())
      );

      let placesInfoData = await Promise.all(placeInfoPromises);
      setPlacesInfo(placesInfoData);
    } catch (error) {
      console.error("Error fetching place info:", error);
    }
  }


