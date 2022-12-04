import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import NavFavorites from "./NavFavorites";
import { GET_SUGGESTIONS } from "../queries";
import { selectOrigin, setDestination, setPolyline } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";

const NavigateCard = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_SUGGESTIONS, {
    variables: { searchString: search },
  });

  useEffect(() => {
    dispatch(setPolyline([]));
    dispatch(setDestination(null));
  }, []);

  const fetchRoutes = async (end_lat, end_lon) => {
    return fetch(
      `https://router.project-osrm.org/route/v1/driving/${origin.location.lon},${origin.location.lat};${end_lon},${end_lat}?geometries=geojson`
    )
      .then((response) => response.json())
      .then((json) => {
        let coords = [];
        const coordinates = json?.routes[0].geometry.coordinates;
        const coordinatesLength = json?.routes[0].geometry.coordinates.length;
        for (let i = 0; i < coordinatesLength; i++) {
          coords.push({
            latitude: coordinates[i][1],
            longitude: coordinates[i][0],
          });
        }
        dispatch(setPolyline(coords));
        navigation.navigate("RideOptionsCard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView className="bg-white flex-1 rounded-t-xl">
        <Text className="text-xl mb-5 font-medium ml-5">
          Good Morning, EmiZ!
        </Text>
        <View
          className="flex-row items-center justify-between border px-5 py-3 mx-5 
        border-gray-500 rounded-lg"
        >
          <View className="flex-row items-center gap-x-3">
            <MagnifyingGlassIcon fill="gray" />
            <TextInput
              className="w-3/4"
              onChangeText={(value) => {
                setSearch(value);
                refetch({ searchString: value });
              }}
              value={search}
              placeholder="Where To?"
            />
          </View>
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearch("");
              }}
            >
              <XMarkIcon fill="black" size={20} />
            </TouchableOpacity>
          )}
        </View>
        {data?.suggestions.length > 0 ? (
          <FlatList
            className="mx-5 my-2"
            data={data?.suggestions}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={item.place_id}
                onPress={() => {
                  dispatch(
                    setDestination({
                      location: {
                        lat: parseFloat(item.lat),
                        lon: parseFloat(item.lon),
                      },
                      description: item.display_name,
                    })
                  );
                  fetchRoutes(item.lat, item.lon);
                }}
                className="flex-row items-center p-5 gap-x-3 bg-gray-100 rounded-xl mb-1"
              >
                <View>
                  <Text className="font-medium line-clamp-2">
                    {item.display_name.slice(0, 75) + "..."}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <NavFavorites />
        )}
        {/* <View className="flex-row mx-5 bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          className="bg-black w-24 px-4 py-3 rounded-full"
        >
          <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex w-24 px-4 py-3 rounded-full">
          <Text className="text-black text-center">Eats</Text>
        </TouchableOpacity>
      </View> */}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default NavigateCard;
