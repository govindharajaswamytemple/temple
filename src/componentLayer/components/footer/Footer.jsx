import React from "react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <div class="container-fluid p-0">
      <footer class="footer button_color shadow-md mt-2">
        <div class="row footer_alignment">
          <div class="col-sm-6 fs-s footer-text">2024 © InfozIT</div>
          <div class="col-sm-6 fs-s footer-text d-flex justify-content-end align-items-center">  <Link to="https://infozit.com" class="footer-text" target="_blank">
            Design and Developed by InfozIT
          </Link>
          </div>
        </div>
      </footer>
    </div>

  );
};
