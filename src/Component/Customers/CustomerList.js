import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import "./customer.scss";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Modal, TextField } from "@mui/material";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Refresh from "react-refresh/runtime";
import { uuidv4 } from "@firebase/util";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomerList = () => {
  const [customerData, setCustomerData] = React.useState([
    {
      name: "",
      area: "",
      fee: "",
      records: { paid: false, month: "" },
      address: "",
    },
  ]);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editData, setEditData] = React.useState({
    name: "",
    area: "",
    records: { paid: false },
    fee: "",
    address: "",
  });
  const [openCreate, setOpenCreate] = React.useState(false);
  const handleOpenEdit = (index) => {
    setEditData(customerData[index]);
    setOpenEdit(true);
  };
  // const [filterValue, setFilterValue] = React.useState(null);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleOpenCreate = () => setOpenCreate(true);
  const handleCloseCreate = () => setOpenCreate(false);
  const name = React.useRef();
  const area = React.useRef();
  const fee = React.useRef();
  const address = React.useRef();
  const nameedit = React.useRef();
  const areaedit = React.useRef();
  const feeedit = React.useRef();
  const addressedit = React.useRef();
  const [paid, setPaid] = React.useState();
  const myTodayDate = new Date();
  const month12 = [
    { id: "0", name: "January" },
    { id: "1", name: "February" },
    { id: "2", name: "March" },
    { id: "3", name: "April" },
    { id: "4", name: "May" },
    { id: "5", name: "June" },
    { id: "6", name: "July" },
    { id: "7", name: "August" },
    { id: "8", name: "September" },
    { id: "9", name: "October" },
    { id: "10", name: "November" },
    { id: "11", name: "December" },
  ];
  const [month, setMonth] = React.useState(myTodayDate.getMonth());

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const id = uuidv4();
    try {
      const d = new Date();
      const month = d.getMonth();
      const year = d.getFullYear();
      const customer = await addDoc(collection(db, "customers"), {
        name: name.current.value,
        area: area.current.value,
        fee: fee.current.value,
        address: address.current.value,
      });
      await setDoc(doc(db, "records", id), {
        id: id,
        user_id: auth.currentUser.uid,
        customer_id: customer.id,
        month: year + "/" + month,
        paid: false,
      });
      name.current.value = "";
      area.current.value = "";
      fee.current.value = "";
      address.current.value = "";
      Refresh.performReactRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaid = async (record_id) => {
    if (window.confirm("Are you sure, you want to mark this as Paid !")) {
      try {
        await updateDoc(doc(db, "records", record_id), {
          paid: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };

  const handleUnPaid = async (record_id) => {
    if (window.confirm("Are you sure, you want to mark this as UnPaid !")) {
      try {
        await updateDoc(doc(db, "records", record_id), {
          paid: false,
        });
      } catch (error) {
        console.log(error);
      }
    }
    return;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(collection(db, "customers"), {
        name: nameedit.current.value,
        area: areaedit.current.value,
        fee: feeedit.current.value,
        address: addressedit.current.value,
      });
      nameedit.current.value = "";
      areaedit.current.value = "";
      feeedit.current.value = "";
      addressedit.current.value = "";
      Refresh.performReactRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  const customers = async (paid, month) => {
    console.log(paid, month);
    const d = new Date();
    const m = d.getMonth();
    const y = d.getFullYear();
    const defaultMonth = y + "/" + m;
    month = y + "/" + month;
    const arr = [];
    try {
      const customers = await getDocs(query(collection(db, "customers")));
      customers.forEach((customer) => {
        const data = customer.data();
        let filterQuery = query(
          collection(db, "records"),
          where("customer_id", "==", customer.id),
          where("month", "==", defaultMonth)
        );
        if (paid !== undefined && month === undefined) {
          filterQuery = query(
            collection(db, "records"),
            where("customer_id", "==", customer.id),
            where("paid", "==", paid)
          );
        }
        if (paid === undefined && month !== undefined) {
          filterQuery = query(
            collection(db, "records"),
            where("customer_id", "==", customer.id),
            where("month", "==", month)
          );
        }
        if (paid !== undefined && month !== undefined) {
          filterQuery = query(
            collection(db, "records"),
            where("customer_id", "==", customer.id),
            where("month", "==", month),
            where("paid", "==", paid)
          );
        }
        getDocs(filterQuery).then((records) => {
          records.docs.forEach((record) => {
            data.records = record.data();
            arr.push(data);
            setCustomerData(arr);
          });
        });
      });
      console.log(arr);
    } catch (err) {
      console.log(err + " dkjfkjdkj");
    }
  };

  React.useEffect(() => {
    const arr = [];
    const defaultCustomerDisplay = async () => {
      try {
        const customers = await getDocs(query(collection(db, "customers")));
        customers.forEach((customer) => {
          const data = customer.data();
          getDocs(
            collection(db, "records"),
            where("customer_id", "==", customer.id)
          ).then((records) => {
            records.forEach((record) => {
              data.records = record.data();
              console.log(record.data());
            });
            arr.push(data);
            setCustomerData(arr);
          });
        });
        console.log(arr);
      } catch (err) {
        console.log(err + " dkjfkjdkj");
      }
    };
    defaultCustomerDisplay();
  }, []);
  // const handleFilterName = async (e) => {
  //   console.log(e);
  //   const arr = [];
  //   const name = e.target.value;
  //   const customers = await getDocs(
  //     query(collection(db, "customers"), where("name", "==", name))
  //   );
  //   customers.forEach((customer) => {
  //     const data = customer.data();
  //     getDocs(
  //       query(
  //         collection(db, "records"),
  //         where("customer_id", "==", customer.id)
  //       )
  //     ).then((records) => {
  //       records.docs.forEach((record) => {
  //         data.records = record.data();
  //         arr.push(data);
  //         setCustomerData(arr);
  //         console.log(arr);
  //       });
  //     });
  //   });
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0.5}
        mt={2}
      >
        <div className="filter-container">
          <div>
            <label className="label-search">Search By Name: </label>
            <input type="text" onChange={(e) => customers(e.target.value)} />
          </div>
          <div className="btn-filter">
            <button
              onClick={() => {
                setPaid(true);
                customers(paid, month);
              }}
              className="my-paid-filter-btn"
            >
              Paid
            </button>
            <button
              onClick={() => {
                setPaid(false);
                customers(paid, month);
              }}
              className="my-unpaid-filter-btn"
            >
              UnPaid
            </button>
            <button className="reset" onClick={() => customers(undefined)}>Reset</button>
            <select
              onChange={(e) => {
                setMonth(e.target.value);
                customers(paid, month);
              }}
            >
              {month12.map((label) =>
                label.id === month ? (
                  <option key={label.id} value={label.id} selected>
                    {label.name}
                  </option>
                ) : (
                  <option key={label.id} value={label.id}>
                    {label.name}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        {customerData.map((data, index) => (
          <div className="tp-card" key={index} id={index}>
            <div className="tp-card-content">
              <div className="left-content">
                {/* <Button onClick={handleOpenEdit}>{data.name}</Button> */}
                <div
                  className="my-h1 my-btn"
                  onClick={() => handleOpenEdit(index)}
                >
                  Hming: {data.name}{" "}
                  <span className="my-h4">{data.records.month}</span>
                </div>
                <div className="my-h4">
                  <div className="my-h4">Area: {data.area}</div>
                  <div className="my-h4">Address: {data.address}</div>
                </div>
              </div>
              <div className="right-content">
                {data.records.paid === true ? (
                  <button
                    className="my-paid-button"
                    onClick={() => handleUnPaid(data.records.id)}
                  >
                    Paid
                  </button>
                ) : (
                  <button
                    className="my-unpaid-button"
                    onClick={() => handlePaid(data.records.id)}
                  >
                    UnPaid
                  </button>
                )}

                <div className="my-h3">Rs: {data.fee}</div>
              </div>
            </div>
          </div>
        ))}

        <Fab
          style={{ position: "absolute", top: "5px", right: "5px" }}
          aria-label="Add"
          color="primary"
          onClick={handleOpenCreate}
          // href="/customers/create"
        >
          <AddIcon />
        </Fab>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Customer
            </Typography>
            <form onSubmit={handleEditSubmit} className="customer-form">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                placeholder={editData.name}
                inputRef={nameedit}
                required
              />
              <TextField
                id="filled-basic"
                label="Area"
                variant="outlined"
                placeholder={editData.area}
                inputRef={areaedit}
                required
              />
              <TextField
                id="filled-basic"
                label="Fee"
                variant="outlined"
                placeholder={editData.fee}
                inputRef={feeedit}
                required
              />
              <TextField
                id="filled-basic"
                label="Address"
                variant="outlined"
                placeholder={editData.address}
                inputRef={addressedit}
                required
              />
              <button className="submit-btn">Edit</button>
            </form>
          </Box>
        </Modal>

        <Modal
          open={openCreate}
          onClose={handleCloseCreate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Customer
            </Typography>
            <form onSubmit={handleCreateSubmit} className="customer-form">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                inputRef={name}
                required
              />
              <TextField
                id="filled-basic"
                label="Area"
                variant="outlined"
                inputRef={area}
                required
              />
              <TextField
                id="filled-basic"
                label="Fee"
                variant="outlined"
                inputRef={fee}
                required
              />
              <TextField
                id="filled-basic"
                label="Address"
                variant="outlined"
                inputRef={address}
                required
              />
              <button className="submit-btn">Submit</button>
            </form>
          </Box>
        </Modal>
      </Stack>
    </Box>
  );
};
export default CustomerList;
