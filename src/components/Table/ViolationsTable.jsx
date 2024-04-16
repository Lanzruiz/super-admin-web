import { Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { namingFix } from '@/data/namingFix';
import Pagination from '../Pagination';
import StatusBadge from '../StatusBadge';
import Modal from '../Modal';
import Pagination2 from '../Pagination/Pagination2';
import SearchField from '../SearchField';
import { MoreHoriz, UnfoldMore } from '@mui/icons-material';

export default function ViolationsTable({
  data,
  headers,
  filterKeysValues,
  itemsPerPage,
  customCell,
  objectCellFinder,
  refetchData,
  children,
  triggerNotif,
}) {
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState({
    modalOpen: false,
    openUpdateModal: false,
    openDeleteModal: false,
  });
  const [rowData, setRowData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'
  const [anchorEl, setAnchorEl] = useState(null);
  // const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const totalData =
    filteredData.length !== 0 ? filteredData.length : tableData.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    filteredData.length !== 0
      ? filteredData.slice(startIndex, endIndex)
      : tableData.slice(startIndex, endIndex);

  useEffect(() => {
    if (data) {
      const modifiedData = data.map((item) => {
        const newData = { ...item };
        for (const key in newData) {
          if (typeof newData[key] === 'object' && newData[key] !== null) {
            // newData[key] = newData[key].description || '';
            newData[key] =
              newData[key].description ||
              (objectCellFinder && newData[key][objectCellFinder]) ||
              "Can't read data";
          }
        }
        return newData;
      });
      setTableData(modifiedData);
    }
    if (data && data.length > 0) {
      // Extracting keys from the first object in data
      const keys = Object.keys(data[0]);
      // Filter out unwanted keys, e.g., '__typename'
      const filteredKeys = filterKeysValues
        ? keys.filter((key) => !filterKeysValues.includes(key))
        : null;
      setTableHeaders(filteredKeys ? filteredKeys : keys);
    }
  }, [data, filterKeysValues]);

  useEffect(() => {
    if (sortColumn) {
      const sortedData = [
        ...(filteredData.length !== 0 ? filteredData : tableData),
      ].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (sortOrder === 'asc') {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      });

      setFilteredData(sortedData);
    } else {
      setFilteredData(tableData);
    }
  }, [sortColumn, sortOrder, tableData]);

  const handleSearch = () => {
    const filteredData = tableData.filter((item) =>
      tableHeaders.some(
        (key) =>
          item[key] &&
          item[key].toString().toLowerCase().trim() ===
            searchQuery.toLowerCase().trim() // Use === for exact match
      )
    );
    setFilteredData(filteredData);
    setCurrentPage(1);
  };

  const handleHeaderClick = (header) => {
    if (sortColumn === header) {
      // Toggle sorting order if the same column is clicked again
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Sort by the clicked column in ascending order by default
      setSortColumn(header);
      setSortOrder('asc');
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateModalData = (data) => {
    setRowData(data);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleCellClick = (rowData) => {
    setRowData(rowData);
    setIsModalOpen({
      ...isModalOpen,
      modalOpen: true,
    });
  };
  const openModal = (key) => {
    setIsModalOpen({
      ...isModalOpen,
      [key]: true,
    });
  };

  const closeModal = (key) => () => {
    setIsModalOpen({
      ...isModalOpen,
      [key]: false,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between mb-4">
        <SearchField
          searchQuery={searchQuery}
          handleSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        <div>{children}</div>
      </div>
      <div className="mb-2">
        <Pagination2
          postsPerPage={itemsPerPage}
          length={totalData}
          handlePagination={handlePageChange}
        />
      </div>

      <table className="table p-2">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => {
              // Find the customized header from namingFix
              const customHeader = namingFix.find((item) =>
                item.hasOwnProperty(header)
              );
              // Use the custom header if available, otherwise use the original header
              const displayHeader = customHeader
                ? customHeader[header]
                : header || '';
              return (
                <th
                  key={index}
                  scope="col"
                  className="border-b-2  border-gray-500 text-left py-6 px-4 w-min"
                  onClick={() => handleHeaderClick(header)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center">
                    <Typography
                      variant="small"
                      className="font-bold leading-none opacity-70 text-black"
                      style={{
                        fontWeight: 'bolder',
                        fontSize: '1rem',
                        textAlign: `${header === 'status' && 'center'}`,
                      }}
                    >
                      {displayHeader !== null ? displayHeader : 'N/A'}
                    </Typography>
                    <UnfoldMore />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {currentData.map((item, index) => (
            <tr key={index} className="even:bg-blue-gray-50 ">
              {tableHeaders.map((header, headerIndex) => {
                return (
                  <td
                    key={headerIndex}
                    className="py-8 px-4 text-left text-xs"
                    style={{
                      width: 'auto',
                      // textAlign: `${keyName === 'status' ? 'center' : 'left'}`,
                      cursor: 'pointer',
                      // transition: 'background-color 0.3s',
                    }}
                    onClick={() => handleCellClick(item)}
                  >
                    {/* Check if item has the corresponding key */}
                    {customCell && customCell === header && (
                      <StatusBadge
                        status={item.hasOwnProperty(header) ? item[header] : ''}
                      />
                    )}
                    {header !== customCell && (
                      <Typography>
                        {item.hasOwnProperty(header)
                          ? item[header] !== null
                            ? item[header]
                            : 'No Input'
                          : ''}
                      </Typography>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center p-4"></div>
      {isModalOpen.modalOpen && (
        <Modal
          isOpen={isModalOpen.modalOpen}
          onClose={closeModal('modalOpen')}
          rowData={rowData}
        />
      )}
    </div>
  );
}
