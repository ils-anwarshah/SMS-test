import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = `https://api.restful-api.dev/objects`;

export const getTestData = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};

const useTestQueries = () =>
  useQuery({
    queryKey: ['test-data'],
    queryFn: getTestData,
  });

const getTestDetailsByID = async id => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
  }
};

export const useTestDetailsQuery = id =>
  useQuery({
    queryKey: ['test-datails', id],
    queryFn: () => getTestDetailsByID(id),
  });

const updateTestDetails = async ({id, data}) => {
  // console.log('Updating test details:', id, data);

  try {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Error updating test details:', error.response);
    throw error; // Ensure React Query knows about the error
  }
};

export const useUpdateTestDetails = () =>
  useMutation({
    mutationFn: updateTestDetails,
  });

const addTestDetails = async data => {
  console.log('Adding test details:', data);

  try {
    const res = await axios.post(`${BASE_URL}`, data);
    // console.log('res', res);
    return res.data;
  } catch (error) {
    console.error('Error adding test details:', error.response);
    throw error; // Ensure React Query knows about the error
  }
};
export const useAddTestDetails = () =>
  useMutation({
    mutationFn: addTestDetails,
  });

const getPhotos = async ({pageParam}) => {
  try {
    const res = await axios.get(
      `https://api.pexels.com/v1/curated?page=${pageParam}`,
      {headers: {Authorization: process.env.VIDEO_API_KEY}},
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching videos:', error?.response);
  }
};

export const useSamplePhotos = () =>
  useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: getPhotos,
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      return lastPage?.next_page ? lastPage?.page + 1 : undefined;
    },
    select: data => ({
      photos: data.pages?.flatMap(page => page.photos),
    }),
  });

export default useTestQueries;
