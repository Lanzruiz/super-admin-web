import { Button, Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useReducer, useState } from 'react';
import Modal from '../Modal';
import { GET_VEHICLE, GET_VIOLATION_TYPE } from '@/graphql/queries';
import { useQuery } from '@apollo/client';

export default function Table({
  data,
  tableHead,
  searchQuery: propSearchQuery,
  filterSearchField,
}) {
  const [filteredTHeads, setFilterTHeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState(propSearchQuery || ''); // Initialize searchQuery state with the value from propSearchQuery
  const [currentPage, setCurrentPage] = useState(1);
  const [rowData, setRowData] = useState(null); // State to store clicked row data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 8;

  const statusCode = ['unresolved', 'resolved', 'pending'];

  useEffect(() => {
    if (data) {
      setFilterTHeads(
        Object.keys(data[0] || {}).filter(
          (fil) => !filterSearchField.includes(fil)
        )
      );
    }
  }, [data, filterSearchField]);

  useEffect(() => {
    if (searchQuery !== '') {
      setCurrentPage(1); // Set currentPage to 1 when searchQuery is not empty
    }
  }, [searchQuery]);

  const toTitleCase = (str) => {
    // return str.replace(/\b\w/g, (char) => char.toUpperCase());
    return str.toUpperCase();
  };

  // Check if data is undefined or null, if so, set it to an empty array
  if (!data) {
    data = [];
  }

  const filteredData = data.filter((item) =>
    filteredTHeads.some(
      (key) =>
        (item[key] &&
          item[key]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (key === 'violationType' &&
          item[key] &&
          item[key].description &&
          item[key].description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()))
    )
  );

  // PAGINATION
  const totalFilteredItems = filteredData.length;
  const totalPages = Math.ceil(totalFilteredItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // FUNCTIONS
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCellClick = (rowData) => {
    setRowData(rowData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-end mb-4">
        <div className="w-1/4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 "
          />
        </div>
      </div>
      <Card className="h-full w-full overflow-auto shadow-xl relative">
        <table className="w-full min-w-max table-auto text-left rounded-lg">
          <thead>
            <tr>
              {/* This is for the table head */}
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50  py-2 text-left"
                >
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 p-4 text-primary"
                    style={{
                      fontWeight: 'bolder',
                      fontSize: '1rem',
                      textAlign: `${head === 'status' && 'center'} `,
                    }}
                  >
                    {namingFix.find((item) =>
                      Object.keys(item).includes(head)
                    )?.[head] !== undefined
                      ? namingFix.find((item) =>
                          Object.keys(item).includes(head)
                        )[head]
                      : head || ''}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* This is for the row data */}
            {currentData.map((el, index) => (
              <tr key={index} className="even:bg-blue-gray-50/50 ">
                {tableHead.map((keyName, columnIndex) => (
                  <td
                    key={columnIndex}
                    className="px-2 py-2  text-left text-xs"
                    style={{
                      width: 'auto',
                      textAlign: `${keyName === 'status' ? 'center' : 'left'}`,
                      cursor: 'pointer',
                      // transition: 'background-color 0.3s',
                    }}
                    onClick={() => handleCellClick(el)}
                  >
                    {el[keyName] != null ? (
                      <div className="p-2">
                        {/* {typeof el[keyName] === 'object' &&
                          Object.entries(el[keyName]).map(
                            ([key, value]) =>
                              key === 'vehicleCode' && (
                                <div key={key}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                    style={{
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {value || ''}
                                  </Typography>
                                </div>
                              )
                          )} */}
                        {statusCode.includes(el[keyName].toLowerCase()) && (
                          <Typography
                            className={`p-2 rounded-lg text-center font-bold xl:w-1/2 lg:w-full text-xs border ${el[keyName].toLowerCase() !== 'resolved' ? (el[keyName].toLowerCase() === 'pending' ? 'border-orange-400 text-orange-400' : 'border-red-600 text-red-600') : 'border-green-600 text-green-600'}`}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '9999px',
                              padding: '0.5rem 1rem',
                              width: '100%',
                              height: '100%',
                            }}
                          >
                            {el[keyName].toUpperCase() || ''}
                          </Typography>
                        )}
                        {keyName !== 'status' && (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            style={{
                              textTransform: 'uppercase',
                            }}
                          >
                            {el[keyName] || ''}
                          </Typography>
                        )}
                      </div>
                    ) : keyName === 'officer' ? (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        {el['officerId'] || ''}
                      </Typography>
                    ) : keyName === 'description' ? (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        style={{
                          textTransform: 'uppercase',
                        }}
                      >
                        {(el['violationType'] &&
                          el['violationType'].description &&
                          el['violationType'].description) ||
                          ''}
                      </Typography>
                    ) : (
                      keyName === 'timestamp' && (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{
                            textTransform: 'uppercase',
                          }}
                        >
                          {el['createdAt'] || ''}
                        </Typography>
                      )
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center p-4">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`mx-2 py-2 px-4 rounded-md bg-blue-200 text-black`}
            >
              Previous
            </button>
          )}

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const pageNumber = currentPage - 2 + i;
            return (
              pageNumber >= 1 &&
              pageNumber <= totalPages && (
                <button
                  key={i}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`mx-2 py-2 px-4 rounded-md ${
                    currentPage === pageNumber
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-200'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            );
          })}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`mx-2 py-2 px-4 rounded-md bg-blue-200 text-black`}
            >
              Next
            </button>
          )}
        </div>
      </Card>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal} rowData={rowData} />
      )}
      <Typography className="text-right font-semibold pt-6">{`Total Violations: ${totalFilteredItems}`}</Typography>
    </div>
  );
}
