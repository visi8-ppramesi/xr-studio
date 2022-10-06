import { where, limit, orderBy, startAfter, doc, FieldPath, endBefore } from 'firebase/firestore'
import firebase from '../firebase.js'
// import _ from 'lodash'
// import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'
import toLower from 'lodash/toLower'

export const orderByDateDesc = (startAtParam = null) =>
    startAtParam ?
        [ orderBy('created_date', 'desc'), limit(10), startAfter(startAtParam) ] :
        [ orderBy('created_date', 'desc'), limit(10) ]

export const authorLimitTen = [ orderBy('name'), limit(10) ]

export const orderByLimit = [ orderBy('last_update'), limit(10) ]

export const scifiQuery = [ where('categories', 'array-contains', 'scifi') ]
export const scifiQueryLimitTen = [ ...scifiQuery, ...orderByLimit ]

export const actionQuery = [ where('categories', 'array-contains', 'action') ]
export const actionQueryLimitTen = [ ...actionQuery, ...orderByLimit ]

export const adventureQuery = [ where('categories', 'array-contains', 'adventure') ]
export const adventureQueryLimitTen = [ ...adventureQuery, ...orderByLimit ]

export const userQueryNextPage = (orderByParam = "email", orderBySort = "asc", startAtParam = null) => {
    if(startAtParam){
        return [ orderBy(orderByParam, orderBySort), limit(10), startAfter(startAtParam) ]
    }else{
        return [ orderBy(orderByParam, orderBySort), limit(10)]
    }
}

export const userQueryPrevPage = (orderByParam = "email", orderBySort = "asc", endBeforeParam = null) => {
    if(endBeforeParam){
        return [ orderBy(orderByParam, orderBySort), limit(10), endBefore(endBeforeParam) ]
    }else{
        return [ orderBy(orderByParam, orderBySort), limit(10)]
    }
}

export const userQueryPaginated = (orderByParam = "email", orderBySort = "asc", startAtParam = null) => {
    if(startAtParam){
        return [ orderBy(orderByParam, orderBySort), limit(10), startAfter(startAtParam) ]
    }else{
        return [ orderBy(orderByParam, orderBySort), limit(10)]
    }
}

export const comicQueryNextPage = (comic, orderByParam = "title", orderBySort = "asc", startAtParam = null) => {
    const comQuery = !comic || comic == 'all' ? [] : [ where('comics', 'array-contains', comic) ]
    if(startAtParam){
        return [ ...comQuery, orderBy(orderByParam, orderBySort), limit(10), startAfter(startAtParam) ]
    }else{
        return [ ...comQuery, orderBy(orderByParam, orderBySort), limit(10)]
    }
}

export const comicQueryPrevPage = (comic, orderByParam = "title", orderBySort = "asc", endBeforeParam = null) => {
    const comQuery = !comic || comic == 'all' ? [] : [ where('comics', 'array-contains', comic) ]
    if(endBeforeParam){
        return [ ...comQuery, orderBy(orderByParam, orderBySort), limit(10), endBefore(endBeforeParam) ]
    }else{
        return [ ...comQuery, orderBy(orderByParam, orderBySort), limit(10)]
    }
}

export const comicQueryPaginated = (comic, orderByParam = "title", orderBySort = "asc", startAtParam = null) => {
    const comQuery = !comic || comic == 'all' ? [] : [ where('comics', 'array-contains', comic) ]
    if(startAtParam){
        return [ ...comQuery, orderBy(orderByParam, orderBySort), limit(10), startAfter(startAtParam) ]
    }else{
        return [ ...comQuery, orderBy(orderByParam, orderBySort), limit(10)]
    }
}

export const authorQueryPaginated = (author, orderByParam = "name", startAtParam = null) => {
    const authorQuery = !author || author == 'all' ? [] : [ where('authors', 'array-contains', author) ]
    if(startAtParam){
        return [ ...authorQuery, orderBy(orderByParam), limit(10), startAfter(startAtParam) ]
    }else{
        return [ ...authorQuery, orderBy(orderByParam), limit(10)]
    }
}

