import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import logoutIcon from "../../images/ic_logout.svg";
import profileIcon from "../../images/LOGOUT.png";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../images/logo3.png";
import "bootstrap/dist/css/bootstrap.css";
import StudentJoinClassroomDialogue from "../Dialogues/StudentJoinClassroomDialogue";
import appContext from "../../context/appContext";

const NavIcon = styled(Link)`
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #403151;
  width: 330px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 0ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  margin-left: 24px;
  margin-right: 24px;
`;

const Sidebar = ({ item_id }) => {
  const [sidebar, setSidebar] = useState(true);
  const state = useContext(appContext);

  const handleClickOpen = () => {
    state.handleClickOpenJoinClassroomDialogue();
  };

  const showSidebar = (e) => {
    e.preventDefault();
    setSidebar(!sidebar);
  };
  function onLogoutClick() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("student_name");
    localStorage.removeItem("user_type");
    localStorage.removeItem("email_address");
    localStorage.removeItem("quiz_taker");
    localStorage.removeItem("quiz_type");
    localStorage.removeItem("class_code");
    localStorage.removeItem("student");
    window.location.replace("/");
  }
  var backgroundColor = "transparent";
  return (
    <>
      <StudentJoinClassroomDialogue
        openJoinClassroomDialogue={state.openJoinClassroomDialogue}
        handleClickOpenJoinClassroomDialogue={
          state.handleClickOpenJoinClassroomDialogue
        }
        handleClickCloseJoinClassroomDialogue={
          state.handleClickCloseJoinClassroomDialogue
        }
      />
      <div style={{ zIndex: "1000" }} className="sticky-div">
        <div className="w-full h-[60px] border-b border-[#E4E1E7] pr-[15px] sticky-div mb-[0px] flex">
          <div className="w-[50%]"></div>
          <div className="w-[50%]">
            <Dropdown className="float-right">
              <Dropdown.Toggle id="profile-dropdown" variant="none">
                <div style={{ paddingBottom: "0px", marginRight: "5px" }}>
                  <img alt="" src={profileIcon}></img>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu variant="light">
                <Dropdown.Item>
                  {localStorage.getItem("email_address")}
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogoutClick}>
                  <div className="w-full flex">
                    <img alt="" className="mr-[5px]" src={logoutIcon}></img>
                    Logout
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="float-right md:mr-[60px] h-[10]" style={{}}>
              <div onClick={handleClickOpen} className="mt-[19px] ml-[10px]">
                <button
                  style={{ width: "100%", height: "0%" }}
                  type="button"
                  className=""
                  onClick={handleClickOpen}
                >
                  <div className="inline-flex">
                    <div>
                      <span className="join-class">+ Join Class</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <IconContext.Provider value={{ color: "#F7F2F9" }}>
          <SidebarNav id="sidebarNav" sidebar={sidebar}>
            <SidebarWrap>
              <div className="sm:block md:hidden ">
                <NavIcon to="#">
                  <AiIcons.AiOutlineClose onClick={showSidebar} color="white" />
                </NavIcon>
              </div>
              <div className="flex w-full justify-left items-left mt-[15px]">
                <img
                  alt=""
                  className="teepee-sidebar-icon mt-[10px] self-center mb-[30px]"
                  style={{ cursor: "pointer", transform: "translateY(-20px)" }}
                  src={logo}
                  onClick={() => {
                    window.location.replace("/");
                  }}
                />
              </div>

              {SidebarData.map((item, index) => {
                let expandSubNav = false;
                if (
                  item.id === "users_feedback" &&
                  (item_id === "users_feedback" ||
                    item_id === "evaluation_feedback")
                ) {
                  item.backgroundColor = "#7E418B";
                  item.color = "white";
                  expandSubNav = true;
                } else if (item_id === item.id) {
                  item.backgroundColor = "#7E418B";
                  item.color = "white";
                  expandSubNav = true;
                } else {
                  item.backgroundColor = "transparent";
                  item.color = "white";
                }

                if (
                  item.id !== "tutorials" &&
                  item.id !== "view_subject_detail" &&
                  item.id !== "edit_predefined_questions" &&
                  item.id !== "tracking_analytics" &&
                  item.id !== "view_onboarding_subject"
                )
                  return (
                    <SubMenu
                      item_id={item_id}
                      expandSubNav={expandSubNav}
                      backgroundColor={backgroundColor}
                      item={item}
                      key={index}
                    />
                  );

                return null;
              })}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default Sidebar;
