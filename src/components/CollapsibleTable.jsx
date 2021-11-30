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
} from "@mui/material";

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import EditIcon from "@mui/icons-material/Edit";

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

function CollapsibleTable() {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState([]);

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
          items: user.items,
          invoice_date: user.invoice_date,
          invoice_number: user.invoice_number,
          account_id: user.account_id,
          gst: user.gst,
          total: user.total,
          remarks: user.remarks,
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

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          size="small"
          aria-label="a dense table"
          sx={{ minWidth: 650 }}
          className="main_table"
        >
          <TableHead
            style={{
              background: "rgb(146 146 146)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <TableRow>
              <TableCell>Items</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Account Id</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Remarks</TableCell>
            </TableRow>
          </TableHead>
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
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleClick(index)}
                        >
                          {expanded[index] ? (
                            <CloseFullscreenIcon />
                          ) : (
                            <OpenInFullIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.data.invoice_date}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.data.invoice_number}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.data.account_id}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.data.gst}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.data.total}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {user.data.remarks}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
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
                            <Table size="small" aria-label="purchases">
                              <TableHead
                                style={{
                                  background: "rgb(146 146 146)",
                                  color: "white !important",
                                  fontWeight: "bold",
                                }}
                              >
                                <TableRow>
                                  <TableCell>Code</TableCell>
                                  <TableCell>Item</TableCell>
                                  <TableCell>Description</TableCell>
                                  <TableCell>Unit</TableCell>
                                  <TableCell>Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {user.data.child.map((re, i) => (
                                  <React.Fragment key={uuid()}>
                                    <TableRow>
                                      <TableCell>{re.code}</TableCell>
                                      <TableCell>{re.item}</TableCell>
                                      <TableCell onClick={handleOpen}>
                                        {re.description}
                                      </TableCell>
                                      <TableCell>{re.unit}</TableCell>
                                      <TableCell>{re.price}</TableCell>
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
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <EditIcon /> Item One
                  </TableCell>
                  <TableCell>Item one sun.1.10.12.12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <EditIcon />
                    Item Two
                  </TableCell>
                  <TableCell>Item two sun.2.10.12.12</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <EditIcon />
                    Item Three
                  </TableCell>
                  <TableCell>Item three sun.3.10.12.12</TableCell>
                </TableRow>
                <TableRow center="true">
                  <TableCell>
                    <Button variant="contained">Apply</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined">Cancel</Button>
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
