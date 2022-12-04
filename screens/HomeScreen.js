import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavFavorites from "../components/NavFavorites";
import NavOptions from "../components/NavOptions";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/solid";
import { useQuery } from "@apollo/client";
import { GET_SUGGESTIONS } from "../queries";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { loading, error, data, refetch } = useQuery(GET_SUGGESTIONS, {
    variables: { searchString: search },
  });

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView>
          <View className="bg-white h-full p-5">
            <View className="flex-row justify-between items-center">
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png",
                }}
              />
              <View className="rounded-full border-2 border-black p-[2px]">
                <Image
                  className="rounded-full"
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                  }}
                  source={{
                    uri: "https://mir-s3-cdn-cf.behance.net/user/230/3ac51b127375695.63660f451d43f.jpg",
                  }}
                />
              </View>
            </View>
            <View
              className="flex-row items-center justify-between border px-5 py-3 mb-6 
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
                  placeholder="Where From?"
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
            {data?.suggestions.length > 0 && (
              <FlatList
                className="mb-5"
                data={data?.suggestions}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={item.place_id}
                    onPress={() => {
                      dispatch(
                        setOrigin({
                          location: {
                            lat: parseFloat(item.lat),
                            lon: parseFloat(item.lon),
                          },
                          description: item.display_name,
                        })
                      );
                      dispatch(setDestination(null));
                      navigation.navigate("MapScreen");
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
            )}

            <NavOptions search={search} />
            <NavFavorites />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
