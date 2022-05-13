import React from "react";
import { Link } from "react-router-dom";

const ResourceItem = ({ resource }) => (
  <div className="resource-item">
    <div className="resource-icon-wrapper">
      <i class="fa-solid fa-link fa-xl"></i>
    </div>
    <div className="resource-text">
      <span className="resource-heading">
        {resource.title}
      </span>
      <Link to={resource.link}>{resource.link}</Link>
    </div>

  </div>
)

export default ResourceItem;