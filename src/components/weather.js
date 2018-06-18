import React, {Component} from 'react'


// call this: http://reg.bom.gov.au/fwo/IDN60903/IDN60903.94926.json


const CurrentTempComponent = ({temp}) => (
    <div>
        <p>Current: {temp}</p>
    </div>
)


export default CurrentTempComponent