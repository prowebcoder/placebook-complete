import React, { useRef, useEffect } from "react";
import "./Map.css";
function Map(props) {
  // useRef --> DOM MAnupulitees
  const mapRef = useRef();
  const { center, zoom } = props;
  useEffect(() => {
    // console.log(mapRef.current);
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: zoom,
      center: center,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      id="mps"
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
}

export default Map;
