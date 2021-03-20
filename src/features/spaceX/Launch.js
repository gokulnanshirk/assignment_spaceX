import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, removeFilter, setLaunches, getLaunches, selectLaunches } from './launchSlice'
import './launch.css';

export function Launch() {
    const launches = useSelector(selectLaunches);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLaunches(''))
        console.log(launches, 'Launches in launch.js')
    }, [])

    return (
        <div className="body">
            {launches && launches.map((item) => {
                return (
                    <div className="card" key={item.flight_number}>
                        <img src={`${item.links.mission_patch_small}`} alt="Avatar" />
                        <div className="container">
                            <h4><b>{item.mission_name} #{item.flight_number}</b></h4>
                            <ul>
                                <li>Launched in {new Date(item.launch_date_utc).getFullYear()}</li>
                            </ul>
                            {/* <p>{item.details}</p> */}
                        </div>
                    </div>
                )
            })}
            <p>123</p>
            <p>456</p>
        </div>
    );
}
