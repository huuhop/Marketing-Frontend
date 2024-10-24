import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { ReactComponent as FilterIcon } from "~/assets/images/Filter.svg";
import "./baseDropDownFilter.scss";

const BaseDropDownFilter = ({ filterDropDown }) => {
 
  const menu = (
    <Menu className="custom-dropdown-menu">
      <div className="custom-dropdown-content">{filterDropDown}</div>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft" arrow forceRender={true}>
        <Button
          icon={<FilterIcon style={{ fontWeight: "bold", fill: "#fff" }} />}
          title="More Filter"
        ></Button>
      </Dropdown>
    </>
  );
};

export default BaseDropDownFilter;
