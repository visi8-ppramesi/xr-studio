import { query, where, limit, orderBy, startAfter, startAt, doc, FieldPath, endBefore, getDoc } from 'firebase/firestore'
import isNil from 'lodash/isNil'

export const shootCalendarBetweenQuery = (ref, startAtParam, endAtParam) => {
    return query(ref, where('locked_in_start_date', '>=', startAtParam), where('locked_in_start_date', '<=', endAtParam))
}

export const shootCalendarCreatedByQuery = (ref, startAtParam, endAtParam) => {
    return query(ref, where('creation_date', '>=', startAtParam), where('creation_date', '<=', endAtParam))
}

export const paginationQuery = (ref, limitParam, startAtParam = null) => {
    if(isNil(startAtParam)){
        return query(ref, orderBy('name'), limit(limitParam))
    }else{
        return query(ref, orderBy('name'), startAt(startAtParam), limit(limitParam))
    }
}

export const searchByName = () => {
    
}