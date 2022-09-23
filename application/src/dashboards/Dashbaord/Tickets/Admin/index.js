import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import { useHistory } from "react-router-dom";

import Table from "../../../../components/Table";

import {
  getAllTickets,
  cancelATicket,
} from "../../../../redux/actions/tickets";
import { getAllEvents } from "../../../../redux/actions/events";
import { getAllUsers } from "../../../../redux/actions/users";
import { getAllSportCenters } from "../../../../redux/actions/sportCenters";

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sportCenters = useSelector((state) => state.sportCenters);
  const users = useSelector((state) => state.users.users);

  const tickets = useSelector((state) => state.tickets.all);
  const events = useSelector((state) => state.events.all);

  const columns = [
    {
      Header: "Ticket ID",
      accessor: "_id",
    },
    {
      Header: "Event",
      accessor: "eventId",
      Cell: ({ cell }) => {
        const { value } = cell;
        const content =
          events.length > 0
            ? events.find((event) => event._id == value)?.title
            : "";
        return (
          <Tooltip title={value}>
            <div>{content}</div>
          </Tooltip>
        );
      },
    },
    {
      Header: "SportCenter",
      accessor: "sportCenterId",
      Cell: ({ cell }) => {
        const { value } = cell;
        const sc =
          sportCenters.length > 0
            ? sportCenters.find((sc) => sc._id == value)
            : null;
        const tooltip = sc?._id ?? "";
        const content = users.find((user) => user._id === sc.userId)?.name;
        return (
          <Tooltip title={tooltip}>
            <div>{content}</div>
          </Tooltip>
        );
      },
    },
    {
      Header: "User",
      accessor: "userId",
      Cell: ({ cell }) => {
        const { value } = cell;
        const user = users.find((user) => user._id === value);
        const content = `${user.name} ${user.lastName}`;
        return (
          <Tooltip title={value}>
            <div>{content}</div>
          </Tooltip>
        );
      },
    },
    {
      Header: "Seat (row/column)",
      accessor: "seat",
      Cell: ({ cell }) => {
        const { value } = cell;
        return (
          <div>
            {value.row} / {value.column}
          </div>
        );
      },
    },
    {
      Header: "Stand",
      accessor: "stand",
    },
    {
      Header: "Section",
      accessor: "section",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ cell }) => (
        <Fragment>
          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                dispatch(cancelATicket(cell.row.original._id)).then(() => {
                  alert("Ticket has been deleted");
                  dispatch(getAllTickets());
                })
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Event">
            <IconButton
              onClick={() =>
                history.push(`/event/${cell.row.original.eventId}`)
              }
            >
              <EventIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllTickets());
    dispatch(getAllEvents());
    dispatch(getAllSportCenters());
  }, []);

  if (
    tickets.lenght === 0 ||
    users.length === 0 ||
    sportCenters.length === 0 ||
    events.length === 0
  ) {
    return <div>No tickets to show</div>;
  }

  return <Table columns={columns} data={tickets} />;
};

export default Admin;
