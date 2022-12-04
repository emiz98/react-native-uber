import { View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  selectPolyline,
  setOrigin,
} from "../slices/navSlice";
import Start from "./markers/Start";
import End from "./markers/End";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const polyline = useSelector(selectPolyline);
  const dispatch = useDispatch();

  return (
    <View className="h-full">
      <MapView
        rotateEnabled={false}
        key={destination}
        className="h-full"
        initialRegion={{
          latitude: destination
            ? (origin?.location?.lat + destination?.location?.lat) / 2
            : origin?.location?.lat,
          longitude: destination
            ? (origin?.location?.lon + destination?.location?.lon) / 2
            : origin?.location?.lon,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lon,
          }}
          title="My Location"
        >
          <Start />
        </Marker>
        {destination && (
          <Marker
            draggable
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lon,
            }}
            title="Destination"
          >
            <End />
          </Marker>
        )}
        <Polyline coordinates={polyline} strokeColor={"#000"} strokeWidth={3} />
      </MapView>
    </View>
  );
};

export default Map;
