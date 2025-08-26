import React, { useState, useEffect, useRef } from "react";
import ApplicationStatusDataTable from "../../../Widgets/ApplicationStatusDataTable/ApplicationStatusDataTable";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import "./ApplicationStatusTable.css";

const ApplicationStatusTable = ({
  search = "",
  selectedZone = "All Zones",
  selectedDgm = "All DGMs",
  selectedCampus = "All Campuses",
  studentCategory = { all: true },
  onDataFilter, // Callback to pass filtered data to parent
}) => {
  const [data, setData] = useState([
    { id: 1, applicationNo: "257164001", pro: "PRO 1", campus: "Campus A", dgm: "DGM A", zone: "Zone 1", date: "14, Aug 2025", status: "Sold", isSelected: false },
    { id: 2, applicationNo: "257164002", pro: "PRO 2", campus: "Campus B", dgm: "DGM B", zone: "Zone 2", date: "15, Aug 2025", status: "Sold", isSelected: false },
    { id: 3, applicationNo: "257164003", pro: "PRO 3", campus: "Campus C", dgm: "DGM C", zone: "Zone 3", date: "16, Aug 2025", status: "Damaged", isSelected: false },
    { id: 4, applicationNo: "257164004", pro: "PRO 4", campus: "Campus D", dgm: "DGM D", zone: "Zone 4", date: "17, Aug 2025", status: "With PRO", isSelected: false },
    { id: 5, applicationNo: "257164005", pro: "PRO 5", campus: "Campus E", dgm: "DGM E", zone: "Zone 5", date: "18, Aug 2025", status: "Sold", isSelected: false },
    { id: 6, applicationNo: "257164006", pro: "PRO 6", campus: "Campus F", dgm: "DGM F", zone: "Zone 6", date: "19, Aug 2025", status: "Confirmed", isSelected: false },
    { id: 7, applicationNo: "257164007", pro: "PRO 3", campus: "Campus C", dgm: "DGM C", zone: "Zone 3", date: "16, Aug 2025", status: "Damaged", isSelected: false },
    { id: 8, applicationNo: "257164008", pro: "PRO 4", campus: "Campus D", dgm: "DGM D", zone: "Zone 4", date: "17, Aug 2025", status: "With PRO", isSelected: false },
    { id: 9, applicationNo: "257164009", pro: "PRO 5", campus: "Campus E", dgm: "DGM E", zone: "Zone 5", date: "18, Aug 2025", status: "Sold", isSelected: false },
    { id: 10, applicationNo: "257164010", pro: "PRO 6", campus: "Campus F", dgm: "DGM F", zone: "Zone 6", date: "19, Aug 2025", status: "Confirmed", isSelected: false },
    { id: 11, applicationNo: "257164011", pro: "PRO 5", campus: "Campus E", dgm: "DGM E", zone: "Zone 5", date: "18, Aug 2025", status: "Sold", isSelected: false },
    { id: 12, applicationNo: "257164012", pro: "PRO 6", campus: "Campus F", dgm: "DGM F", zone: "Zone 6", date: "19, Aug 2025", status: "Confirmed", isSelected: false },
    { id: 13, applicationNo: "257164013", pro: "PRO 3", campus: "Campus C", dgm: "DGM C", zone: "Zone 3", date: "16, Aug 2025", status: "Damaged", isSelected: false },
    { id: 14, applicationNo: "257164014", pro: "PRO 4", campus: "Campus D", dgm: "DGM D", zone: "Zone 4", date: "17, Aug 2025", status: "With PRO", isSelected: false },
    { id: 15, applicationNo: "257164015", pro: "PRO 5", campus: "Campus E", dgm: "DGM E", zone: "Zone 5", date: "18, Aug 2025", status: "Sold", isSelected: false },
    { id: 16, applicationNo: "257164016", pro: "PRO 6", campus: "Campus F", dgm: "DGM F", zone: "Zone 6", date: "19, Aug 2025", status: "Confirmed", isSelected: false },
  ]);

  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    id: "",
    applicationNo: "",
    pro: "",
    campus: "",
    dgm: "",
    zone: "",
    date: "",
    status: "",
  });

  const columns = [
    { accessorKey: "applicationNo", header: "Application No" },
    { accessorKey: "pro", header: "PRO" },
    { accessorKey: "campus", header: "Campus" },
    { accessorKey: "dgm", header: "DGM" },
    { accessorKey: "zone", header: "Zone" },
    { accessorKey: "date", header: "Date" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const value = row.original.status;
        return (
          <span className={`status-badge ${value.replace(/\s+/g, "").toLowerCase()}`}>
            {value}
          </span>
        );
      },
    },
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const prevFilteredData = useRef();

  let filteredData = data;
  if (search) {
    filteredData = filteredData.filter((item) =>
      item.applicationNo.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (selectedZone !== "All Zones") {
    filteredData = filteredData.filter((item) => item.zone === selectedZone);
  }
  if (selectedDgm !== "All DGMs") {
    filteredData = filteredData.filter((item) => item.dgm === selectedDgm);
  }
  if (selectedCampus !== "All Campuses") {
    filteredData = filteredData.filter((item) => item.campus === selectedCampus);
  }

  const isAllSelected = studentCategory.all && !studentCategory.sold && !studentCategory.conformed && !studentCategory.unsold && !studentCategory.withPro && !studentCategory.damaged;
  if (!isAllSelected) {
    filteredData = filteredData.filter((item) => {
      const status = item.status;
      return (
        (studentCategory.all ||
          (studentCategory.sold && status === "Sold") ||
          (studentCategory.conformed && status === "Confirmed") ||
          (studentCategory.unsold && status === "Unsold") ||
          (studentCategory.withPro && status === "With PRO") ||
          (studentCategory.damaged && status === "Damaged"))
      );
    });
  }

  const statusFilteredData = filteredData.filter(
    (item) => item.status === "Sold" || item.status === "Confirmed"
  );

  useEffect(() => {
    if (onDataFilter && JSON.stringify(prevFilteredData.current) !== JSON.stringify(statusFilteredData)) {
      onDataFilter(statusFilteredData);
      prevFilteredData.current = statusFilteredData;
    }
  }, [search, selectedZone, selectedDgm, selectedCampus, studentCategory, onDataFilter]);

  useEffect(() => {
    if (pageIndex * pageSize >= filteredData.length && filteredData.length > 0) {
      setPageIndex(Math.floor((filteredData.length - 1) / pageSize));
    } else if (filteredData.length === 0) {
      setPageIndex(0);
    }
  }, [filteredData.length, pageSize]);

  const paginatedData = filteredData.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  const handleSelectRow = (row) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === row.id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const handleUpdate = (row) => {
    setFormValues(row);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setData((prev) =>
      prev.map((item) => (item.id === formValues.id ? formValues : item))
    );
    handleClose();
  };

  return (
    <div className="application-status-table">
      <ApplicationStatusDataTable
        columns={columns}
        data={paginatedData}
        onUpdate={handleUpdate}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        totalData={filteredData.length}
        onSelectRow={handleSelectRow}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Update Application</DialogTitle>
        <DialogContent>
          {Object.keys(formValues).map((key) =>
            key !== "id" && key !== "isSelected" ? (
              <TextField
                key={key}
                label={key}
                name={key}
                value={formValues[key]}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            ) : null
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApplicationStatusTable;