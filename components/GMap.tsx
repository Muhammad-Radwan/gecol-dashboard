"use effect";
import { apiUrl } from "@/lib/Constants";
import { MeterLocationsType } from "@/lib/MeterLocationsType";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const containerStyle = {
  width: "75%",
  height: "600px",
};

interface props {
  companyGuid: string;
}

const Map = ({ companyGuid }: props) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAITueVRuon10PYXEojy-SjKMTM1zRD31Q",
  });

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

  useEffect(() => {
    if (map && Array.isArray(meterData) && meterData.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      meterData!.forEach(({ latitude, longitude }) => {
        bounds.extend(new window.google.maps.LatLng(latitude, longitude));
      });
      map.fitBounds(bounds);
    }
  }, [map, meterData]);

  if (!isLoaded || typeof window === "undefined") return <Loader2 />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={(mapInstance: google.maps.Map) => {
        setMap(mapInstance);
        mapRef.current = mapInstance;
      }}
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
