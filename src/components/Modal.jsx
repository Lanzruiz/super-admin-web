import { Button, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import '../../public/css/modal.css';
import { namingFix } from '@/data/namingFix';

const Modal = ({ isOpen, onClose, rowData }) => {
  const filteration = [
    '__typename',
    'id',
    'officerId',
    'vehicleId',
    'violationTypeId',
  ];

  const renderContent = () => {
    if (!rowData) return null;

    return Object.entries(rowData)
      .filter((fil) => !filteration.includes(fil[0]))
      .map(([key, value], index) => {
        let textColorClass = '';
        if (key === 'status') {
          if (value.toLowerCase() === 'resolved') {
            textColorClass = 'text-green-600';
          } else if (value.toLowerCase() === 'pending') {
            textColorClass = 'text-orange-400';
          } else {
            textColorClass = 'text-red-600';
          }
        }

        return (
          <div key={key} className="flex my-4 p-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal w-1/2 text-uppercase text-left"
              style={{
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >{`${namingFix.find((item) => Object.keys(item).includes(key))?.[key] !== undefined ? namingFix.find((item) => Object.keys(item).includes(key))[key] : key || ''}:`}</Typography>

            {key === 'violationType' ? (
              value ? (
                <Typography
                  variant="small"
                  color="blue-gray"
                  className={`font-bold w-full text-left pl-8 ${textColorClass}`}
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {value || ''}
                </Typography>
              ) : null
            ) : (
              <Typography
                variant="small"
                color="blue-gray"
                className={` font-bold w-full text-left  pl-8  ${textColorClass}`}
                style={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {value || ''}
              </Typography>
            )}
          </div>
        );
      });
  };

  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-content p-4 rounded-xl">
        {/* <span className="close" onClick={onClose}>
          &times;
        </span> */}
        <div>
          <Typography
            variant="h2"
            style={{
              fontSize: '1.5rem',
              padding: 16,
              textTransform: 'uppercase',
            }}
          >
            Violation Information
          </Typography>
        </div>
        <div className="grid-flow-col p-4">{renderContent()}</div>
        <div style={{ textAlign: 'center', marginTop: 'auto' }}>
          <Button
            onClick={onClose}
            style={{
              background: 'red',
            }}
            className="align-middle"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
