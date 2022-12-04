import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { store } from "./store";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import { Provider } from "react-redux";
import "react-native-gesture-handler";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  const client = new ApolloClient({
    uri: "https://uber-mobile.vercel.app/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Stack.Navigator
                screenOptions={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                }}
              >
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
              <StatusBar style="auto" />
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}
