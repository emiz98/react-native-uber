import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useQuery } from "@apollo/client";
import { GET_VEHICLES } from "../queries";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import VehicleList from "./VehicleList";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const { loading, error, data, refetch } = useQuery(GET_VEHICLES);

  return (
    <SafeAreaView className="bg-white flex-grow">
      <View className="relative mb-2">
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          className="absolute ml-5 bg-gray-200 p-3 rounded-full z-10"
        >
          <ArrowLeftIcon fill="black" />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-medium text-xl">Select a Ride</Text>
          <Text className="text-center text-sm text-gray-500">15.6 Miles</Text>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 15 },
          tabBarActiveTintColor: "#000",
          tabBarIndicatorStyle: {
            backgroundColor: "#000",
          },
        }}
      >
        <Tab.Screen
          name="Featured"
          component={() => (
            <VehicleList vehicleData={data?.allVehicles?.featured} />
          )}
        />
        <Tab.Screen
          name="Wheels"
          component={() => (
            <VehicleList vehicleData={data?.allVehicles?.wheels} />
          )}
        />
        <Tab.Screen
          name="Extra"
          component={() => (
            <VehicleList vehicleData={data?.allVehicles?.extra} />
          )}
        />
      </Tab.Navigator>

      <TouchableOpacity className="m-5 bg-black px-10 py-5 rounded-lg items-center justify-center">
        <Text className="text-white text-lg font-medium">Choose</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
