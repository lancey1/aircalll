import React, { Fragment, useState } from "react";
import ActivityFeedItem from "./ActivityFeedItem.jsx";
import regeneratorRuntime from "regenerator-runtime";
import "../css/activityFeed.css";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading.jsx";
import phoneIcon from "../icons/call-185-svgrepo-com.svg";

export default function ActivityList(props) {
  const [showAll, setShowAll] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [allActive, setAllActive] = useState("active");
  const [archiveActive, setArchiveActive] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [isArchiving, setArchiving] = useState(false);
  const [isUnarchiving, setUnarchiving] = useState(false);

  const { data, fetchData } = props;
  let navigate = useNavigate();
  const URL =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities";

  const toggleExpanded = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };
  function clickShowAllHandler() {
    setShowAll(true);
    setShowArchived(false);
    setAllActive("active");
    setArchiveActive("");
  }
  function clickShowArchivedHandler() {
    setShowAll(false);
    setShowArchived(true);
    setArchiveActive("active");
    setAllActive("");
  }

  const archiveAllHandler = async (ids) => {
    try {
      setArchiving(true);
      await Promise.all(
        ids.map(async (id) => {
          let response = await fetch(`${URL}/${id}`, {
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
        })
      );
      console.log("Archived successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
      setArchiving(false);
      navigate("/");
    }
  };

  const unarchiveAllHandler = async (ids) => {
    try {
      setUnarchiving(true);
      await Promise.all(
        ids.map(async (id) => {
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
        })
      );
      console.log("Archived successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      fetchData();
      setUnarchiving(false);
      navigate("/");
    }
  };

  const handleArchiveAll = () => {
    const ids = preSortlist.map((call) => call.id);
    archiveAllHandler(ids);
  };

  const handleUnarchiveAll = () => {
    const ids = archiveCalls.map((call) => call.id);
    unarchiveAllHandler(ids);
  };

  // filter empty calls from api
  let filteredActivitylist = data.filter((object) =>
    object.hasOwnProperty("from")
  );
  // presort the individual calls by day and time
  let preSortlist = filteredActivitylist.sort((a, b) => {
    let da = new Date(a.created_at);
    let db = new Date(b.created_at);
    return db - da;
  });
  // returns all Unarchived calls
  let UnarchiveCalls = preSortlist.filter((object) => {
    return object.is_archived === false;
  });
  // returns all archived calls
  let archiveCalls = preSortlist.filter((object) => {
    return object.is_archived === true;
  });

  // sort into Grouped dates (Unarchived Calls)
  const groupedData = UnarchiveCalls.reduce((acc, curr) => {
    const dateObj = new Date(curr.created_at);
    const date = dateObj.toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, []);

  // sort into Grouped dates (Archived Calls)
  const groupedArchivedData = archiveCalls.reduce((acc, curr) => {
    const dateObj = new Date(curr.created_at);
    const date = dateObj.toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, []);

  // sort by Grouped date descending (most recent at the top) - (Unarchived Calls)
  const sortedCallList = Object.entries(groupedData)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
    .map(([date, items]) => ({ date, items }));


  // maps out the entire call list - (Unarchived Calls)
  const itemList = sortedCallList.map((date) => (
    <div className="groupedCalls">
      <div className={"groupDate"} key={date.date}>
        <h3>{date.date}</h3>
      </div>
      <div className={"datedCalls"}>
        {date.items.map((call, index) => (
          <Fragment key={`${index}`}>
            <ActivityFeedItem
              key={index + call.id}
              callType={call.call_type}
              dateCreated={call.created_at}
              direction={call.direction}
              duration={call.duration}
              from={call.from}
              id={call.id}
              archived={call.is_archived}
              to={call.to}
              via={call.via}
              idAndKey={index + call.id}
              toggleExpanded={toggleExpanded}
              isExpanded={expandedId === index + call.id}
              fetchData={fetchData}
            />
          </Fragment>
        ))}
      </div>
    </div>
  ));

  // sort by Grouped date descending (most recent at the top) - (Archived Calls)
  const sortedArchivedCallList = Object.entries(groupedArchivedData)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
    .map(([date, items]) => ({ date, items }));

  // maps out the entire Archived list -(Archived Calls)
  const archivedItemList = sortedArchivedCallList.map((date) => (
    <div className="groupedCalls">
      <div className={"groupDate"} key={date.date}>
        <h3>{date.date}</h3>
      </div>
      <div className={"datedCalls"}>
        {date.items.map((call, index) => (
          <Fragment key={`${index}`}>
            <ActivityFeedItem
              key={index + call.id}
              callType={call.call_type}
              dateCreated={call.created_at}
              direction={call.direction}
              duration={call.duration}
              from={call.from}
              id={call.id}
              archived={call.is_archived}
              to={call.to}
              via={call.via}
              idAndKey={index + call.id}
              toggleExpanded={toggleExpanded}
              isExpanded={expandedId === index + call.id}
              fetchData={fetchData}
            />
          </Fragment>
        ))}
      </div>
    </div>
  ));

  return (
    <Fragment>
      <div className="callListHeader">
        <span
          className={`allCalls_${allActive}`}
          onClick={() => {
            clickShowAllHandler();
          }}
        >
          Calls
        </span>
        <span
          className={`archived_${archiveActive}`}
          onClick={() => {
            clickShowArchivedHandler();
          }}
        >
          Archived
        </span>
      </div>
      {isArchiving && <Loading text="Archiving All Calls" />}
      {isUnarchiving && <Loading text="Unarchiving All Calls" />}
      <div className="listContainer">
        {UnarchiveCalls.length === 0 && showAll && (
          <div className={"zeroArchivedCalls"}>
            <img draggable="false" className="zeroIcon" src={phoneIcon}></img>
            <h1>No Calls in Feed</h1>
          </div>
        )}
        {!isArchiving && UnarchiveCalls.length > 0 && showAll && (
          <button className="allbtn archived" onClick={handleArchiveAll}>
            Archive All Calls
          </button>
        )}
        <div className={`allCallList_${allActive}`}>
          {!isArchiving && showAll && itemList}
        </div>
        {archiveCalls.length === 0 && showArchived && (
          <div className={"zeroArchivedCalls"}>
            <img draggable="false" className="zeroIcon" src={phoneIcon}></img>
            <h1>No Calls Archived</h1>
          </div>
        )}
        {!isUnarchiving && archiveCalls.length > 0 && showArchived && (
          <button className="allbtn unarchived" onClick={handleUnarchiveAll}>
            Unarchive All Calls
          </button>
        )}
        <div className={`archivedList_${archiveActive}`}>
          {!isUnarchiving && showArchived && archivedItemList}
        </div>
      </div>
    </Fragment>
  );
}
