import axios from "axios";
import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../assets/components/ActivityIndicator";
import AppButton from "../assets/components/AppButton";
import AppText from "../assets/components/AppText";
import Card from "../assets/components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../assets/components/Screen";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const fetchData = () =>
    axios.get(
      `https://aguramarketapi.onrender.com/AguraMarket/products/getAllProducts`
    );

  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi({
    apiFunc: fetchData,
  });

  useEffect(() => {
    loadListings(1, 2, 3);
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Couldn't retrieve the products.</AppText>
          <AppButton title="Retry" onPress={loadListings} />
        </>
      )}
      <ActivityIndicator visible={loading} />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"Rwf" + item.price}
            imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
