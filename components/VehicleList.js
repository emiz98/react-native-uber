import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

const VehicleList = ({ vehicleData }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <FlatList
      className="flex-1"
      data={vehicleData}
      keyExtractor={(item) => item.name}
      renderItem={({ item: { name, image, estimated }, index }) => (
        <TouchableOpacity
          onPress={() => setSelectedIndex(index)}
          className={`flex-row items-center justify-between px-10 py-4 bg-gray-50 mb-2
            ${index == selectedIndex && "bg-gray-200"}`}
        >
          <View className="flex-row items-center gap-x-6">
            <Image
              style={{ width: 75, height: 75, resizeMode: "contain" }}
              source={{
                uri: `https://next-uber-dapp.vercel.app/original/${image}`,
              }}
            />
            <View>
              <Text className="text-xl font-semibold">{name}</Text>
              <Text>{estimated * 13} mins.</Text>
            </View>
          </View>
          <Text className="text-xl">Rs. {estimated * 125}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default VehicleList;
