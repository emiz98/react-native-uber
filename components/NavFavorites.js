import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { BriefcaseIcon, HomeIcon } from "react-native-heroicons/solid";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Code Street, London, UK",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "London Eye, London, UK",
  },
];

const NavFavorites = () => {
  return (
    <FlatList
      className="mt-3"
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="bg-gray-100 h-[1px]" />}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity className="flex-row items-center p-5 gap-x-3 bg-gray-100 rounded-xl mb-1">
          <View className="mr-4 rounded-full bg-gray-300 p-3">
            {icon == "home" ? (
              <HomeIcon color="gray" />
            ) : (
              <BriefcaseIcon color="gray" />
            )}
          </View>
          <View>
            <Text className="font-semibold text-lg">{location}</Text>
            <Text className="text-gray-500">{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;
