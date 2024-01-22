import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 50px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 15px solid white;
  background-color: #e8def8;
  margin-bottom: 8px;

  &:hover {
    background: #7e418b;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  height: 50px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #1d192b;
  font-size: 18px;
  border-radius: 15px solid white;
  border-radius: 15px solid white;
`;

const SubMenu = (props) => {
  const [subnav, setSubnav] = useState(false);
  function isItemIdInSubNav(item_id) {
    for (var item in props.item.subNav) {
      if (props.item.subNav[item].id === item_id) {
        return true;
      }
    }
    return false;
  }
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        style={{
          backgroundColor: props.item.backgroundColor,
          border:
            props.item.backgroundColor === "transparent"
              ? " 0.5px solid rgba(255, 255, 255, 0.20)"
              : "",
          borderRadius: "4px",
        }}
        to={props.item.path}
        onClick={props.item.subNav && showSubnav}
      >
        <img alt="" src={props.item.icon}></img>
        <div>
          <SidebarLabel> {props.item.title}</SidebarLabel>
        </div>
        {/* <div>
          {props.item.subNav && subnav
            ? props.item.iconOpened
            : props.item.subNav
            ? props.item.iconClosed
            : null}
        </div> */}
      </SidebarLink>
      {((props.item.subNav && isItemIdInSubNav(props.item_id)) || subnav) &&
        props.item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              <div
                style={{
                  backgroundColor:
                    item.id === props.item_id ? " #7e418b" : "transparent",
                  padding: "10px",
                  borderRadius: "5px",
                }}
                className="w-full flex text-white"
              >
                <img
                  alt=""
                  src={item.icon}
                  style={{ width: "20px", height: "20px" }}
                ></img>
                {item.id === props.item_id ? (
                  <SidebarLabel>{item.title}</SidebarLabel>
                ) : (
                  <SidebarLabel>{item.title}</SidebarLabel>
                )}
              </div>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
