import React from 'react';
import AddToCalendar from "@culturehq/add-to-calendar";
import {useLocation} from "react-router-dom";

function AddToMyCalender(props) {
        const location = new useLocation()

    const {name} = location.state;
    const {details} = location.state;
    const {thisLocation} = location.state;
    const startsAt = () => {
        return "2018-12-06T17:00:00-05:00"
    }
    const endsAt = () => {
        return "2018-12-06T17:00:00-05:00"
    }
    const startsAtString = ''
    const endsAtString = ''

    return (
        <div>
            <AddToCalendar
          event={{
            name: {name},
            details: {details},
            location: {thisLocation},
            startsAt: "2018-12-06T17:00:00-05:00",
            endsAt: "2018-12-06T17:00:00-05:00"
          }}
        />
        </div>
    );
}

export default AddToMyCalender;