import React, { useEffect, useState, Fragment } from "react";
import {
  findCallType,
  formatTime,
  formatCallTime,
} from "../helperFunctions/Functions";
import regeneratorRuntime from "regenerator-runtime";
import Loading from "../Components/Loading.jsx";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../css/callItem.css";

export default function CallItem(props) {
  let navigate = useNavigate();
  const location = useLocation();
  const callData = location.state;
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isArchiving, setArchiving] = useState(false);
  const [isUnarchiving, setUnarchiving] = useState(false);

  const URL =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities";

  const archiveHandler = async () => {
    setArchiving(true);
    try {
      let response = await fetch(`${URL}/${callData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          is_archived: true,
        }),
      });
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setError(error.message);
    }
    props.fetchData();
    navigate("/");
  };

  const unarchiveHandler = async () => {
    setUnarchiving(true);
    try {
      let response = await fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          is_archived: false,
        }),
      });
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setError(error.message);
    }
    props.fetchData();
    navigate("/");
  };

  const dateObj = new Date(callData.dateCreated);
  const day = dateObj.toLocaleDateString();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  return (
    <Fragment>
      {isArchiving && <Loading text="Archiving Call" />}
      {isUnarchiving && <Loading text="Unarchiving Call" />}
      {!isArchiving && !isUnarchiving && (
        <div className="detailedCall">
          <div>{findCallType(callData.callType)}</div>
          <div className="direction">{callData.direction} Call</div>
          <div className="callDate">{day} </div>
          <div>
            {formatTime(hour,minute)}
          </div>
          <div>From:{callData.from}</div>
          <div>To:{callData.to}</div>
          <div>{formatCallTime(callData.duration)}</div>
          {!callData.archived ? (
            <button className="archiveButton" onClick={archiveHandler}>
              Archive Call
            </button>
          ) : (
            <button className="unarchiveButton" onClick={unarchiveHandler}>
              Unarchive Call
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
}
