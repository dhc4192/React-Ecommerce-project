import axios from "axios";

export const getFoodTypes = async () =>
  await axios.get(`${process.env.REACT_APP_API}/food_types`);

export const getFoodType = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/food_type/${slug}`);

export const deleteFoodType = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/food_type/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateFoodType = async (slug, food_type, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/food_type/${slug}`, food_type, {
    headers: {
      authtoken,
    },
  });

export const createFoodType = async (food_type, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/food_type`, food_type, {
    headers: {
      authtoken,
    },
  });
