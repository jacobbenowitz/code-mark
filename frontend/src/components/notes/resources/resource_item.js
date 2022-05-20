import React from "react";
import { Link } from "react-router-dom";

const ResourceItem = ({ resource }) => (
  <div className="resource-item">
    <div className="resource-icon-wrapper">
      <Link to={resource.link}>
        <i className="fa-solid fa-link fa-xl resource-icon">
        </i>
      </Link>

    </div>
    <div className="resource-text">
      <span className="resource-heading">
        {resource.title}
      </span>
      <a href={resource.link} target="_blank" className="resource-link"
      >{resource.link}</a>
    </div>

  </div>
)

export default ResourceItem;