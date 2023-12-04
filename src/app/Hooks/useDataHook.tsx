import { useEffect, useState } from "react";
export interface Users {
  id: number;
  name: string;
  email: string;
  role: string;
}
/**
 * useData hook is used for fetching users data
 * @returns Custom data fetching hook
 */
export const useData = () => {
  //! state for data fetching
  const [data, setData] = useState<Users[]>([]);
  //! user data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );

        if (!res.ok) {
          throw new Error("failed to fetched data");
        }

        const results = await res.json();
        setData(results);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return {
    data,
    setData,
  };
};
