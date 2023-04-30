import React from "react";
import '../css/loading.css'

export default function Loading(props) {
    return (
      <div className="spinnerContainer">
        <div className="loadingSpinner"></div>
        <p>{props.text}</p>
      </div>
    );
  }
  