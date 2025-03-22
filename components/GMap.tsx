
import { apiUrl } from "@/lib/Constants";
import { MeterLocationsType } from "@/lib/MeterLocationsType";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const containerStyle = {
  width: "75%",
  height: "600px",
};

const center = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude
};

const Map = () => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    console.log(map);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/MeterInstallations/MetersLocationsByCompany?CompanyGuid=e8a7299e-80db-4f3a-b176-0af88762e79c`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error("لا يمكن عرض مواقع العدادات في الوقت الحالي");
      return [];
    }
  };

  const { data: meterData } = useQuery<MeterLocationsType[]>({
    queryKey: ["meterData"],
    queryFn: fetchData,
  });

  if (!isLoaded || typeof window === "undefined") return <p>Loading...</p>;

  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || center}
        zoom={15}
        onLoad={(map) => setMap(map)}
      >
        {/* Marker */}

        {meterData?.map((x) => (
          <Marker
            key={x.newMeterNumber}
            title={x.barcode}
            position={{ lat: x.latitude, lng: x.longitude }}
          />
        ))}
      </GoogleMap>
    
  );
};

export default Map;
