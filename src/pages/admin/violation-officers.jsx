import { useQuery } from '@apollo/client';
import { GET_OFFICERS, GET_WEB_USERS } from '@/graphql/queries';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';
import CardHeader from '@/components/CardHeader';
import Table2 from '@/components/Table/Table2';
import CreateViolationAdminModal from '@/components/ModalForms/ViolationAdmin/CreateViolationAdminModal';
import CreateViolationOfficerModal from '@/components/ModalForms/ViolationOfficer/CreateViolationOfficerModal';
import RegularSnackBar from '@/components/Notification/RegularSnackBar';

export function ViolationsOfficer() {
  const { loading, error, data, refetch } = useQuery(GET_WEB_USERS);
  const [webUsers, setWebUsers] = useState();
  const [tableHead, setTableHead] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState({
    updateUserSnack: false,
    createOfficerSnack: false,
    deleteUserSnack: false,
  });

  const handleOpenModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpenSnack({
      updateUserSnack: false,
      createOfficerSnack: false,
      deleteUserSnack: false,
    });
  };

  const handleToggle = (key) => {
    setOpenSnack({
      ...openSnack,
      [key]: !openSnack[key],
    });
  };

  const filterTableHeads = [
    '__typename',
    'id',
    'vehicleId',
    'violationTypeId',
    'updatedAt',
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
      setWebUsers(
        data.getWebUsers.filter(
          (ea) => ea.role && ea.role.roleName === 'Violation Officer'
        )
      );
      setTableHead(
        data &&
          data.getWebUsers.length !== 0 &&
          Object.keys(data.getWebUsers[0])
      );
    }
  }, [data]);

  console.log(webUsers)

  return (
    <div className="justify-evenly m-0 px-4 flex-wrap md:flex-nowrap overflow-y-auto border-l pl-4">
      <div className="w-full ">
        <CardHeader title={'Violation Officers'} />
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <LoadingScreen size={5} color="blue" className="mr-2" />
            <span>Loading...</span>
          </div>
        ) : (
          <div>
            <Table2
              data={webUsers}
              filterKeysValues={filterTableHeads}
              itemsPerPage={6}
              objectCellFinder="roleName"
              refetchData={refetch}
              triggerNotif={handleToggle}
            >
              <button
                className="bg-primary rounded-xl text-white p-4"
                onClick={handleOpenModal}
              >
                Add New Officer
              </button>
            </Table2>

            <CreateViolationOfficerModal
              openModal={isOpen}
              closeModal={handleOpenModal}
              refetchData={refetch}
              triggerNotif={handleToggle}
            />

            <RegularSnackBar
              open={
                openSnack.updateUserSnack ||
                openSnack.createOfficerSnack ||
                openSnack.deleteUserSnack
              }
              handleClose={handleClose}
              duration={1000}
              message={
                openSnack.updateUserSnack
                  ? 'Update Successful!'
                  : openSnack.createOfficerSnack
                    ? 'User Created Successfully!'
                    : openSnack.deleteUserSnack
                      ? 'User Deleted Successfully!'
                      : ''
              }
              severity={'success'}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViolationsOfficer;