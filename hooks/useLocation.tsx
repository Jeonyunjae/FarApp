import * as Location from "expo-location";
import { locationVar } from "../apollo";
 
export const useCurrentLatitude = async () => {
  let location = await Location.getCurrentPositionAsync({});
  return location.coords.latitude;
};

export const useCurrentLongitude = async () => {
  let location = await Location.getCurrentPositionAsync({});
  return location.coords.longitude;
};
