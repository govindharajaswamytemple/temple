import { useEffect, useReducer } from "react";
import WebsiteLeadsReducer from "./WebsiteLeadsReducer";
import { intialState } from "./utils/WebsiteLeadsConfi";


import * as Actions from "./utils/WebsiteLeadsActions";
import * as Api from "./utils/WebsiteLeadsAPI";

const WebsiteLeadProvider = () => {
    const [websiteLeadsState, DispatchwebsiteLeads] = useReducer(WebsiteLeadsReducer, intialState);
    console.log(websiteLeadsState, "websiteLeadsState")

    //webinar leads
    const getWebinarLeads = async () => {
        DispatchwebsiteLeads(Actions.setLoading("WEBINAR_LEADS"));
        const { filter, search, pageSize, page } = websiteLeadsState?.Webinar;
        const searchobj = { search };
        const perPageObj = { pageSize };
        const currentPageObj = { page };
        const filterobj = { filter }
        try {
            const { data, status } = await Api.getWebinarLeads(filterobj, searchobj, perPageObj, currentPageObj)
            if (status === 200) {
                DispatchwebsiteLeads(Actions.setWebinarLeads(data, "WEBINAR_LEADS"))
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            DispatchwebsiteLeads(Actions.setLoading("WEBINAR_LEADS"));
        }
    }

    // whatsAPP

    const getwhatsAppLeads = async () => {
        DispatchwebsiteLeads(Actions.setLoading("WHATSAPP_LEADS"));
        const { filter, search, pageSize, page } = websiteLeadsState?.Webinar;
        const searchobj = { search };
        const perPageObj = { pageSize };
        const currentPageObj = { page };
        const filterobj = { filter }
        try {
            const { data, status } = await Api.getwhatsAppLeads(filterobj, searchobj, perPageObj, currentPageObj)
            if (status === 200) {
                DispatchwebsiteLeads(Actions.setwhatsAppLeads(data, "WHATSAPP_LEADS"))
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            DispatchwebsiteLeads(Actions.setLoading("WHATSAPP_LEADS"));
        }
    }

    
    


    //Download Syllabus
    const getDownloadSyllabusLeads = async () => {
        DispatchwebsiteLeads(Actions.setLoading("DOWNLOAD_SYLLABUS_LEADS"));
        const { filter, search, pageSize, page } = websiteLeadsState?.DownloadSyllabus;
        console.log(filter, search, pageSize, page, "fhfhth")
        const searchobj = { search };
        const perPageObj = { pageSize };
        const currentPageObj = { page };
        const filterobj = { filter }
        try {
            const { data, status } = await Api.getDownloadSyllabusLeads(filterobj, searchobj, perPageObj, currentPageObj)
            console.log(data, status, "djhfgduyf")
            if (status === 200) {
                DispatchwebsiteLeads(Actions.setDownloadSyllabusLeads(data, "DOWNLOAD_SYLLABUS_LEADS"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchwebsiteLeads(Actions.setLoading("DOWNLOAD_SYLLABUS_LEADS"));
        }
    }
    //SLP Leads
    const getSLPEnquireLeads = async () => {
        DispatchwebsiteLeads(Actions.setLoading("SLP_ENQUIRE_LEADS"));
        const { filter, search, pageSize, page } = websiteLeadsState?.SLPEnquireLeads;
        console.log(filter, search, pageSize, page, "fhfhth")
        const searchobj = { search };
        const perPageObj = { pageSize };
        const currentPageObj = { page };
        const filterobj = { filter }
        try {
            const { data, status } = await Api.getSLPEnquireLeads(filterobj, searchobj, perPageObj, currentPageObj)
            console.log(data, status, "djhfgduyf")
            if (status === 200) {
                DispatchwebsiteLeads(Actions.setSLPEnquireLeads(data, "SLP_ENQUIRE_LEADS"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchwebsiteLeads(Actions.setLoading("SLP_ENQUIRE_LEADS"));
        }
    }




    useEffect(() => {
        getDownloadSyllabusLeads();
        getWebinarLeads();
        getwhatsAppLeads();
        getSLPEnquireLeads();
    }, [])

    // download syllabus
    useEffect(() => {
        getDownloadSyllabusLeads();
    }, [websiteLeadsState?.DownloadSyllabus?.search,
    websiteLeadsState?.DownloadSyllabus?.pageSize,
    websiteLeadsState?.DownloadSyllabus?.filter,
    websiteLeadsState?.DownloadSyllabus?.page])

    // webinar
    useEffect(() => {
        getWebinarLeads();
    }, [websiteLeadsState.Webinar.search,
    websiteLeadsState.Webinar.pageSize,
    websiteLeadsState.Webinar.filter,
    websiteLeadsState.Webinar.page])

    // SLP leads
    useEffect(() => {
        getSLPEnquireLeads();
    }, [websiteLeadsState.Webinar.search,
    websiteLeadsState.Webinar.pageSize,
    websiteLeadsState.Webinar.filter,
    websiteLeadsState.Webinar.page])





    return {
        websiteLeadsState,
        DispatchwebsiteLeads,
        getDownloadSyllabusLeads,
        getWebinarLeads,
        getSLPEnquireLeads,
    }    
}
export default WebsiteLeadProvider;