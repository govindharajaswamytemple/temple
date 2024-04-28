import React from 'react'
import "../../../../assets/css/WhatsappChat.css";
import { CiSettings } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { AiOutlineAudioMuted } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { BsReply } from "react-icons/bs";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import Button from '../../../components/button/Button';
function WhatsppChat() {
  return (







    // "card card-hieght-100"
    <div>
      <div className={"container"}>
        <div className={"row justify-content-center"}>
          <div className={" col-xxl-6 col-xl-6 col-lg-6 col-md-12  col-sm-12  card "}>
            <div
             
            >
              <div className="card-header border-bottom align-items-center d-flex">
                <h4 className=" mb-0 flex-grow-1 tbl-card-header fs-16 text_color pb-1">
                  Chat
                </h4>
                <div className="flex-shrink-0">
                  <div class="dropdown">
                    <button
                      class="dropdown-toggle bg-transparent border-0 day-dropdown fs-13"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="chat-setting-icon me-1">
                        <CiSettings />
                      </span>
                      Setting
                    </button>
                    <ul class="dropdown-menu table-dropdown-menu ">
                      <li>
                        <a class="dropdown-item fw-medium fs-13" href="#">
                          <span className="text_mute me-1">
                            <FaUser />{" "}
                          </span>{" "}
                          View Profile
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item fw-medium fs-13" href="#">
                          <span className="text_mute me-1">
                            <HiOutlineArchiveBoxArrowDown />{" "}
                          </span>
                          Archieve
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item fw-medium fs-13" href="#">
                          <span className="text_mute me-1">
                            <AiOutlineAudioMuted />
                          </span>
                          Muted
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item fw-medium fs-13" href="#">
                          <span className="text_mute me-1">
                            <RiDeleteBin5Line />
                          </span>
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body p-0">
                <div id="user-chat">
                  <div
                    className="chat-conversation p-3 simplebar-scrollable-y "
                    id="chat-conversation"
                    data-simplebar="init"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="simplebar-wrapper"
                      style={{ margin: "-16px" }}
                    >
                      <div className="simplebar-height-auto-observer-wrapper">
                        <div className="simplebar-height-auto-observer">
                          <div className="simplebar-mask ">
                            <div
                              className="simplebar-offset"
                              style={{
                                right: "0px",
                                bottom: "0px",
                                scrollbarWidth: "1px",
                              }}
                            >
                              <div
                                className="simplebar-content-wrapper "
                                tabIndex={0}
                                role="region"
                                aria-label="scrollable content"
                                style={{
                                  // height: "400px",
                                  overflow: "hidden scroll",
                                  //  scrollbarWidth:"4px"
                                }}
                              >
                                <div
                                  className="simplebar-content"
                                  style={{ padding: "16px" }}
                                >
                                  <ul
                                    className="list-unstyled chat-conversation-list  d-flex flex-column gap-1"
                                    id="user-conversation"
                                  >
                                    <li className=" chat-left  mb-2 align-items-start p-1 ">
                                      <div className="conversation-list d-flex flex-row">
                                        <div className="chat-avatar d-flex justify-content-end align-items-end">
                                          <img
                                            src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-2.jpg"
                                            className="img-avatar avatar-xs rounded-circle me-3 "
                                            alt=""
                                          />
                                        </div>
                                        <div className="user-chat-content ">
                                          <div className="ctext-wrap d-flex mb-1 me-5 ">
                                            <div className="ctext-wrap-content  p-1 rounded chat_left_color">
                                              {" "}
                                              <p
                                                className="ms-2 ctext-content chat-font-size text-start "
                                                style={{
                                                  whiteSpace: "pre-wrap",
                                                }}
                                              >
                                                Good morning 😊
                                              </p>
                                            </div>
                                            <div class="dropdown">
                                              <div
                                                class="dropdown-toggle bg-transparent border-0 day-dropdown chat-dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <span className="doticons">
                                                  <BiDotsVerticalRounded className="doticons" />
                                                </span>
                                              </div>
                                              <ul class="dropdown-menu chat-dropdown-menu-left">
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <BsReply />{" "}
                                                    </span>{" "}
                                                    Reply
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium "
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <AiOutlineShareAlt />{" "}
                                                    </span>
                                                    Forward
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <MdContentCopy />
                                                    </span>
                                                    Copy
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <MdContentCopy />
                                                    </span>
                                                    Copy
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <FaRegBookmark />
                                                    </span>
                                                    Bookmark
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                          <div class="conversation-name">
                                            <small class="text_mute time  small text-start">
                                              09:07 am
                                            </small>{" "}
                                            <span class="text_success check-message-icon">
                                              <i class="ri-check-double-line align-bottom"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <li className=" chat-right  mb-3 d  p-1">
                                      <div className="conversation-list  ">
                                        <div className="user-chat-content d-flex ms-5 ">
                                          <div className="ctext-wrap d-flex   mb-1  ">
                                            <div class="dropdown">
                                              <div
                                                class="dropdown-toggle bg-transparent border-0 day-dropdown chat-dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <span className="doticons">
                                                  <BiDotsVerticalRounded className="doticons" />
                                                </span>
                                              </div>
                                              <ul class="dropdown-menu chat-dropdown-menu-right">
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <BsReply />{" "}
                                                    </span>{" "}
                                                    Reply
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium "
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <AiOutlineShareAlt />{" "}
                                                    </span>
                                                    Forward
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <MdContentCopy />
                                                    </span>
                                                    Copy
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <FaRegBookmark />
                                                    </span>
                                                    Bookmark
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <RiDeleteBin5Line />
                                                    </span>
                                                    Delete
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>

                                            <div className="ctext-wrap-content d-flex chat_right_color  ps-1 p-1 rounded">
                                              <p
                                                class="ms-2  ctext-content chat-font-size text_success right-text  "
                                                style={{
                                                  whiteSpace: "pre-wrap",
                                                }}
                                              >
                                                Good morning, How are you? What
                                                about our next meeting?
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="conversation-name">
                                          <span class="text_success check-message-icon me-1">
                                            <IoCheckmarkDoneSharp />
                                          </span>
                                          <small class="text_mute time  small text-start">
                                            09:08 am
                                          </small>{" "}
                                        </div>
                                      </div>
                                    </li>

                                    <li className=" chat-left  mb-2 align-items-start p-1">
                                      <div className="conversation-list d-flex flex-row">
                                        <div className="chat-avatar d-flex justify-content-end align-items-end">
                                          <img
                                            src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-2.jpg"
                                            className="img-avatar avatar-xs rounded-circle me-3 "
                                            alt=""
                                          />
                                        </div>
                                        <div className="user-chat-content   ">
                                          <div className="ctext-wrap d-flex   mb-1  me-5">
                                            <div className="ctext-wrap-content chat_left_color p-1 rounded">
                                              {" "}
                                              <p
                                                className="ms-2 ctext-content chat-font-size text-start  "
                                                style={{
                                                  whiteSpace: "pre-wrap",
                                                }}
                                              >
                                                Yeah everything is fine. Our
                                                next meeting tomorrow at 10.00
                                                AM
                                              </p>
                                            </div>
                                            <div class="dropdown">
                                              <div
                                                class="dropdown-toggle bg-transparent border-0 day-dropdown chat-dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <span className="doticons">
                                                  <BiDotsVerticalRounded className="doticons" />
                                                </span>
                                              </div>
                                              <ul class="dropdown-menu chat-dropdown-menu-left">
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <BsReply />{" "}
                                                    </span>{" "}
                                                    Reply
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium "
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <AiOutlineShareAlt />{" "}
                                                    </span>
                                                    Forward
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <MdContentCopy />
                                                    </span>
                                                    Copy
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <FaRegBookmark />
                                                    </span>
                                                    Bookmark
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <RiDeleteBin5Line />
                                                    </span>
                                                    Delete
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>

                                          <div className="ctext-wrap d-flex   mb-1  me-5">
                                            <div className="ctext-wrap-content chat_left_color p-1 rounded">
                                              {" "}
                                              <p
                                                className="ms-2 ctext-content chat-font-size text-start rounded  "
                                                style={{
                                                  whiteSpace: "pre-wrap",
                                                }}
                                              >
                                                Hey, I'm going to meet a friend
                                                of mine at the department store.
                                                I have to buy some presents for
                                                my parents 🎁.
                                              </p>
                                            </div>
                                            <div class="dropdown">
                                              <div
                                                class="dropdown-toggle bg-transparent border-0 day-dropdown chat-dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <span className="doticons">
                                                  <BiDotsVerticalRounded className="doticons" />
                                                </span>
                                              </div>
                                              <ul class="dropdown-menu chat-dropdown-menu-left">
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <BsReply />{" "}
                                                    </span>{" "}
                                                    Reply
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium "
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <AiOutlineShareAlt />{" "}
                                                    </span>
                                                    Forward
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <MdContentCopy />
                                                    </span>
                                                    Copy
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <FaRegBookmark />
                                                    </span>
                                                    Bookmark
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <RiDeleteBin5Line />
                                                    </span>
                                                    Delete
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                          <div class="conversation-name">
                                            <small class="text_mute time  small text-start">
                                              09:10 am
                                            </small>{" "}
                                            <span class="text_success check-message-icon">
                                              <i class="ri-check-double-line align-bottom"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </li>

                                    <li className=" chat-right  mb-3 d  p-1">
                                      <div className="conversation-list  ">
                                        <div className="user-chat-content d-flex ms-5 ">
                                          <div className="ctext-wrap d-flex   mb-1  ">
                                            <div class="dropdown">
                                              <div
                                                class="dropdown-toggle bg-transparent border-0 day-dropdown chat-dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <span className="doticons">
                                                  <BiDotsVerticalRounded className="doticons" />
                                                </span>
                                              </div>
                                              <ul class="dropdown-menu chat-dropdown-menu-right">
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <BsReply />{" "}
                                                    </span>{" "}
                                                    Reply
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium "
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <AiOutlineShareAlt />{" "}
                                                    </span>
                                                    Forward
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <MdContentCopy />
                                                    </span>
                                                    Copy
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <FaRegBookmark />
                                                    </span>
                                                    Bookmark
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <RiDeleteBin5Line />
                                                    </span>
                                                    Delete
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>

                                            <div className="ctext-wrap-content d-flex  chat_right_color ps-1 p-1 rounded">
                                              <p
                                                class="ms-2  ctext-content chat-font-size text_success right-text  "
                                                style={{
                                                  whiteSpace: "pre-wrap",
                                                }}
                                              >
                                                Wow that's Great!
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="conversation-name">
                                          <span class="text_success check-message-icon me-1">
                                            <IoCheckmarkDoneSharp />
                                          </span>
                                          <small class="text_mute time  small text-start">
                                            09:08 am
                                          </small>{" "}
                                        </div>
                                      </div>
                                    </li>

                                    <li className=" chat-left  mb-2 align-items-start p-1">
                                      <div className="conversation-list d-flex flex-row">
                                        <div className="chat-avatar d-flex justify-content-end align-items-end">
                                          <img
                                            src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-2.jpg"
                                            className="img-avatar avatar-xs rounded-circle me-3 "
                                            alt=""
                                          />
                                        </div>
                                        <div className="user-chat-content   ">
                                          <div className="ctext-wrap d-flex   mb-1  me-5">
                                            <div className="message-img mb-0 d-flex">
                                              <div className="message-img-list">
                                                <div className="position-relative">
                                                  <a
                                                    class="popup-img d-inline-block"
                                                    href=""
                                                  >
                                                    <img
                                                      src="https://themesbrand.com/velzon/html/default/assets/images/small/img-1.jpg"
                                                      alt=""
                                                      class="rounded border "
                                                    />
                                                  </a>
                                                </div>
                                                <div
                                                  className="message-img-link position-absolute "
                                                  style={{
                                                    right: "5px",
                                                    bottom: "2px",
                                                  }}
                                                >
                                                  <ul
                                                    className="list-inline mb-0 "
                                                    style={{}}
                                                  >
                                                    <li className="list-inline-item dropdown">
                                                      <a
                                                        class="dropdown-toggle bg-transparent border-0 day-dropdown chat-dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                      >
                                                        <span className="img-doticons">
                                                          {" "}
                                                          <HiDotsHorizontal className="img-doticons" />
                                                        </span>
                                                      </a>
                                                      <ul class="dropdown-menu img-dropdown-menu">
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium"
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <BsReply />{" "}
                                                            </span>{" "}
                                                            Reply
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium "
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <AiOutlineShareAlt />{" "}
                                                            </span>
                                                            Forward
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium"
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <MdContentCopy />
                                                            </span>
                                                            Copy
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium"
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <FaRegBookmark />
                                                            </span>
                                                            Bookmark
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium"
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <RiDeleteBin5Line />
                                                            </span>
                                                            Delete
                                                          </a>
                                                        </li>
                                                      </ul>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                              <div className="message-img-list">
                                                <div className="position-relative">
                                                  <a
                                                    class="popup-img d-inline-block"
                                                    href=""
                                                  >
                                                    <img
                                                      src="https://themesbrand.com/velzon/html/default/assets/images/small/img-2.jpg"
                                                      alt=""
                                                      class="rounded border "
                                                    />
                                                  </a>
                                                </div>
                                                <div
                                                  className="message-img-link position-absolute "
                                                  style={{
                                                    right: "5px",
                                                    bottom: "2px",
                                                  }}
                                                >
                                                  <ul
                                                    className="list-inline mb-0 "
                                                    style={{}}
                                                  >
                                                    <li className="list-inline-item dropdown">
                                                      <a
                                                        class="dropdown-toggle bg-transparent border-0 day-dropdown chat-dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                      >
                                                        <span className="img-doticons">
                                                          {" "}
                                                          <HiDotsHorizontal className="img-doticons" />
                                                        </span>
                                                      </a>
                                                      <ul class="dropdown-menu img-dropdown-menu">
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium"
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <BsReply />{" "}
                                                            </span>{" "}
                                                            Reply
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium "
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <AiOutlineShareAlt />{" "}
                                                            </span>
                                                            Forward
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium"
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <MdContentCopy />
                                                            </span>
                                                            Copy
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium"
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <FaRegBookmark />
                                                            </span>
                                                            Bookmark
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            class="dropdown-item fw-medium"
                                                            href="#"
                                                          >
                                                            <span className="text_mute me-1">
                                                              <RiDeleteBin5Line />
                                                            </span>
                                                            Delete
                                                          </a>
                                                        </li>
                                                      </ul>
                                                    </li>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="conversation-name">
                                            <small class="text_mute time  small text-start">
                                              09:07 am
                                            </small>{" "}
                                            <span class="text_success check-message-icon">
                                              <i class="ri-check-double-line align-bottom"></i>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </li>

                                    <li className=" chat-right  mb-3 d  p-1">
                                      <div className="conversation-list  ">
                                        <div className="user-chat-content d-flex ms-5 ">
                                          <div className="ctext-wrap d-flex   mb-1 ">
                                            <div class="dropdown">
                                              <div
                                                class="dropdown-toggle bg-transparent border-0 day-dropdown chat-dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                              >
                                                <span className="doticons">
                                                  <BiDotsVerticalRounded className="doticons" />
                                                </span>
                                              </div>
                                              <ul class="dropdown-menu chat-dropdown-menu-right">
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <BsReply />{" "}
                                                    </span>{" "}
                                                    Reply
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium "
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <AiOutlineShareAlt />{" "}
                                                    </span>
                                                    Forward
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <MdContentCopy />
                                                    </span>
                                                    Copy
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <FaRegBookmark />
                                                    </span>
                                                    Bookmark
                                                  </a>
                                                </li>
                                                <li>
                                                  <a
                                                    class="dropdown-item fw-medium"
                                                    href="#"
                                                  >
                                                    <span className="text_mute me-1">
                                                      <RiDeleteBin5Line />
                                                    </span>
                                                    Delete
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>

                                            <div className="ctext-wrap-content d-flex chat_right_color ps-1 p-1 rounded">
                                              <p
                                                class="ms-2  ctext-content chat-font-size text_success right-text   "
                                                style={{
                                                  whiteSpace: "pre-wrap",
                                                }}
                                              >
                                                Lorem ipsum dolor sit amet
                                                consectetur adipisicing elit.
                                                Ullam amet error exercitationem
                                                consequatur labore, earum
                                                nesciunt ea possimus quas in,
                                                quidem eaque aspernatur
                                                laboriosam dolore itaque modi
                                                delectus eos. Ipsa.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="conversation-name">
                                          <span class="text_success check-message-icon me-1">
                                            <IoCheckmarkDoneSharp />
                                          </span>
                                          <small class="text_mute time  small text-start">
                                            09:08 am
                                          </small>{" "}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-top border-top-dashed">
                  <div className="row g-2 mx-3 mt-2 mb-3 ">
                    <div className="col">
                      <div className="position-relative ">
                        <input
                          type="text"
                          className="form-control send-message-input bg_white "
                          placeholder="Enter a message...."
                        />
                      </div>
                    </div>
                    <div className="col-auto">

                    <Button
                        type="button"
                        className="btn btn-sm btn-md btn_primary fs-13"
                      >
                     
                            Send
                          <IoMdSend className="text_white " />
                       
                      </Button>
                     
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




export default WhatsppChat