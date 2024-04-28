import * as ActionTypes from "./WebsiteLeadsActionTypes";

export const setLoading =(context)=>({
    type: ActionTypes.SET_LOADING,
    payload: {context:context}
})
// download Syllabus
export const setDownloadSyllabusLeads=(data, context)=>({
    type: ActionTypes.SET_PAGINATED_WEBSITE_LEADINGS,
    payload:{data:data, context:context}
})

//webniar
export const setWebinarLeads= (data, context)=>({
    type: ActionTypes.SET_PAGINATED_WEBSITE_LEADINGS,
    payload:{data:data, context:context}
})

// whatsapp setwhatsAppLeads

export const setwhatsAppLeads= (data, context)=>({
    type: ActionTypes.SET_PAGINATED_WEBSITE_LEADINGS,
    payload:{data:data, context:context}
})
//SLP EnquireLeads
export const setSLPEnquireLeads= (data, context)=>({
    type: ActionTypes.SET_PAGINATED_WEBSITE_LEADINGS,
    payload:{data:data, context:context}
})