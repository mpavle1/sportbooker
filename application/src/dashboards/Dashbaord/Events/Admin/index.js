import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

import EditModal from "../../../../components/EventModal";
import Table from "../../../../components/Table";

import {
  getAllEvents,
  deleteEvent,
  toggleActivated,
} from "../../../../redux/actions/events";
import { getAllSportCenters } from "../../../../redux/actions/sportCenters";
import { getAllUsers } from "../../../../redux/actions/users";
import { locationsSelectors } from "../../../../redux/features/locations";

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sportCenters = useSelector((state) => state.sportCenters);
  const users = useSelector((state) => state.users.users);
  const events = useSelector((state) => state.events.all);
  const isInitialized = useSelector((state) => state.events.isInitialized);
  const sports = useSelector((state) => state.sports);
  const locations = useSelector(locationsSelectors.selectAll);
  const isLocationsInitialized = useSelector(locationsSelectors.selectIsInitialized);

  const [editModalEvent, setEditModalEvent] = useState(null);

  if (!isLocationsInitialized) {
    return null;
  }

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
      Header: "Sport",
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
      Header: "Location",
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
          <Tooltip title="Edit Event">
            <IconButton onClick={() => setEditModalEvent(cell.row.original)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllEvents());
    dispatch(getAllSportCenters());
  }, []);

  if (!isInitialized || users.length === 0 || sportCenters.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {editModalEvent && (
        <EditModal
          event={editModalEvent}
          onClose={() => setEditModalEvent(null)}
          onChange={() => {
            alert("Event has been udpated");
            setEditModalEvent(null);
            dispatch(getAllEvents());
          }}
        />
      )}
      <Table columns={columns} data={events} />
    </Fragment>
  );
};

export default Admin;