export const categoryQueryPaginated = (category, orderByParam = "title", startAtParam = null) => {
    const catQuery = !category || category == 'all' ? [] : [ where('categories', 'array-contains', category) ]
    if(startAtParam){
        return [ ...catQuery, orderBy(orderByParam), limit(10), startAfter(startAtParam) ]
    }else{
        return [ ...catQuery, orderBy(orderByParam), limit(10)]
    }
}

export const tagQueryPaginated = (tag, orderByParam = "title", startAtParam = null) => {
    const tagQuery = !tag || tag == 'all' ? [] : [ where('tags', 'array-contains', tag) ]
    if(startAtParam){
        return [ ...tagQuery, orderBy(orderByParam), limit(10), startAfter(startAtParam) ]
    }else{
        return [ ...tagQuery, orderBy(orderByParam), limit(10)]
    }
}

export const genreQueryPaginated = (genre, orderByParam = "name", startAtParam = null) => {
    const genreQuery = !genre || genre == 'all' ? [] : [ where('genres', 'array-contains', genre) ]
    if(startAtParam){
        return [ ...genreQuery, orderBy(orderByParam), limit(10), startAfter(startAtParam) ]
    }else{
        return [ ...genreQuery, orderBy(orderByParam), limit(10)]
    }
}

export const authorComicsQuery = (authorId) => {
    const docRef = doc(firebase.db, 'authors', authorId)
    return [ where('authors', 'array-contains', docRef), limit(6) ]
}

export const searchUserQuery = (search, field = "email", startAtParam = null) => {
    if(startAtParam){
      return [ where(field, '==', search), startAfter(startAtParam)]
    }else{
      return [ where(field, '==', search) ]
    }
}

export const searchQueryArrayAll = (searchQ, orderByParam = 'title', startAtParam = null) => {
    if(typeof searchQ == 'string'){
        searchQ = [...new Set([...searchQ.split(' ')])]
    }else if(isObject(searchQ)){
        searchQ = Object.keys(searchQ)
    }

    searchQ = searchQ.map(toLower)

    if(startAtParam){
        return [where('keywords', 'array-contains-any', searchQ), orderBy(orderByParam), startAfter(startAtParam)]
    }else{
        return [where('keywords', 'array-contains-any', searchQ), orderBy(orderByParam)]
    }
}

export const searchQueryArray = (searchQ, orderByParam = 'title', startAtParam = null) => {
    if(typeof searchQ == 'string'){
        searchQ = [...new Set([...searchQ.split(' ')])]
    }else if(isObject(searchQ)){
        searchQ = Object.keys(searchQ)
    }

    searchQ = searchQ.map(toLower)

    if(startAtParam){
        return [where('keywords', 'array-contains-any', searchQ), orderBy(orderByParam), limit(10), startAfter(startAtParam)]
    }else{
        return [where('keywords', 'array-contains-any', searchQ), orderBy(orderByParam), limit(10)]
    }
}

export const searchQueryMap = (searchQ) => {//, orderByParam = 'title', startAtParam = null) => {
    if(typeof searchQ == 'string'){
        searchQ = [...new Set([...searchQ.split(' ')])]
    }else if(isObject(searchQ)){
        searchQ = Object.keys(searchQ)
    }

    searchQ = searchQ.map(toLower)

    const whereQueries = searchQ.map((key) => {
        return where(new FieldPath('keywords', key), '==', true)
    })
    return [...whereQueries]
    // if(startAtParam){
    //     return [...whereQueries, orderBy(orderByParam), limit(10), startAfter(startAtParam)]
    // }else{
    //     return [...whereQueries, orderBy(orderByParam), limit(10)]
    // }
}

export const searchComicByName = (searchQ, orderByParam = 'title', startAtParam = null) => {
    if(startAtParam){
        return [where('title', '==', searchQ), orderBy(orderByParam), limit(10), startAfter(startAtParam)]
    }else{
        return [where('title', '==', searchQ), orderBy(orderByParam), limit(10)]
    }
}
