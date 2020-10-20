import axios from "axios";

export const getSupplyTypes = async () =>
  await axios.get(`${process.env.REACT_APP_API}/supply_types`);

export const getSupplyType = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/supply_type/${slug}`);

export const createSupplyType = async (supply_type, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/supply_type`, supply_type, {
    headers: {
      authtoken,
    },
  });

export const updateSupplyType = async (slug, supply_type, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/supply_type/${slug}`,
    supply_type,
    {
      headers: {
        authtoken,
      },
    }
  );

export const deleteSupplyType = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/supply_type/${slug}`, {
    headers: {
      authtoken,
    },
  });
