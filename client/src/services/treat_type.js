import axios from "axios";

export const getTreatTypes = async () =>
  await axios.get(`${process.env.REACT_APP_API}/treat_types`);

export const getTreatType = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API}/treat_type/${slug}`);

export const deleteTreatType = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/treat_type/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateTreatType = async (slug, treat_type, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/treat_type/${slug}`,
    treat_type,
    {
      headers: {
        authtoken,
      },
    }
  );

export const createTreatType = async (treat_type, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/treat_type`, treat_type, {
    headers: {
      authtoken,
    },
  });
