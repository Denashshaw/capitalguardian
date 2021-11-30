import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  Paper,
  Button,
  Modal,
  Input,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

import { v4 as uuid } from "uuid";
import result from "../sample.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "items",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "invoice_date",
    numeric: false,
    disablePadding: false,
    label: "Invoice Date",
  },
  /* {
    id: "invoice_number",
    numeric: false,
    disablePadding: false,
    label: "Invoice No.",
  }, */
  {
    id: "account_firstname",
    numeric: false,
    disablePadding: false,
    label: "FirstName",
  },
  {
    id: "account_lastname",
    numeric: false,
    disablePadding: false,
    label: "LastName",
  },
  {
    id: "account_id",
    numeric: false,
    disablePadding: false,
    label: "Account Id",
  },
  {
    id: "gst",
    numeric: false,
    disablePadding: false,
    label: "GST",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: false,
    label: "Total",
  },
  /* {
    id: "remarks",
    numeric: false,
    disablePadding: false,
    label: "Remarks",
  }, */
  {
    id: "attachment",
    numeric: false,
    disablePadding: false,
    label: "Attachment",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      style={{
        background: "rgb(146 146 146)",
        color: "white",
        fontWeight: "bold",
        padding: "0 !important",
      }}
    >
      <TableRow>
        <TableCell>
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            /* align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"} 
            sortDirection={orderBy === headCell.id ? order : false}*/
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={{ whiteSpace: "nowrap" }}
            > */}
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
            {/* </TableSortLabel> */}
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

