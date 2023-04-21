// pages/api/upload.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
export const API_URL_1 = "http://localhost:5000";
export const API_URL_2 = "https://alexandria-backend.herokuapp.com";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const apiRes = await axios.post(API_URL_2, req.body);
    res.status(200).json(apiRes.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    res.status(500).json({ error: axiosError.message });
  }
};

export default handler;
