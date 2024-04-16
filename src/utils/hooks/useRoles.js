import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_ROLES } from '@/graphql/queries';

const useRoles = () => {
  const { data, loading: rolesLoading } = useQuery(GET_ROLES);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (data) {
      setRoles(data?.role?.filter((item) => item.roleName !== ''));
    }
  }, [data]);

  return { roles, rolesLoading };
};

export default useRoles;
