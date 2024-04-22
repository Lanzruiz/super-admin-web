import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_PARKING_LOTS, GET_ROLES } from "@/graphql/queries";

const useParkingLots = () => {
  const { data, loading: parkingLotsLoading } = useQuery(GET_PARKING_LOTS);
  const [parkingLots, setParkingLots] = useState([]);

  useEffect(() => {
    if (data) {
      setParkingLots(data?.parkingLots);
    }
  }, [data]);

  return { parkingLots, parkingLotsLoading };
};

export default useParkingLots;
