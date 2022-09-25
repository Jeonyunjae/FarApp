import { StyleSheet } from "react-native";
import { logUserOut } from "../../apollo";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import WebWiewPage from "./WebViewPage";

export default function StoreSearchPage() {
  return (
      <WebWiewPage />
  );
}
const styles = StyleSheet.create({
  webview: {
    top:10,
  }
});
