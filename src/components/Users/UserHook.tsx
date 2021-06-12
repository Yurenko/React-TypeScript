import React, { FC } from 'react';
import s from './user.module.css';
import { useState } from 'react';
import cn from 'classnames'
import SearchFormick from './SearchFormik';
import { FilterType, getUsersThunk, follow, unfollow } from '../../redux/users-reduser';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowedIsFeatching, getPageSize, getPortionSize, getSearchForm, getTotalCount, getUser } from '../../redux/users-selectors';
import { useEffect } from 'react';
import UserPage from './UserPage';
import { useHistory } from 'react-router';
import * as queryString from 'querystring'

type QueryParamsType = { term?: string; page?: string; friend?: string }
const User: React.FC = () => {
    const users = useSelector(getUser)
    const totalCount = useSelector(getTotalCount)
    const pageSize = useSelector(getPageSize)
    const portionSize = useSelector(getPortionSize)
    const currentPage = useSelector(getCurrentPage)
    const followedIsFeatching = useSelector(getFollowedIsFeatching)
    const filter = useSelector(getSearchForm)
    const history = useHistory()

    const dispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunk(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunk(currentPage, pageSize, filter))
    }
    const followCallBack = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollowCallBack = (userId: number) => {
        dispatch(unfollow(userId))
    }


    useEffect(() => {
        const parse = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parse.page) actualPage = Number(parse.page)
        if (!!parse.term) actualFilter = { ...actualFilter, term: parse.term as string }

        switch (parse.friend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: null }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: true }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: false }
                break
        }
        dispatch(getUsersThunk(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}

        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })

    }, [filter, currentPage])


    let pageCount = Math.ceil(totalCount / pageSize);
    let page: Array<number> = [];
    for (let i = 1; i <= pageCount; i++) {
        page.push(i)
    }

    let pagenationCount = Math.ceil(pageCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1)
    let leftPagenation = (portionNumber - 1) * portionSize + 1
    let rightPagenation = portionNumber * portionSize



    return <div>
        <SearchFormick onFilterChanged={onFilterChanged} />
        {portionNumber > 1 &&
            <button onClick={() => { setPortionNumber(portionNumber - 1) }} >PREV</button>
        }
        {
            page
                .filter(p => p >= leftPagenation && p <= rightPagenation)
                .map((p, index) => {
                    return <span className={cn({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNumber)} onClick={(e) => { onPageChanged(p) }} key={index}>{p}</span>
                })
        }
        {pagenationCount > portionNumber &&
            <button onClick={() => { setPortionNumber(portionNumber + 1) }} >NEXT</button>
        }
        {
            users.map((u, index) => <UserPage user={u}
                key={index}
                followedIsFeatching={followedIsFeatching}
                follow={followCallBack}
                unfollow={unfollowCallBack}

            />)
        }
    </div>

}



export default User