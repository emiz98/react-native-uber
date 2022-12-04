import { useNavigation } from "@react-navigation/core";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const data = [
  {
    id: "1",
    title: "Get a ride",
    image: "https://next-uber-dapp.vercel.app/original/UberX.png",
    screen: "MapScreen",
  },
  {
    id: "2",
    title: "Order food",
    image:
      "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_956/v1619149395/assets/69/0d1c60-ccfb-4e10-966d-52ced7485737/original/benefit-card-savings-3x.png",
    screen: "EatScreen",
  },
];

const NavOptions = ({ search }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [myLoc, setMyLoc] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      setMyLoc(location);
    })();
  }, []);

  const navigateToMap = () => {
    dispatch(
      setOrigin({
        location: {
          lat: parseFloat(myLoc?.coords?.latitude),
          lon: parseFloat(myLoc?.coords?.longitude),
        },
      })
    );
    dispatch(setDestination(null));
    navigation.navigate("MapScreen");
  };

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => item.id == 1 && navigateToMap()}
            disabled={item.id == 1 && myLoc == null}
            className={`py-4 px-6 rounded-lg border border-gray-200 bg-gray-200 mr-3 ${
              item.id == 2 && "bg-[#f6f0ea]"
            } ${item.id == 1 && myLoc == null && "opacity-50"}`}
          >
            <View>
              <Image
                style={{ width: 120, height: 120, resizeMode: "contain" }}
                source={{
                  uri: item.image,
                }}
              />
              <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
              <View className="p-2 bg-black rounded-full w-10 mt-4">
                <ArrowRightIcon color="white" />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;
