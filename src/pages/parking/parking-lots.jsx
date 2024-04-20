import { Card, Typography } from '@material-tailwind/react';
import { useQuery } from '@apollo/client';
import { GET_PARKING_LOTS, GET_VIOLATIONS } from '@/graphql/queries';
import { useEffect, useState } from 'react';
import Table from '@/components/Table/Table';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import NavBar from '@/components/NavBar/NavBar';
import routes from '@/routes';
import CardHeader from '@/components/CardHeader';
import Table2 from '@/components/Table/Table2';
import CreateParkingLotNodal from '@/components/ModalForms/ParkingLot/CreateParkingLotModal';

export function ParkingLots() {
  const pageTitle = 'Parking Lots'
  const { loading, error, data } = useQuery(GET_PARKING_LOTS);
  const [parkingLots, setParkingLots] = useState();
  const [tableHead, setTableHead] = useState();
  const filterTableHeads = [
    '__typename',
    'id',
    'initialZoom',
    'longitude',
    'latitude',
    'parkingSlots',
    'parkingRates'
  ];
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (data) {
      setParkingLots(data.parkingLots);
      setTableHead(data && Object.keys(data.parkingLots[0]));
    }
  }, [data]);

   const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="justify-evenly m-0 px-4 flex-wrap md:flex-nowrap overflow-y-auto border-l pl-4">
      <div className="w-full ">
        <CardHeader title={pageTitle} />
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <LoadingScreen size={5} color="blue" className="mr-2" />
            <span>Loading...</span>
          </div>
        ) : (
          <div>
           
            <Table2
              data={parkingLots}
              filterKeysValues={filterTableHeads}
              itemsPerPage={6}
              customCell={'status'}
              modalTitle={pageTitle}
              >
                <button
                className="bg-primary rounded-xl text-white p-4"
                onClick={handleOpenModal}
              >
                Add New Parking Lot
                </button>
              </Table2>
              <CreateParkingLotNodal openModal={isOpen}
              closeModal={handleOpenModal} />
              
          </div>
        )}
      </div>
    </div>
  );
}

export default ParkingLots;
