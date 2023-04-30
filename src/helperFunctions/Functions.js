import React, { Fragment } from "react";
import missedCallIcon from "../icons/miss-call-icon.svg";
import incomingcallIcon from "../icons/incoming-call-icon.svg";
import voicemail from "../icons/voicemail-icon.svg";
import outbound from "../icons/outgoing-call-icon.svg";

export function findCallType(callType,direction) {
  if (direction === "outbound") {
    return <img className="callIcon" src={outbound} />;
  }
  if (callType === "missed") {
    return <img className="callIcon" src={missedCallIcon} />;
  }
  if (callType === "answered") {
    return <img className="callIcon" src={incomingcallIcon} />;
  }
  if (callType === "voicemail") {
    return <img className="callIcon" src={voicemail} />;
  }
  if (callType === "undefined") {
    return;
  }
}

export function formatNumber(direction,props) {
  if (direction === "outbound") {
    return `To:${props.to}`;
  }
  if (direction === "inbound") {
    return `From: ${props.from}`;
  }
}
//  converts the duration from seconds to how many hours, minutes and seconds
export function formatCallTime(duration) {
  let d = Number(duration);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);

  let hDisplay = h > 0 ? h + (h === 1 ? " h " : " h ") : "";
  let mDisplay = m > 0 ? m + (m === 1 ? " m " : " m ") : "";
  let sDisplay = s > 0 ? s + (s === 1 ? " s" : " s") : "";
  return `${hDisplay} ${mDisplay} ${sDisplay}`;
}

export function formatTime(hour, minute) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${minute < 10 ? '0' + minute : minute} ${ampm}`;
}