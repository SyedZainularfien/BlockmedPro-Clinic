import React, { FC } from 'react';

import { Button } from '@/components/shared/button';
import DataTable from '@/components/shared/data-table';
import Iconify from '@/components/shared/iconify';
import { Typography } from '@/components/shared/typography';
import { content } from '@/data';
import { PrescriptionRowProps, PrescriptionTableProps } from '@/types';

const PrescriptionRow: FC<PrescriptionRowProps> = React.memo(
  ({
    idx,
    id,
    medicine: initialMedicine,
    salt: initialSalt,
    formulation: initialFormulation,
    quantity: initialQuantity,
    dosage: initialDosage,
    duration: initialDuration,
    isEditing,
    onEdit,
    onSave,
    onChange,
    onDelete,
  }: any) => {
    const [editData, setEditData] = React.useState({
      medicine: initialMedicine,
      salt: initialSalt,
      formulation: initialFormulation,
      quantity: initialQuantity,
      dosage: initialDosage,
      duration: initialDuration,
    });

    const handleLocalChange = (field: string, value: string) => {
      setEditData((prev) => ({ ...prev, [field]: value }));
    };

    const handlePreceptionSave = () => {
      onChange(id, editData);
      onSave(id);
    };

    return (
      <tr
        style={{
          textWrap: 'nowrap',
          backgroundColor: idx % 2 === 0 ? 'rgba(237, 237, 237, 0.8)' : 'rgba(237, 237, 237, 0.2)',
        }}
        key={`prescription-row-${id}`}
      >
        {/* Medicine */}
        <td className="px-4 sm:px-6 py-2.5 text-start">
          {isEditing ? (
            <input
              type="text"
              value={editData.medicine}
              onChange={(e) => handleLocalChange('medicine', e.target.value)}
              className="text-dark-gray text-md border border-gray max-w-[100px] rounded-md px-2 py-2 outline-none"
              autoFocus
            />
          ) : (
            <Typography size={'md'} className="text-dark-gray font-normal">
              {initialMedicine || '--'}
            </Typography>
          )}
        </td>

        {/* Salt */}
        <td className="px-4 sm:px-6 py-2.5 text-start">
          {isEditing ? (
            <input
              type="text"
              value={editData.salt}
              onChange={(e) => handleLocalChange('salt', e.target.value)}
              className="text-dark-gray text-md border border-gray max-w-[100px] rounded-md px-2 py-2 outline-none"
            />
          ) : (
            <Typography size={'md'} className="text-dark-gray font-normal">
              {initialSalt || '--'}
            </Typography>
          )}
        </td>

        {/* Formulation */}
        <td className="px-4 sm:px-6 py-2.5 text-start">
          {isEditing ? (
            <input
              type="text"
              value={editData.formulation}
              onChange={(e) => handleLocalChange('formulation', e.target.value)}
              className="text-dark-gray text-md border border-gray max-w-[100px] rounded-md px-2 py-2 outline-none"
            />
          ) : (
            <Typography size={'md'} className="text-dark-gray font-normal">
              {initialFormulation || '--'}
            </Typography>
          )}
        </td>

        {/* Quantity */}
        <td className="px-4 sm:px-6 py-2.5 text-start">
          {isEditing ? (
            <input
              type="text"
              value={editData.quantity}
              onChange={(e) => handleLocalChange('quantity', e.target.value)}
              className="text-dark-gray text-md border border-gray max-w-[100px] rounded-md px-2 py-2 outline-none"
            />
          ) : (
            <Typography size={'md'} className="text-dark-gray font-normal">
              {initialQuantity || '--'}
            </Typography>
          )}
        </td>

        {/* Dosage */}
        <td className="px-4 sm:px-6 py-2.5 text-start">
          {isEditing ? (
            <input
              type="text"
              value={editData.dosage}
              onChange={(e) => handleLocalChange('dosage', e.target.value)}
              className="text-dark-gray text-md border border-gray max-w-[100px] rounded-md px-2 py-2 outline-none"
            />
          ) : (
            <Typography size={'md'} className="text-dark-gray font-normal">
              {initialDosage || '--'}
            </Typography>
          )}
        </td>

        {/* Duration */}
        <td className="px-4 sm:px-6 py-2.5 text-start">
          {isEditing ? (
            <input
              type="text"
              value={editData.duration}
              onChange={(e) => handleLocalChange('duration', e.target.value)}
              className="text-dark-gray text-md border border-gray max-w-[100px] rounded-md px-2 py-2 outline-none"
            />
          ) : (
            <Typography size={'md'} className="text-dark-gray font-normal">
              {initialDuration || '--'}
            </Typography>
          )}
        </td>
        {/* Actions */}
        <td className="px-4 sm:px-6 py-2.5 text-start">
          <div className="flex justify-center items-center gap-2">
            {isEditing ? (
              <Iconify
                icon="qlementine-icons:check-tick-24"
                width="30"
                height="30"
                className="text-[#098B0D] p-1 border-1 border-[#098B0D] rounded-md cursor-pointer"
                onClick={handlePreceptionSave}
              />
            ) : (
              <Iconify
                icon="mingcute:edit-2-fill"
                width="30"
                height="30"
                className="text-primary-light p-1 border-1 border-primary-light rounded-md cursor-pointer"
                onClick={() => onEdit(id)}
              />
            )}
            <Iconify
              icon="weui:delete-filled"
              width="30"
              height="30"
              className="text-red p-1 border-1 border-red rounded-md cursor-pointer"
              onClick={() => onDelete(id)}
            />
          </div>
        </td>
      </tr>
    );
  }
);
PrescriptionRow.displayName = 'PrescriptionRow';

const PrescriptionTable: FC<PrescriptionTableProps> = ({
  prescriptionTableData,
  setPrescriptionTableData,
  editingId,
  setEditingId,
}) => {
  const handleEdit = (id: number) => {
    setEditingId(id);
    setPrescriptionTableData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, isEditing: true } : item))
    );
  };

  const handleSave = (id: number) => {
    setEditingId(null);
    setPrescriptionTableData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, isEditing: false } : item))
    );
  };

  const handleAdd = () => {
    const newId = prescriptionTableData.length > 0 ? Math.max(...prescriptionTableData.map((item) => item.id)) + 1 : 1;

    const newRow = {
      id: newId,
      medicine: '',
      salt: '',
      formulation: '',
      quantity: '',
      dosage: '',
      duration: '',
      isEditing: true,
    };

    // Prepend the new row instead of appending
    setPrescriptionTableData([newRow, ...prescriptionTableData]);
    setEditingId(newId);
  };

  const handleDelete = (id: number) => {
    setPrescriptionTableData((prevData) => prevData.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-start gap-3 sm:items-center px-4 sm:px-6 pt-3">
        <Typography size={'xl'} className="text-black font-bold">
          Prescription
        </Typography>
        <Button onClick={handleAdd}>Add Prescription</Button>
      </div>
      <hr className="text-light-gray w-full" />
      <div className="max-h-[370px] overflow-auto custom-scrollbar">
        <DataTable
          tableRows={prescriptionTableData}
          ColumnsData={content?.columns?.prescriptionAndRecordsColumn}
          headerColor="bg-white"
          headerClassName="text-black"
          TableBodyRow={(rowData: any) => (
            <PrescriptionRow
              {...rowData}
              onEdit={handleEdit}
              onSave={handleSave}
              onChange={(id: number, data: any) => {
                setPrescriptionTableData((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
              }}
              onDelete={handleDelete}
            />
          )}
        />
      </div>
    </div>
  );
};

export default PrescriptionTable;
