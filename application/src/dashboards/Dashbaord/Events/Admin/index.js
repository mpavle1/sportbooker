import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EventIcon from "@mui/icons-material/Event";
import { format } from "date-fns";
import { useHistory, withRouter } from "react-router-dom";

import Table from "../../../../components/Table";

import { getAllEvents, deleteEvent } from "../../../../redux/actions/events";
import { toggleActivated } from "../../../../redux/actions/events";

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const events = useSelector((state) => state.events.all);
  const isInitialized = useSelector((state) => state.events.isInitialized);
  const sports = useSelector((state) => state.sports);
  const locations = useSelector((state) => state.locations);

  const columns = [
    {
      Header: "Event ID",
      accessor: "_id",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: ({ cell }) => format(new Date(cell.value), "PPP"),
    },
    {
      Header: "SportId",
      accessor: "sportId",
      Cell: ({ cell }) => {
        const { value } = cell;
        const content =
          sports.length > 0
            ? sports.find((sport) => sport._id == value)?.name
            : "";
        return (
          <Tooltip title={value}>
            <div>{content}</div>
          </Tooltip>
        );
      },
    },
    {
      Header: "LocationId",
      accessor: "locationId",
      Cell: ({ cell }) => {
        const { value } = cell;
        const content =
          locations.length > 0
            ? locations.find((location) => location._id == value)?.name
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
      Header: "StartTime",
      accessor: "startTime",
    },
    {
      Header: "EndTime",
      accessor: "endTime",
    },
    {
      Header: "Status",
      accessor: "active",
      Cell: ({ cell }) => {
        const { value, row } = cell;
        return (
          <Tooltip
            title={`Set by admin: ${
              row.original.setByAdmin ? "true" : "false"
            }`}
          >
            <div>{value ? "active" : "disabled"}</div>
          </Tooltip>
        );
      },
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ cell }) => (
        <Fragment>
          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                dispatch(deleteEvent(cell.row.original._id)).then(() => {
                  alert("Event has been deleted");
                  dispatch(getAllEvents());
                })
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Visibility">
            <IconButton
              onClick={() => {
                dispatch(
                  toggleActivated(
                    cell.row.original._id,
                    !cell.row.original.active,
                    true
                  )
                ).then(() => {
                  alert("Event status changed");
                  dispatch(getAllEvents());
                });
              }}
            >
              <VisibilityOffIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Event">
            <IconButton
              onClick={() => history.push(`/event/${cell.row.original._id}`)}
            >
              <EventIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllEvents());
  }, []);

  if (!isInitialized) {
    return null;
  }

  return <Table columns={columns} data={events} />;
};

export default Admin;
