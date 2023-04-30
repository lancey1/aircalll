import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  findCallType,
  formatNumber,
  formatCallTime,
  formatTime,
} from "../helperFunctions/Functions";
import "../css/activityFeeddItem.css";

export default function ActivityFeedItem(props) {
  const callData = {
    id: props.id,
    direction: props.direction,
    duration: props.duration,
    from: props.from,
    via: props.via,
    archived: props.archived,
    callType: props.callType,
    dateCreated: props.dateCreated,
    callType: props.callType,
    to: props.to,
  };
  const navigate = useNavigate();
  const handleClick = () => {
    props.toggleExpanded(props.idAndKey);
  };
  const handleNavigate = () => {
    navigate(`/calls/${props.id}`, { state: callData });
  };

  const dateObj = new Date(props.dateCreated);
  const day = dateObj.toLocaleDateString();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  
  return (
    <div
      className={`callItem ${props.isExpanded ? "expanded" : ""}`}
      onClick={handleClick}
    >
      <div className="callIcon">{findCallType(props.callType)}</div>
      <div className="callMain">
        <div>{props.isArchived}</div>
        <div className="callDetails">
          <div className="fromOrTo">{formatNumber(props.direction, props)}</div>
          {props.isExpanded && (
            <Fragment>
              <div className="extraDetails">
                <div className="direction">{props.direction} Call</div>
                <div>{formatCallTime(props.duration)}</div>
                <div>
                  <div>From: {props.from}</div>
                </div>
                <div>Via: {props.via}</div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <div className="rightCallDetails">
        {props.isExpanded && (
          <button onClick={handleNavigate} className="infoButton">
            <i>i</i>
          </button>
        )}

        <div className="callTime">{formatTime(hour, minute)}</div>
      </div>
    </div>
  );
}
