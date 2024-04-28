import React from 'react'
import BackButton from '../../../components/backbutton/BackButton'
import WhatsppChat from './WhatsppChat'
function WhatsappTab() {
  return (
    <div>  <BackButton heading="Communication" content="Back" />
    <div className='container-fluid'>
        {/* <div className='card'> */}
        <ul className="nav mb-3" id="pills-tab" role="tablist">
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className=" nav-link active  button-bg black_300 rounded"
                          id="pills-configure-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-configure"
                          type="button"
                          role="tab"
                          aria-controls="pills-configure"
                          aria-selected="true"
                        >
                    Whatsapp Configure
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-Templates-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-Templates"
                          type="button"
                          role="tab"
                          aria-controls="pills-Templates"
                          aria-selected="false"
                        >
                     Templates
                        </button>
                      </li>

                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-whatsppchat-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-whatsappchat"
                          type="button"
                          role="tab"
                          aria-controls="pills-whatsappchat"
                          aria-selected="false"
                        >
                Whatsapp Chat
                        </button>
                      </li>
                     
                    </ul>



                    <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-configure"
                      role="tabpanel"
                      aria-labelledby="pills-configure-tab"
                    >
                      <div className=" p-1">
                   Whatsapp Configure
                       
                      </div>
                    </div>
                  </div>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-Templates"
                      role="tabpanel"
                      aria-labelledby="pills-Templates-tab"
                    >
                      <div className=" p-1">
                   Templates
                       
                      </div>
                    </div>
                  </div>


                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-whatsappchat"
                      role="tabpanel"
                      aria-labelledby="pills-whatsappchat-tab"
                    >
                      <div className=" p-1">
          
                       <WhatsppChat />
                      </div>
                    </div>
                  </div>
        </div>

    </div>
  )
}

export default WhatsappTab