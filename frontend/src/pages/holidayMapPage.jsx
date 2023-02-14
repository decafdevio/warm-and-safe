import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPlace, reset } from '../features/place/placeSlice';
import "../index.css";




function holidayMapPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { places, isLoading, isError, message } = useSelector(
        (state) => state.places
    )


    const onSubmit = (e) => {
        e.preventDefault()

        const placeData = {
            user,
            lat,
            long,
            title,
            details,
            facilities,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
        };
        dispatch(createPlace(placeData));
    };

    return (
    
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={user && user.name}
              placeholder={user && user.name}
		  disabled
            />
          </div>
          <div className='form-group'>
            <input
              type='title'
              className='form-control'
              id='title'
              name='title'
              value={title}
              placeholder={user ? user._id : "Unnamed Location"}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='title'
              className='form-control'
              id='title'
              name='title'
              value={title}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
<button type='submit' className='btn'>
              Submit
            </button>
            </form>

        
    )

}

export default holidayMapPage;
