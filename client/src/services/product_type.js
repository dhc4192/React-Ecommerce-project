import axios from "axios";

export const getProductTypes = async () =>
  await axios.get(`${process.env.REACT_APP_API}/product_types`);

export const getProductType = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product_type/${slug}`);

export const deleteProductType = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product_type/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateProductType = async (slug, product_type, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product_type/${slug}`,
    product_type,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createProductType = async (product_type, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/product_type`, product_type, {
    headers: {
      authtoken,
    },
  });

export const getFoodTypes = async (_id) =>
  await axios.get(
    `${process.env.REACT_APP_API}/product_type/food_types/${_id}`
  );
export const getTreatTypes = async (_id) =>
  await axios.get(
    `${process.env.REACT_APP_API}/product_type/treat_types/${_id}`
  );
export const getSupplyTypes = async (_id) =>
  await axios.get(
    `${process.env.REACT_APP_API}/product_type/supply_types/${_id}`
  );
