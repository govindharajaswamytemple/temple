
import SLPEnquireLeads from "../SLPEnquireLeads";
import * as ActionTypes from "./utils/WebsiteLeadsActionTypes";


const WebsiteLeadsReducer = (state, action) => {

    switch (action.type) {

        // loading
        case ActionTypes.SET_LOADING:
            if (action?.payload?.context === "DOWNLOAD_SYLLABUS_LEADS") {
                return {
                    ...state,
                    DownloadSyllabus: {
                        ...state.DownloadSyllabus,
                        loading: !state?.DownloadSyllabus?.loading
                    }
                }
            }

            else if (action?.payload?.context === "WEBINAR_LEADS") {
                return {
                    ...state,
                    Webinar: {
                        ...state.Webinar,
                        loading: !state?.Webinar?.loading
                    }
                }
            }

            else if (action?.payload?.context === "WHATSAPP_LEADS") {
                return {
                    ...state,
                    whatsApp: {
                        ...state.whatsApp,
                        loading: !state?.whatsApp?.loading
                    }
                }
            }
            else if (action?.payload?.context === "SLP_ENQUIRE_LEADS") {
                return {
                    ...state,
                    SLPEnquireLeadsApp: {
                        ...state.SLPEnquireLeads,
                        loading: !state?.SLPEnquireLeads?.loading
                    }
                }
            }
            break;

        //paginated

        case ActionTypes.SET_PAGINATED_WEBSITE_LEADINGS:
            if (action?.payload?.context === "DOWNLOAD_SYLLABUS_LEADS") {
                const reducerData = action?.payload?.data;
                return {
                    ...state,
                    DownloadSyllabus: {
                        ...state.DownloadSyllabus,
                        paginatedDownloadSyllabus: reducerData?.leads,
                        searchResultDownloadSyllabus: reducerData?.searchResultStudents,
                        totalDownloadSyllabusCount: reducerData?.totalLeads,
                        totalPages: reducerData?.totalPages,
                        startDownloadSyllabus: reducerData?.startLead,
                        endDownloadSyllabus: reducerData?.endLead,
                        page: reducerData?.currentPage,
                        pageSize: reducerData?.pageSize,
                    }
                }
            }

            else if (action?.payload?.context === "WEBINAR_LEADS") {
                const reducerData = action?.payload?.data;
                return {
                    ...state,
                    Webinar: {
                        ...state.Webinar,
                        paginatedWebinar: reducerData?.leads,
                        searchResultWebinar: reducerData?.searchResultStudents,
                        totalWebinarCount: reducerData?.totalLeads,
                        totalPages: reducerData?.totalPages,
                        startWebinar: reducerData?.startLead,
                        endWebinar: reducerData?.endLead,
                        page: reducerData?.currentPage,
                        pageSize: reducerData?.pageSize,
                    }
                }
            }

            else if (action?.payload?.context === "WHATSAPP_LEADS") {
                const reducerData = action?.payload?.data;
                return {
                    ...state,
                    whatsApp: {
                        ...state.whatsApp,
                        paginatedwhatsApp: reducerData?.leads,
                        searchResultwhatsApp: reducerData?.searchResultStudents,
                        totalwhatsAppCount: reducerData?.totalLeads,
                        totalPages: reducerData?.totalPages,
                        startwhatsApp: reducerData?.startLead,
                        endwhatsApp: reducerData?.endLead,
                        page: reducerData?.currentPage,
                        pageSize: reducerData?.pageSize,
                    }
                }
            }
            else if (action?.payload?.context === "SLP_ENQUIRE_LEADS") {
                const reducerData = action?.payload?.data;
                return {
                    ...state,
                    SLPEnquireLeads: {
                        ...state.SLPEnquireLeads,
                        paginatedSLPEnquireLeads: reducerData?.leads,
                        searchResultSLPEnquireLeads: reducerData?.searchResultStudents,
                        totalSLPEnquireLeads: reducerData?.totalLeads,
                        totalPages: reducerData?.totalPages,
                        startSLPEnquireLeads: reducerData?.startLead,
                        endSLPEnquireLeads: reducerData?.endLead,
                        page: reducerData?.currentPage,
                        pageSize: reducerData?.pageSize,
                    }
                }
            }
            break;

        //search

        case ActionTypes.SET_SEARCH:
            if (action?.payload?.context === "DOWNLOAD_SYLLABUS_LEADS") {
                return {
                    ...state,
                    DownloadSyllabus: {
                        ...state.DownloadSyllabus,
                        search: action?.payload?.data,
                        page: 1
                    }
                }
            }
            else if (action?.payload?.context === "WEBINAR_LEADS") {
                return {
                    ...state,
                    Webinar: {
                        ...state.Webinar,
                        search: action?.payload?.data,
                        page: 1
                    }

                }
            }
            else if (action?.payload?.context === "WHATSAPP_LEADS") {
                return {
                    ...state,
                    whatsApp: {
                        ...state.whatsApp,
                        search: action?.payload?.data,
                        page: 1
                    }

                }
            }
            else if (action?.payload?.context === "SLP_ENQUIRE_LEADS") {
                return {
                    ...state,
                    SLPEnquireLeads: {
                        ...state.SLPEnquireLeads,
                        search: action?.payload?.data,
                        page: 1
                    }
                }
            }
            break;
     

        // perPage

        case ActionTypes.SET_PER_PAGE:
            if (action?.payload?.context === "DOWNLOAD_SYLLABUS_LEADS") {
                return {
                    ...state,
                    DownloadSyllabus: {
                        ...state.DownloadSyllabus,
                        pageSize: action?.payload?.data,
                        page: 1
                    }
                }
            }
            else if (action?.payload?.context === "WEBINAR_LEADS") {
                return {
                    ...state,
                    Webinar: {
                        ...state.Webinar,
                        pageSize: action?.payload?.data,
                        page: 1
                    }
                }
            }

            else if (action?.payload?.context === "WHATSAPP_LEADS") {
                return {
                    ...state,
                    whatsApp: {
                        ...state.whatsApp,
                        pageSize: action?.payload?.data,
                        page: 1
                    }
                }
            }
            else if (action?.payload?.context === "SLP_ENQUIRE_LEADS") {
                return {
                    ...state,
                    SLPEnquireLeads: {
                        ...state.SLPEnquireLeads,
                        pageSize: action?.payload?.data,
                        page: 1
                    }
                }
            }
            break;
        //filters

        case ActionTypes.SET_FILTERS:
            if (action?.payload?.context === "DOWNLOAD_SYLLABUS_LEADS") {
                return {
                    ...state,
                    DownloadSyllabus: {
                        ...state.DownloadSyllabus,
                        filter: action?.payload?.data,
                        page: 1
                    }
                }
            }
            else if (action?.payload?.context === "WEBINAR_LEADS") {
                return {
                    ...state,
                    Webinar: {
                        ...state.Webinar,
                        filter: action?.payload?.data,
                        page: 1
                    }
                }
            }

            else if (action?.payload?.context === "WHATSAPP_LEADS") {
                return {
                    ...state,
                    whatsApp: {
                        ...state.whatsApp,
                        filter: action?.payload?.data,
                        page: 1
                    }
                }
            }
            else if (action?.payload?.context === "SLP_ENQUIRE_LEADS") {
                return {
                    ...state,
                    SLPEnquireLeads: {
                        ...state.SLPEnquireLeads,
                        filter: action?.payload?.data,
                        page: 1
                    }
                }
            }
            break;

        //customPage
        case ActionTypes.SET_CUSTOM_PAGE:
            if (action?.payload?.context === "DOWNLOAD_SYLLABUS_LEADS") {
                return {
                    ...state,
                    DownloadSyllabus: {
                        ...state.DownloadSyllabus,
                        page: action?.payload?.data
                    }
                }
            }
            else if (action?.payload?.context === "WEBINAR_LEADS") {
                return {
                    ...state,
                    Webinar: {
                        ...state.Webinar,
                        page: action?.payload?.data
                    }
                }
            }

            else if (action?.payload?.context === "WHATSAPP_LEADS") {
                return {
                    ...state,
                    whatsApp: {
                        ...state.whatsApp,
                        page: action?.payload?.data
                    }
                }
            }
            else if (action?.payload?.context === "SLP_ENQUIRE_LEADS") {
                return {
                    ...state,
                    SLPEnquireLeads: {
                        ...state.SLPEnquireLeads,
                        page: action?.payload?.data
                    }
                }
            }
            break;



            return state;
    }

}
export default WebsiteLeadsReducer;