import { Card, Typography } from '@material-tailwind/react';
import { useQuery } from '@apollo/client';
import { GET_VIOLATIONS } from '@/graphql/queries';
import { useEffect, useState } from 'react';
import Table from '@/components/Table/Table';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import NavBar from '@/components/NavBar/NavBar';
import routes from '@/routes';
import CardHeader from '@/components/CardHeader';
import Table2 from '@/components/Table/Table2';
import ViolationsTable from '@/components/Table/ViolationsTable';

export function ViolationsPage() {
  const { loading, error, data } = useQuery(GET_VIOLATIONS);
  const [violations, setViolations] = useState();
  const [tableHead, setTableHead] = useState();
  const filterTableHeads = [
    '__typename',
    'id',
    'vehicleId',
    'violationTypeId',
    'officerId',
  ];
  const tHeaders = [
    // 'violationType',
    'violationName',
    'description',
    'plateNumber',
    'status',
    // 'officer',
    'timestamp',
  ];

  useEffect(() => {
    if (data) {
      setViolations(data.violations);
      setTableHead(
        data && data.violations.length !== 0 && Object.keys(data.violations[0])
      );
    }
  }, [data]);

  return (
    <div className="justify-evenly m-0 px-4 flex-wrap md:flex-nowrap overflow-y-auto border-l pl-4">
      <div className="w-full ">
        <CardHeader title={'Violations'} />
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <LoadingScreen size={5} color="blue" className="mr-2" />
            <span>Loading...</span>
          </div>
        ) : (
          <div>
            {/* <Table
              data={violations}
              tableHead={tHeaders}
              filterSearchField={filterTableHeads}
            /> */}
            <ViolationsTable
              data={violations}
              filterKeysValues={filterTableHeads}
              itemsPerPage={6}
              customCell={'status'}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViolationsPage;
