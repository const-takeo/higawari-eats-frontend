import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

interface ICoords {
  lat: number;
  lng: number;
}

export const DashBoard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
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
  const onAPiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    console.log(map, maps);
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
  };
  return (
    <div>
      <div
        style={{ width: window.innerWidth, height: "45vh" }}
        className="overflow-hidden"
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onAPiLoaded}
          defaultZoom={15}
          defaultCenter={{ lat: 35.7594578, lng: 139.67185949999998 }}
          bootstrapURLKeys={{ key: "AIzaSyCmkLHf7k00Rt8rgI8SzCVpg2buOPKaDvI" }}
        ></GoogleMapReact>
      </div>
    </div>
  );
};
