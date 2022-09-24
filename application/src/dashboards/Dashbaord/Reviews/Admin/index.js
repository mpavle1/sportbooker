import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EventIcon from "@mui/icons-material/Event";
import { useHistory } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import Table from "../../../../components/Table";
import EditReviewModal from "./EditReviewModal";

import {
  getAllReviews,
  deleteReview,
  approveReview,
} from "../../../../redux/actions/reviews";
import { getAllEvents } from "../../../../redux/actions/events";

const Admin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [editReview, setEditReview] = useState(null);

  const sportCenters = useSelector((state) => state.sportCenters);
  const users = useSelector((state) => state.users.users);
  const reviews = useSelector((state) => state.reviews.all);
  const events = useSelector((state) => state.events.all);

  const columns = [
    {
      Header: "Review ID",
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
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Comment",
      accessor: "comment",
    },
    {
      Header: "Score",
      accessor: "score",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ cell }) => (
        <Fragment>
          <Tooltip title="Delete">
            <IconButton
              onClick={() =>
                dispatch(deleteReview(cell.row.original)).then(() => {
                  alert("Review has been deleted");
                  dispatch(getAllReviews());
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
          <Tooltip title="Edit Reivew">
            <IconButton onClick={() => setEditReview(cell.row.original)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          {cell.row.original.status === "pending" && (
            <Tooltip title="Approve review">
              <IconButton
                onClick={() => {
                  dispatch(approveReview(cell.row.original));
                  alert('Review has been approved');
                  dispatch(getAllReviews());
                }}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getAllReviews());
    dispatch(getAllEvents());
  }, []);

  if (
    reviews.lenght === 0 ||
    users.length === 0 ||
    sportCenters.length === 0 ||
    events.length === 0
  ) {
    return <div>No reviews to show</div>;
  }

  return (
    <Fragment>
      {editReview && (
        <EditReviewModal
          review={editReview}
          onClose={() => setEditReview(null)}
        />
      )}
      <Table columns={columns} data={reviews} />
    </Fragment>
  );
};

export default Admin;
