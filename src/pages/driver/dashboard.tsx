import GoogleMapReact from "google-map-react";

export const DashBoard = () => {
  return (
    <div>
      <div
        style={{ width: window.innerWidth, height: "45vh" }}
        className="overflow-hidden"
      >
        <GoogleMapReact
          defaultZoom={20}
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          bootstrapURLKeys={{ key: "AIzaSyCmkLHf7k00Rt8rgI8SzCVpg2buOPKaDvI" }}
        >
          <h1>Hello</h1>
        </GoogleMapReact>
      </div>
    </div>
  );
};
