import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

interface ICoords {
  lat: number;
  lng: number;
}

export const DashBoard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<any>();
  const [maps, setMaps] = useState<any>();
  const onSuccess = (position: GeolocationPosition) => {
    const {
      coords: { latitude, longitude },
    } = position;
    setDriverCoords({ lat: latitude, lng: longitude });
    console.log(latitude, longitude);
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    }
  }, [driverCoords.lat, driverCoords.lng]);
  const onAPiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };
  return (
    <div>
      <div
        style={{ width: window.innerWidth, height: "50vh" }}
        className="overflow-hidden"
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onAPiLoaded}
          defaultZoom={16}
          defaultCenter={{ lat: 35.7594578, lng: 139.67185949999998 }}
          bootstrapURLKeys={{ key: "AIzaSyCmkLHf7k00Rt8rgI8SzCVpg2buOPKaDvI" }}
        >
          <div
            className="text-lg"
            //@ts-ignore
            lat={driverCoords.lat}
            lng={driverCoords.lng}
          >
            🚘
          </div>
        </GoogleMapReact>
      </div>
    </div>
  );
};
