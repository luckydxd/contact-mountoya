import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";

function FitBounds({ locations }) {
  const map = useMap();
  useEffect(() => {
    if (locations && locations.length > 0) {
      const bounds = locations.map((loc) => [loc.lat, loc.lng]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);
  return null;
}

export default function ContactsMap({ contacts }) {
  const locations = contacts.map((c) => c.location);

  return (
    <div className="h-80 w-full rounded-xl overflow-hidden shadow-lg mb-8 border border-gray-200">
      <MapContainer
        center={[-6.2088, 106.8456]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {contacts.map((contact) => (
          <Marker
            key={contact.id}
            position={[contact.location.lat, contact.location.lng]}
          >
            <Popup>
              <div className="flex items-center space-x-3">
                <img
                  src={contact.photo}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.phone}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <FitBounds locations={locations} />
      </MapContainer>
    </div>
  );
}
