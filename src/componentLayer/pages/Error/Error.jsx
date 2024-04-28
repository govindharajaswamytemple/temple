import React from 'react'

import { MdHome } from "react-icons/md";

import "../../../assets/css/Error.css"
import { Link } from 'react-router-dom';
function Error() {
  return (
    <div>
   
    <div class="">
        <div class="error-bg" id="auth-particles">
            <div class="auth-page-content">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center mt-sm-5 pt-4">
                                <div class="mb-5 text-white-50">
                                    <h1 class="display-5 coming-soon-text">ERROR 404!</h1>
                                    <p class="fs-14 text_white">Please check back in sometime</p>
                                    <div class="mt-4 pt-2">
                                    <Link to ="/">
                                    <button className='btn btn-light'><a href="index.html"  ><MdHome /> Back to Home</a></button> 
                                    </Link>
                                    

                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
</div>
  )
}

export default Error