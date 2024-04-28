import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BackButton = ({ content, heading }) => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid p-0 mb-3">
      <div className="bg_white page_title_box">
        <div className="d-flex justify-content-between me-2">
        
          <div className="text_color">{heading}</div>
          <div>
            <Link className="mute_color">
              <span onClick={() => navigate(-1)} className="text_color">
                {content}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackButton;
