import { useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { TouchableOpacity, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { selectDestination } from "../slices/navSlice";

const MapScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        className={`${
          destination != null ? "block" : "block"
        } absolute p-2 bg-black rounded-full z-50 top-12 left-5`}
      >
        <ChevronLeftIcon fill="white" size={30} />
      </TouchableOpacity>
      <View className="h-[50%]">
        <Map />
      </View>
      <View className="h-[50%]">
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
