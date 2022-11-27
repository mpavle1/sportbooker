import React, { useLayoutEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import Table from "../../../components/Table";

import withNavigationContainer from "../withNavigationContainer";

import { getAllUsers, updateUser } from "../../../redux/actions/users";

const Users = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const isInitialized = useSelector((state) => state.users.isInitialized);
  const users = useSelector((state) => state.users.users);

  const columns = [
    {
      Header: "User ID",
      accessor: "_id",
    },
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ cell }) => {
        const { value, row } = cell;
        return (
          <div>
            {value} {row?.original?.lastName}
          </div>
        );
      },
    },
    {
      Header: "type",
      accessor: "type",
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Actions",
      accessor: "action",
      Cell: ({ cell }) => {
        const { row } = cell;
        const { status } = row.original;
        return (
          <Fragment>
            {["active", "deactive"].includes(status) && (
              <Tooltip
                title={status === "deactive" ? "Activate" : "Deactivate"}
              >
                <IconButton
                  onClick={() => {
                    dispatch(
                      updateUser({
                        ...row.original,
                        status: status === "deactive" ? "active" : "deactive",
                      })
                    ).then(() => {
                      //   alert("User has been updated");
                      dispatch(getAllUsers());
                    });
                  }}
                >
                  {status === "deactive" ? <PersonIcon /> : <PersonOffIcon />}
                </IconButton>
              </Tooltip>
            )}
            {status === "pending" && (
              <Tooltip title="Activate user">
                <IconButton
                  onClick={() => {
                    dispatch(
                      updateUser({
                        ...row.original,
                        status: "active",
                      })
                    ).then(() => {
                      //   alert("User has been updated");
                      dispatch(getAllUsers());
                    });
                  }}
                >
                  <HowToRegIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Disable User">
              <IconButton
                onClick={() => {
                  dispatch(
                    updateUser({
                      ...row.original,
                      status: "disabled",
                    })
                  ).then(() => {
                    // alert("User has been updated");
                    dispatch(getAllUsers());
                  });
                }}
              >
                <NoAccountsIcon />
              </IconButton>
            </Tooltip>
          </Fragment>
        );
      },
    },
  ];

  useLayoutEffect(() => {
    dispatch(getAllUsers());
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <Table columns={columns} data={users} />;
};

export default withNavigationContainer(Users);
