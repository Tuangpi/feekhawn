import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CustomerIcon from "@mui/icons-material/PeopleAlt";
import ProfileIcon from "@mui/icons-material/People";
import Paper from "@mui/material/Paper";
import Dashboard from "../Dashboard/Dashboard";
import CustomerList from "../Customers/CustomerList";
import { UserProfile } from "../User/UserProfile";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(<Dashboard />);

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    if (value === 0) {
      setMessages(<Dashboard />);
    } else if (value === 1) {
      setMessages(<CustomerList />);
    } else if (value === 2) {
      setMessages(<UserProfile />);
    } else {
      setMessages(<Dashboard />);
    }
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      {messages}
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Customers" icon={<CustomerIcon />} />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
