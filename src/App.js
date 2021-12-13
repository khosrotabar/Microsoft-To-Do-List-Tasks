import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import AddToSideList from "./components/AddToSideLists/AddToSideList";
import MyDay from "./components/MyDay/MyDay";
import Important from "./components/Important/Important";
import Planned from "./components/Planned/Planned";
import Tasks from "./components/Tasks/Tasks";
import ListGroup from "./components/ListGroup/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import { removeFromSideList, updateSideList } from "./redux/sideList";
import {
  removeFromListGroupTotal,
  updateListGroupByApp,
} from "./redux/listGroup";
import {
  removeFromImportantTotal,
  updateImportantByApp,
} from "./redux/importantTodo";
import Search from "./components/Search/Search";

function App() {
  const [sideList, setSideList] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState(1);
  const dispatch = useDispatch();
  const removeListArray = useSelector((state) => state.sideList);
  const myDayTodo = useSelector((state) => state.myDayTodo);
  const importantTodo = useSelector((state) => state.importantTodo);
  const plannedTodo = useSelector((state) => state.plannedTodo);
  const tasksTodo = useSelector((state) => state.tasksTodo);
  const listGroupTodo = useSelector((state) => state.listGroupTodo);
  const myDayNotCompletedLength = myDayTodo.filter(
    (todo) => todo.completed === false
  ).length;
  const listGroupNotCompletedLength = listGroupTodo.filter(
    (todo) => todo.completed === false && todo.groupList === name
  ).length;
  const completedLength = importantTodo.filter(
    (todo) => todo.completed === false
  ).length;
  const tasksNotCompletedLength = tasksTodo.filter(
    (todo) => todo.completed === false
  ).length;

  useEffect(() => {
    setSideList(
      removeListArray.map((item) => (
        <div
          onClick={() => handleClick(item.id + 4)}
          style={number === item.id + 4 ? { backgroundColor: "#f4f6fb" } : null}
          id={`side-add-list-container-${item.id + 4}`}
          key={item.id}
          className="d-flex flex-row align-items-center px-0 list-groups 
        remove-list-container-main position-relative"
        >
          <div
            onClick={() => {
              setName(item.name);
            }}
            className="d-flex mx-0 flex-row w-100"
            style={{ padding: "11px 0px 11px 6px" }}
          >
            <div
              style={
                number === item.id + 4
                  ? { backgroundColor: "#5c70be", display: "block" }
                  : null
              }
              id={`side-add-list-sign-${item.id + 4}`}
              className="list-group-side-sign position-absolute"
            />
            <svg
              style={number === item.id + 4 ? { fill: "#5c70be" } : null}
              id={`side-add-list-svg-${item.id + 4}`}
              className="list-group-svg"
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
            </svg>
            <p
              style={number === item.id + 4 ? { color: "#5c70be" } : null}
              className="p-0 my-0 me-0 list-group-text"
              id={`side-add-list-text-${item.id + 4}`}
            >
              {item.name}
            </p>
            <span className="task-counter">
              {listGroupTodo.filter(
                (todo) =>
                  todo.completed === false && todo.groupList === item.name
              ).length !== 0 &&
                listGroupTodo.filter(
                  (todo) =>
                    todo.completed === false && todo.groupList === item.name
                ).length}
            </span>
          </div>
          <div
            onClick={() => {
              handleRemoveClickSideList(item.id, item.name);
            }}
            className="remove-list-container"
            id={`remove-list-container-${item.id}`}
          >
            <div className="remove-list"></div>
          </div>
        </div>
      ))
    );
  }, [
    removeListArray.length,
    listGroupTodo.length,
    listGroupNotCompletedLength,
    number,
  ]);

  function handleRemoveClickSideList(id, name) {
    dispatch(
      removeFromSideList({
        id: id,
      })
    );
    const lastId = id - 1;
    removeListArray.map((item) => item.id === lastId && setName(item.name));
    dispatch(updateSideList({ id: id }));
    dispatch(removeFromListGroupTotal({ groupList: name }));
    dispatch(updateListGroupByApp());
    dispatch(removeFromImportantTotal({ groupList: name }));
    dispatch(updateImportantByApp());
  }

  function handleClick(id) {
    setNumber(id);

    document.getElementById("search").className = "main-search";
    id === 1
      ? (document.getElementById("myDay").className =
          "main-myDay extra-main-show")
      : (document.getElementById("myDay").className = "main-myDay");
    id === 2
      ? (document.getElementById("important").className =
          "main-important extra-main-show")
      : (document.getElementById("important").className = "main-important");
    id === 3
      ? (document.getElementById("planned").className =
          "main-planned extra-main-show")
      : (document.getElementById("planned").className = "main-planned");
    id === 4
      ? (document.getElementById("tasks").className =
          "main-tasks extra-main-show")
      : (document.getElementById("tasks").className = "main-tasks");
    id > 4
      ? (document.getElementById("listGroup").className =
          "main-listGroup extra-main-show")
      : (document.getElementById("listGroup").className = "main-listGroup");
  }

  useEffect(() => {
    if (removeListArray.length === 0) {
      document.getElementById("search").className = "main-search";
      document.getElementById("myDay").className = "main-myDay extra-main-show";
      document.getElementById("important").className = "main-important";
      document.getElementById("planned").className = "main-planned";
      document.getElementById("tasks").className = "main-tasks";
      document.getElementById("listGroup").className = "main-listGroup";
    }
  }, [removeListArray.length]);

  function handleSearchComponent() {
    document.getElementById("search").className = "main-search extra-main-show";
    document.getElementById("myDay").className = "main-myDay";
    document.getElementById("important").className = "main-important";
    document.getElementById("planned").className = "main-planned";
    document.getElementById("tasks").className = "main-tasks";
    document.getElementById("listGroup").className = "main-listGroup";
  }

  return (
    <div className="container-fluid p-0 m-0 d-flex flex-row">
      {/* sidebar */}
      <div className="bg-white sidebar text-nowrap vh-100">
        {/* sidebar title */}
        <p className="text-muted sidebar-title">Microsoft To Do</p>
        {/* sidebar account */}
        <div className="d-flex flex-row justify-content-between account-container">
          <div className="d-flex flex-row align-items-center align-items-center account-name-email-logo-container">
            <div className="account-logo d-flex align-items-center justify-content-center">
              MK
            </div>
            <div className="d-flex flex-column">
              <p className="m-0 account-name">Mohammad Khosrotabar</p>
              <div className="d-flex flex-row">
                <p className="text-muted account-email m-0">
                  m.khosrotabar@hotmail.com
                </p>
                <img
                  className="chav-icon"
                  src={`${process.env.PUBLIC_URL}/chav-icon.png`}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="search-icon-container">
            <img
              onClick={handleSearchComponent}
              className="search-icon"
              src={`${process.env.PUBLIC_URL}/search-icon.png`}
              alt=""
            />
          </div>
        </div>
        {/* sidebar My Day */}
        <div
          id="side-main-list-container-1"
          onClick={() => handleClick(1)}
          style={number === 1 ? { backgroundColor: "#f8f9fa" } : null}
          className="d-flex flex-row align-items-center my-day position-relative"
        >
          <div
            style={
              number === 1
                ? { backgroundColor: "#647783", display: "block" }
                : null
            }
            className="my-day-side-sign position-absolute"
            id="side-main-list-sign-1"
          />
          <svg
            style={number === 1 ? { fill: "#647783" } : null}
            id="side-main-list-svg-1"
            className="my-day-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
          >
            <path
              d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 
              5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 
              0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 
              10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 
              0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 
              1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 
              10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
            ></path>
          </svg>
          <p
            style={number === 1 ? { color: "#647783" } : null}
            className="ep-0 my-0 me-0 my-day-text"
            id="side-main-list-text-1"
          >
            My Day
          </p>
          <span className="task-counter">
            {myDayNotCompletedLength !== 0 && myDayNotCompletedLength}
          </span>
        </div>
        {/* sidebar Important */}
        <div
          id="side-main-list-container-2"
          onClick={() => handleClick(2)}
          style={number === 2 ? { backgroundColor: "#fbf4f6" } : null}
          className="d-flex flex-row align-items-center important position-relative"
        >
          <div
            style={
              number === 2
                ? { backgroundColor: "#c14c6c", display: "block" }
                : null
            }
            className="important-side-sign position-absolute"
            id="side-main-list-sign-2"
          />
          <svg
            style={number === 2 ? { fill: "#c14c6c" } : null}
            id="side-main-list-svg-2"
            className="important-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 
              18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 
              1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 
              8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 
              0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 
              2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 0-1.109 
              0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z"
            ></path>
          </svg>
          <p
            style={number === 2 ? { color: "#c14c6c" } : null}
            className="p-0 my-0 me-0 important-text"
            id="side-main-list-text-2"
          >
            Important
          </p>
          <span className="task-counter">
            {completedLength !== 0 && completedLength}
          </span>
        </div>
        {/* sidebar Planned */}
        <div
          id="side-main-list-container-3"
          onClick={() => handleClick(3)}
          style={number === 3 ? { backgroundColor: "#f4f9f9" } : null}
          className="d-flex flex-row align-items-center planned position-relative"
        >
          <div
            style={
              number === 3
                ? { backgroundColor: "#166f6b", display: "block" }
                : null
            }
            className="planned-side-sign position-absolute"
            id="side-main-list-sign-3"
          />
          <svg
            style={number === 3 ? { fill: "#166f6b" } : null}
            id="side-main-list-svg-3"
            className="planned-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
          >
            <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
            <path
              d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 
              0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"
            ></path>
          </svg>
          <p
            style={number === 3 ? { color: "#166f6b" } : null}
            className="p-0 my-0 me-0 planned-text"
            id="side-main-list-text-3"
          >
            Planned
          </p>
          <span className="task-counter">
            {plannedTodo.filter((todo) => todo.completed === false).length !==
              0 &&
              plannedTodo.filter((todo) => todo.completed === false).length}
          </span>
        </div>
        {/* sidebar Tasks */}
        <div
          id="side-main-list-container-4"
          onClick={() => handleClick(4)}
          style={number === 4 ? { backgroundColor: "#f4f6fb" } : null}
          className="d-flex flex-row align-items-center tasks position-relative"
        >
          <div
            style={
              number === 4
                ? { backgroundColor: "#5c70be", display: "block" }
                : null
            }
            className="tasks-side-sign position-absolute"
            id="side-main-list-sign-4"
          />
          <svg
            style={number === 4 ? { fill: "#5c70be" } : null}
            id="side-main-list-svg-4"
            className="tasks-svg"
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
          >
            <path
              d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 
              .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 
              6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"
            ></path>
          </svg>
          <p
            style={number === 4 ? { color: "#5c70be" } : null}
            className="p-0 my-0 me-0 tasks-text"
            id="side-main-list-text-4"
          >
            Tasks
          </p>
          <span className="task-counter">
            {tasksNotCompletedLength !== 0 && tasksNotCompletedLength}
          </span>
        </div>
        <div className="spacer-line"></div>
        {sideList}
        <AddToSideList types="side-1" />
      </div>

      <div
        class="offcanvas offcanvas-start bg-white text-nowrap vh-100"
        id="demo"
        style={{ width: 280 }}
      >
        <div class="offcanvas-body">
          <div className="bg-white sidebar-offcanvas text-nowrap vh-100">
            {/* sidebar title */}
            <p className="text-muted sidebar-title">Microsoft To Do</p>
            {/* sidebar account */}
            <div className="d-flex flex-row justify-content-between account-container">
              <div className="d-flex flex-row align-items-center align-items-center account-name-email-logo-container">
                <div className="account-logo d-flex align-items-center justify-content-center">
                  MK
                </div>
                <div className="d-flex flex-column">
                  <p className="m-0 account-name">Mohammad Khosrotabar</p>
                  <div className="d-flex flex-row">
                    <p className="text-muted account-email m-0">
                      m.khosrotabar@hotmail.com
                    </p>
                    <img
                      className="chav-icon"
                      src={`${process.env.PUBLIC_URL}/chav-icon.png`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="search-icon-container">
                <img
                  onClick={handleSearchComponent}
                  className="search-icon"
                  src={`${process.env.PUBLIC_URL}/search-icon.png`}
                  alt=""
                />
              </div>
            </div>
            {/* sidebar My Day */}
            <div
              id="side-main-list-container-1"
              onClick={() => handleClick(1)}
              style={number === 1 ? { backgroundColor: "#f8f9fa" } : null}
              className="d-flex flex-row align-items-center my-day position-relative"
            >
              <div
                style={
                  number === 1
                    ? { backgroundColor: "#647783", display: "block" }
                    : null
                }
                className="my-day-side-sign position-absolute"
                id="side-main-list-sign-1"
              />
              <svg
                style={number === 1 ? { fill: "#647783" } : null}
                id="side-main-list-svg-1"
                className="my-day-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 
              5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 
              0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 
              10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 
              0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 
              1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 
              10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
                ></path>
              </svg>
              <p
                style={number === 1 ? { color: "#647783" } : null}
                className="ep-0 my-0 me-0 my-day-text"
                id="side-main-list-text-1"
              >
                My Day
              </p>
              <span className="task-counter">
                {myDayNotCompletedLength !== 0 && myDayNotCompletedLength}
              </span>
            </div>
            {/* sidebar Important */}
            <div
              id="side-main-list-container-2"
              onClick={() => handleClick(2)}
              style={number === 2 ? { backgroundColor: "#fbf4f6" } : null}
              className="d-flex flex-row align-items-center important position-relative"
            >
              <div
                style={
                  number === 2
                    ? { backgroundColor: "#c14c6c", display: "block" }
                    : null
                }
                className="important-side-sign position-absolute"
                id="side-main-list-sign-2"
              />
              <svg
                style={number === 2 ? { fill: "#c14c6c" } : null}
                id="side-main-list-svg-2"
                className="important-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  d="m6.516 14.323-1.49 6.452a.998.998 0 0 0 1.529 1.057L12 
              18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082a1 
              1 0 0 0-.59-1.74l-5.701-.454-2.467-5.461a.998.998 0 0 0-1.822 0L8.622 
              8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.214 4.107zm2.853-4.326a.998.998 
              0 0 0 .832-.586L12 5.43l1.799 3.981a.998.998 0 0 0 .832.586l3.972.315-3.271 
              2.944c-.284.256-.397.65-.293 1.018l1.253 4.385-3.736-2.491a.995.995 0 0 0-1.109 
              0l-3.904 2.603 1.05-4.546a1 1 0 0 0-.276-.94l-3.038-2.962 4.09-.326z"
                ></path>
              </svg>
              <p
                style={number === 2 ? { color: "#c14c6c" } : null}
                className="p-0 my-0 me-0 important-text"
                id="side-main-list-text-2"
              >
                Important
              </p>
              <span className="task-counter">
                {completedLength !== 0 && completedLength}
              </span>
            </div>
            {/* sidebar Planned */}
            <div
              id="side-main-list-container-3"
              onClick={() => handleClick(3)}
              style={number === 3 ? { backgroundColor: "#f4f9f9" } : null}
              className="d-flex flex-row align-items-center planned position-relative"
            >
              <div
                style={
                  number === 3
                    ? { backgroundColor: "#166f6b", display: "block" }
                    : null
                }
                className="planned-side-sign position-absolute"
                id="side-main-list-sign-3"
              />
              <svg
                style={number === 3 ? { fill: "#166f6b" } : null}
                id="side-main-list-svg-3"
                className="planned-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
              >
                <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
                <path
                  d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 
              0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"
                ></path>
              </svg>
              <p
                style={number === 3 ? { color: "#166f6b" } : null}
                className="p-0 my-0 me-0 planned-text"
                id="side-main-list-text-3"
              >
                Planned
              </p>
              <span className="task-counter">
                {plannedTodo.filter((todo) => todo.completed === false)
                  .length !== 0 &&
                  plannedTodo.filter((todo) => todo.completed === false).length}
              </span>
            </div>
            {/* sidebar Tasks */}
            <div
              id="side-main-list-container-4"
              onClick={() => handleClick(4)}
              style={number === 4 ? { backgroundColor: "#f4f6fb" } : null}
              className="d-flex flex-row align-items-center tasks position-relative"
            >
              <div
                style={
                  number === 4
                    ? { backgroundColor: "#5c70be", display: "block" }
                    : null
                }
                className="tasks-side-sign position-absolute"
                id="side-main-list-sign-4"
              />
              <svg
                style={number === 4 ? { fill: "#5c70be" } : null}
                id="side-main-list-svg-4"
                className="tasks-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 
              .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 
              6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"
                ></path>
              </svg>
              <p
                style={number === 4 ? { color: "#5c70be" } : null}
                className="p-0 my-0 me-0 tasks-text"
                id="side-main-list-text-4"
              >
                Tasks
              </p>
              <span className="task-counter">
                {tasksNotCompletedLength !== 0 && tasksNotCompletedLength}
              </span>
            </div>
            <div className="spacer-line"></div>
            {sideList}
            <AddToSideList types="side-2" />
          </div>
        </div>
      </div>

      <div className=" main p-0">
        <div id="search" className="main-search">
          <Search name={name} />
        </div>
        <div id="myDay" className="main-myDay extra-main-show">
          <MyDay />
        </div>
        <div id="important" className="main-important">
          <Important />
        </div>
        <div id="planned" className="main-planned">
          <Planned />
        </div>
        <div id="tasks" className="main-tasks">
          <Tasks />
        </div>
        <div id="listGroup" className="main-listGroup">
          <ListGroup name={name} />
        </div>
        <button
          class="collapse-side-menue"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#demo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            style={{ fill: "#044B9466" }}
          >
            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