function CollapsibleTable() {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState([]);
  //   const [edit, setEdit] = useState(0);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getData = async () => {
    //const response = await fetch("https://reqres.in/api/users?page=2");
    // const result = await response.json();
    setIsLoading(false);
    setFetchedData(
      result.map((user) => ({
        data: {
          id: user.id,
          isEdit: user.isEdit,
          invoice_date: user.invoice_date,
          // invoice_number: user.invoice_number,
          first_name: user.first_name,
          last_name: user.last_name,
          account_id: user.account_id,
          gst: user.gst,
          total: user.total,
          remarks: user.remarks,
          attachment: user.attachment,
          status: user.status,
          child: user.child,
        },
      }))
    );
    setExpanded([...Array(result.length)].map((val) => false));
  };

  const handleClick = (index) => {
    setExpanded(
      expanded.map((boolean_value, i) => {
        if (index === i) {
          // once we retrieve the collapse index, we negate it
          return !boolean_value;
        } else {
          // all other collapse will be closed
          return false;
        }
      })
    );
  };
  //   console.log(fetchedData);

  useEffect(() => {
    getData();
  }, []);

  const deleteHandler = (index) => {
    setFetchedData(fetchedData.filter((sr) => sr.data.id !== index));
    console.log(index);
  };

  const editHandler = (id) => {
    fetchedData.map((row) => {
      if (row.data.id === id) {
        const newState = [...fetchedData];
        newState[id].data.isEdit = id + 1;
        setFetchedData(newState);
      }
    });
  };

  const saveHandler = (id) => {
    fetchedData.map((row) => {
      if (row.data.id === id) {
        const newState = [...fetchedData];
        newState[id].data.isEdit = 0;
        setFetchedData(newState);
      }
    });
  };

  const childDeleteHandler = (pid, index) => {
    // setFetchedData(fetchedData.filter((sr) => sr.data.id !== index));
    const loopedData = fetchedData.map((sr) => sr.data);
    console.log(loopedData);
    // sr.data.child.map((child) => console.log(child, index));
    if (loopedData.id == pid) {
      const data = loopedData.child.filter((cid) => cid.sno !== index);
      console.log(data);
    }
  };

  const childEditHandler = (id) => {
    return false;
    fetchedData.map((row) => {
      if (row.data.id === id) {
        const newState = [...fetchedData];
        newState[id].data.isEdit = id + 1;
        setFetchedData(newState);
      }
    });
  };

  const childSaveHandler = (id) => {
    return false;
    fetchedData.map((row) => {
      if (row.data.id === id) {
        const newState = [...fetchedData];
        newState[id].data.isEdit = 0;
        setFetchedData(newState);
      }
    });
  };

  /* const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={(e) => onChange(e, row)}
            className={classes.input}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  }; */

  console.log(fetchedData);
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table" className="main_table">
          <EnhancedTableHead />
          {/* <TableHead>
            <TableRow>
              <TableCell>Items</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Account Id</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead> */}
          <TableBody>
            {isLoading
              ? "Loading . . ."
              : fetchedData.map((user, index) => (
                  <React.Fragment key={uuid()}>
                    <TableRow
                      style={{
                        borderBottom: "unset",
                      }}
                    >
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleClick(user.data.id)}
                        >
                          {expanded[index] ? (
                            <CloseFullscreenIcon />
                          ) : (
                            <OpenInFullIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.invoice_date
                        ) : (
                          <input
                            type="date"
                            size="5"
                            value={user.data.invoice_date}
                          />
                        )}
                      </TableCell>
                      {/* <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.invoice_number
                        ) : (
                          <input type="text" size='10' />
                        )}
                      </TableCell> */}
                      <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.first_name
                        ) : (
                          <Input
                            name="first_name"
                            value={user.data.first_name}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.last_name
                        ) : (
                          <Input name="last_name" value={user.data.last_name} />
                        )}
                      </TableCell>
                      <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.account_id
                        ) : (
                          <Input
                            name="account_id"
                            value={user.data.account_id}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.gst
                        ) : (
                          <Input name="gst" value={user.data.gst} />
                        )}
                      </TableCell>
                      <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.total
                        ) : (
                          <Input name="total" value={user.data.total} />
                        )}
                      </TableCell>
                      {/* <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.invoice_date
                        ) : (
                          <input type="date" />
                        )}
                      </TableCell>
                      <TableCell>{user.data.invoice_number}</TableCell>
                      <TableCell>{user.data.first_name}</TableCell>
                      <TableCell>{user.data.last_name}</TableCell>
                      <TableCell>{user.data.account_id}</TableCell>
                      <TableCell>{user.data.gst}</TableCell>
                      <TableCell>{user.data.total}</TableCell> */}
                      {/* <TableCell>{user.data.remarks}</TableCell> */}
                      <TableCell>
                        <FileDownloadIcon />
                      </TableCell>
                      {/* <TableCell>{user.data.status}</TableCell> */}
                      <TableCell>
                        {user.data.isEdit == 0 ? (
                          user.data.status
                        ) : (
                          <Input name="total" value={user.data.status} />
                        )}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {user.data.isEdit == 0 ? (
                          <IconButton
                            aria-label="Edit"
                            style={{ outline: "none" }}
                            onClick={() => editHandler(user.data.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            aria-label="Save"
                            style={{ outline: "none" }}
                            onClick={() => saveHandler(user.data.id)}
                          >
                            <SaveIcon />
                          </IconButton>
                        )}
                        <IconButton
                          aria-label="delete"
                          style={{ outline: "none" }}
                          onClick={() => deleteHandler(user.data.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{
                          paddingBottom: 0,
                          paddingTop: 0,
                          border: 0,
                        }}
                        colSpan={12}
                      >
                        <Collapse
                          in={expanded[index]}
                          timeout="auto"
                          unmountOnExit={true}
                        >
                          <Box margin={1}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            ></Typography>
                            <Table aria-label="purchases">
                              <TableHead
                                style={{
                                  background: "rgb(146 146 146)",
                                  color: "white !important",
                                  fontWeight: "bold",
                                }}
                              >
                                <TableRow>
                                  <TableCell>SNO</TableCell>
                                  <TableCell>Item Code</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Description</TableCell>
                                  <TableCell>No. of Units</TableCell>
                                  <TableCell>Cost/Unit</TableCell>
                                  <TableCell>GST</TableCell>
                                  <TableCell>Total Cost</TableCell>
                                  <TableCell>From Date</TableCell>
                                  <TableCell>To Date</TableCell>
                                  <TableCell>Actions</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {user.data.child.map((re, i) => (
                                  <React.Fragment key={uuid()}>
                                    <TableRow>
                                      <TableCell>{re.sno}</TableCell>
                                      <TableCell>{re.code}</TableCell>
                                      <TableCell>{re.item_name}</TableCell>
                                      <TableCell
                                        onClick={handleOpen}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <u>{re.description}</u>
                                      </TableCell>
                                      <TableCell>{re.num_of_units}</TableCell>
                                      <TableCell>{re.cost_per_unit}</TableCell>
                                      <TableCell>{re.gst}</TableCell>
                                      <TableCell>{re.total_cost}</TableCell>
                                      <TableCell>{re.from_date}</TableCell>
                                      <TableCell>{re.to_date}</TableCell>
                                      <TableCell
                                        style={{ whiteSpace: "nowrap" }}
                                      >
                                        {re.isChildEdit == 0 ? (
                                          <IconButton
                                            aria-label="Edit"
                                            style={{ outline: "none" }}
                                            onClick={() =>
                                              childEditHandler(re.sno)
                                            }
                                          >
                                            <EditIcon />
                                          </IconButton>
                                        ) : (
                                          <IconButton
                                            aria-label="Save"
                                            style={{ outline: "none" }}
                                            onClick={() =>
                                              childSaveHandler(re.sno)
                                            }
                                          >
                                            <SaveIcon />
                                          </IconButton>
                                        )}
                                        <IconButton
                                          aria-label="delete"
                                          style={{ outline: "none" }}
                                          onClick={() =>
                                            childDeleteHandler(
                                              user.data.id,
                                              re.sno
                                            )
                                          }
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </TableCell>
                                    </TableRow>
                                  </React.Fragment>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            NDIS Mapping
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 100 }}
              size="small"
              aria-label="a dense table"
              options={{
                selection: true,
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Invoice Items</TableCell>
                  <TableCell>NDIS Code | Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <TextField
                      id="standard-required"
                      defaultValue="Item One"
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-required"
                      defaultValue="Item Two"
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    <SaveIcon />
                    <DoNotDisturbAltIcon />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item Two</TableCell>
                  <TableCell>Item two sun.2.10.12.12</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    <EditIcon />
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item Three</TableCell>
                  <TableCell>Item three sun.3.10.12.12</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    <EditIcon />
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
                <TableRow center="true">
                  <TableCell>
                    <Button variant="contained">Apply</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleClose()}>
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {/* </Typography> */}
        </Box>
      </Modal>
    </>
  );
}

export default CollapsibleTable;
