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

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

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
      Header: "SportCenterId",
      accessor: "sportCenterId",
    },
    {
      Header: "User",
      accessor: "userId",
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
          <Tooltip title="View Ticket">
            <IconButton
              onClick={() => alert('add view ticket')}
            >
              <EventIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllTickets());
    dispatch(getAllEvents());
  }, []);

  if (tickets.lenght === 0) {
    return <div>No tickets to show</div>;
  }

  return <Table columns={columns} data={tickets} />;
};

export default Admin;
