import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppText from "../assets/components/AppText";
import colors from "../config/colors";
import ListItem from "../assets/components/ListItem";

function ListingDetailsScreen(props) {
  return (
    <View>
      <Image
        style={styles.image}
        source={require("../assets/images/jacket.jpg")}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>Red jacket for sale</AppText>
        <AppText style={styles.price}>$100</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/images/123.jpg")}
            title="Emmanuel"
            subTitle="10 Listings"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
