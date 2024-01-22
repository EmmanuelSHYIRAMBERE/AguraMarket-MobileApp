import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../assets/components/ActivityIndicator";
import AppButton from "../assets/components/AppButton";
import AppText from "../assets/components/AppText";
import Card from "../assets/components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../assets/components/Screen";
import useApi from "../hooks/useApi";
import ListItem from "../assets/components/ListItem";
import ListItemDeleteIcon from "../assets/components/ListItemDeleteIcon";

function UserProductsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState(getListingsApi.data);

  const handleDelete = (product) => {
    setProducts(product.filter((m) => m.id !== product.id));
  };

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the products.</AppText>
            <AppButton title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subTitle={"Rwf" + item.price}
              renderRightActions={() => (
                <ListItemDeleteIcon onPress={() => handleDelete(item)} />
              )}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => getListingsApi.request()}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default UserProductsScreen;
