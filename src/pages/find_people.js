import React, { useState, useEffect } from 'react';
import axios from '../react_utils/axios';
import { Column } from '../components/layout/column';
import { CSSTransition } from 'react-transition-group';
import { CircularProgressIndicator } from '../components/progress_indicators/circular_progress_indicator';
import { ProfileTile } from '../components/boxes/profile_tile';

// eslint-disable-next-line no-unused-vars
export function FindPeople() {

    const [users, setUsers] = useState();
    const [searchVal, setSearchVal] = useState('');

    useEffect(() => {
        !searchVal && setUsers(null,);
        if (!searchVal) {
            axios.get(`/api/users`).then(({ data })=>{
                setUsers(data);
            }).catch((e)=>{
                console.log('ERROR: ' + e);
            });
                    
        } else {
            if (searchVal) {
                axios.get(`/api/users/${searchVal}`).then(({ data }) =>{
                    setUsers(data);
                }).catch((e)=>{
                    console.log('ERROR: ' + e);
                });  
            }
        }   
    },[searchVal]);


    const usersList = users ? (
        <CSSTransition key="users" in={!!users} timeout={300} classNames="scale" unmountOnExit>
            <Column   
                padding="30px"
                alignItems='center'>
                {users && users.map(
                    user => <ProfileTile key={`${user.id}`} user={user} />
                )}
            </Column>
        </CSSTransition>
    ): null;
    
    return (
        <Column width='100%' >
            <h2 style={{ margin: '10px '}}>Find people</h2>
            <input onChange={e => setSearchVal(e.target.value)} defaultValue={''} />

            <CSSTransition key="checkNewPeople" in={!searchVal } timeout={300} classNames="scale" unmountOnExit>
                <h3 style={{ margin: '10px '}}>Check out the new people who have joined</h3>
            </CSSTransition>

            <CSSTransition key="no-matches" in={!!searchVal && users.length <1} timeout={300} classNames="scale" unmountOnExit>
                <h3 style={{ margin: '10px '}}>No matches</h3>
            </CSSTransition>
            
            { !users ? <CircularProgressIndicator /> : usersList}
         
        </Column>
    );
}


