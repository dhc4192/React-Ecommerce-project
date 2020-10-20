import axios from "axios";

export const getProductCategories = async () =>
  await axios.get(`${process.env.REACT_APP_API}/product_categories`);

export const getProductCategory = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/product_category/${slug}`);

export const deleteProductCategory = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/product_category/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateProductCategory = async (
  slug,
  product_category,
  authtoken
) =>
  await axios.put(
    `${process.env.REACT_APP_API}/product_category/${slug}`,
    product_category,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createProductCategory = async (product_category, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/product_category`,
    product_category,
    {
      headers: {
        authtoken,
      },
    }
  );

export const getProductTypes = async (_id) =>
  await axios.get(
    `${process.env.REACT_APP_API}/product_category/product_types/${_id}`
  );
