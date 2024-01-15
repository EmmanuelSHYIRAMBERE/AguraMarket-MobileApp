import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  SubmitButton,
} from "../assets/components/forms";
import CategoryPickerItem from "../assets/components/CategoryPickerItem";
import FormPicker from "../assets/components/forms/FormPicker";
import FormImagePicker from "../assets/components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import Screen from "../assets/components/Screen";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen(props) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // const handleSubmit = async () => {
  //   const form = new FormData();
  //   form.append("title", "test2");
  //   form.append(
  //     "url",
  //     "https://tse2.mm.bing.net/th?id=OIP.H2-GvYPICUONmDK834krdwHaEK&pid=Api&P=0&h=220"
  //   );
  //   form.append(
  //     "thumbnailUrl",
  //     "https://tse2.mm.bing.net/th?id=OIP.H2-GvYPICUONmDK834krdwHaEK&pid=Api&P=0&h=220"
  //   );
  //   form.append("price", "200");
  //   form.append("categoryId", "8345083");
  //   form.append("userId", "97234");
  //   form.append("Longitude", "location.longitude");
  //   form.append("Latitude", "location.latitude");
  //   const options = {
  //     method: "POST",
  //     url: "https://aguramarketapi.onrender.com/AguraMarket/products/addNewProduct",
  //     headers: {
  //       "Content-Type":
  //         "multipart/form-data; boundary=---011000010111000001101001",
  //     },
  //     data: form,
  //   };
  //   console.log(form);
  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };

  // const handleUpdate = async () => {
  //   // setIsLoading(false)
  //   formData.append("orderId", Order._id);
  //   formData.append("Image", {
  //     name: new Date() + "_picture",
  //     uri: Imager,
  //     type: "image/jpeg",
  //   });

  //   try {

  //     const response = await axios.put(
  //       "https://aguramarketapi.onrender.com/AguraMarket/products/addNewProduct",
  //       formData,
  //       {
  //         headers: {

  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log( "Order complete response",response.data);
  //     alert("order completed successfully");
  //     navigation.navigate("DeliverHome")
  //     setIsLoading(true)
  //     // navigation.navigate("TopTabDelivery", screen("TotalAmount"))
  //     navigation.navigate("TopTabDelivery")
  //   } catch (error) {
  //     console.log(error, "error to update");
  //   }
  // };

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    console.log(result);

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the product");
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppFormField maxLength={255} name="title" placeholder="Title" />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <FormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
export default ListingEditScreen;
