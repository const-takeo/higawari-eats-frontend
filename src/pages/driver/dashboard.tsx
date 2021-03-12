import { gql, useMutation, useSubscription } from "@apollo/client";
import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ALL_ORDER_FRAGMENT } from "../../fragments";
import { cookedOrders } from "../../__generated__/cookedOrders";
import { takeOrder, takeOrderVariables } from "../../__generated__/takeOrder";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...AllOrderParts
    }
  }
  ${ALL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      error
      ok
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}
const GOOGLEKEY = String(process.env.REACT_APP_GOOGLE_API_KEY);
const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚘</div>;

export const DashBoard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lat: 0, lng: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const onSuccess = (position: GeolocationPosition) => {
    const {
      coords: { latitude, longitude },
    } = position;
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  const onAPiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          //   location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
          // address:cookedOrdersData?.cookedOrders.restaurant.
        },
        (results, status) => {
          console.log(results);
          console.log(status);
        }
      );
    }
  }, [driverCoords.lat, driverCoords.lng, map, maps]);
  const makeRoute = () => {
    const directionService = new google.maps.DirectionsService();
    const directionRender = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: "#ff9f43",
      },
    });
    if (map) {
      directionRender.setMap(map);
      directionService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.05,
              driverCoords.lng + 0.05
            ),
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, _) => {
          directionRender.setDirections(result);
        }
      );
    }
  };

  const { data: cookedOrdersData } = useSubscription<cookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedOrdersData]);

  const history = useHistory();
  const onCompleted = (data: takeOrder) => {
    if (data.takeOrder.ok) {
      history.push(`/orders/${cookedOrdersData?.cookedOrders.id}`);
    }
  };
  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION,
    {
        onCompleted,
    }
  );
  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
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
          bootstrapURLKeys={{
            key: GOOGLEKEY,
          }}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
      <div className="max-w-sm mx-auto bg-white relative -top-10 shadow-lg py-8  px-5">
        {cookedOrdersData?.cookedOrders.restaurant ? (
          <>
            <h1 className="text-center text-3xl font-medium">新しいご注文</h1>
            <h4 className="text-center my-3 text-2xl font-medium">
              ピックアップ! @ {cookedOrdersData?.cookedOrders.restaurant?.name}
            </h4>
            <button className="btn w-full mt-5" onClick={makeRoute}>
              ルートを見る
            </button>
            <button
              className="btn w-full mt-5"
              onClick={() => triggerMutation(cookedOrdersData.cookedOrders.id)}
            >
              test
            </button>
            <Link
              to={`/orders/${cookedOrdersData?.cookedOrders.id}`}
              className="btn w-full mt-5 block text-center"
            >
              注文を受け取る &rarr;
            </Link>
          </>
        ) : (
          <h1 className="text-center text-3xl font-medium">待機中...</h1>
        )}
      </div>
    </div>
  );
};
