'use effect'
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

interface props {
  companyGuid: string
}

const Map = ({companyGuid} : props) => {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAITueVRuon10PYXEojy-SjKMTM1zRD31Q',
  });

  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
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
        }, {
          enableHighAccuracy: true
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/MeterInstallations/MetersLocationsByCompany?CompanyGuid=${companyGuid}`
      );
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
        zoom={16} 
      >

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
