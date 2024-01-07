import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  AppFormPicker,
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

  const handleSubmit = async (product, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("url", product.images[0]);
    formData.append("thumbnailUrl", product.images[0]);
    formData.append("price", product.price);
    formData.append("categoryId", product.category.value.toString());
    formData.append("userId", "123");
    formData.append(
      "Longitude",
      location && location.longitude ? location.longitude.toString() : ""
    );
    formData.append(
      "Latitude",
      location && location.latitude ? location.latitude.toString() : ""
    );

    try {
      const response = await axios.post(
        "https://aguramarketapi.onrender.com/AguraMarket/products/addNewProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(progress);
          },
        }
      );

      if (response.data.success) {
        setUploadVisible(false);
        resetForm();
      } else {
        console.error("Error adding product:", response.data.message);
        setUploadVisible(false);
        alert("Could not save this product");
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      setUploadVisible(false);
      alert("Could not save this product");
    }
  };

  // const handleSubmit = async (product, { resetForm }) => {
  //   setProgress(0);
  //   setUploadVisible(true);
  //   const result = await listingsApi.addProduct(
  //     { ...product, location },
  //     (progress) => setProgress(progress)
  //   );

  //   if (!result.ok) {
  //     setUploadVisible(false);
  //     console.error(
  //       "Error saving product:",
  //       result.originalError || result.problem
  //     );
  //     return alert("Could not save this product");
  //   }

  //   resetForm();
  // };

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
