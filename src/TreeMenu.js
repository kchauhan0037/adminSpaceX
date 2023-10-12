import React from "react";

const TreeMenu = ({ onMenuItemClick }) => {
  const menuItems = [
    "Analytic Dashboard",
    "Launch Bar Chart",
    "Launchpad Map",
    "Launch Timeline",
  ];

  return (
    <div id="menuetree">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} onClick={() => onMenuItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TreeMenu;
