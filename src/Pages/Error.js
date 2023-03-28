import React from 'react'
import error from '../Asets/404.svg'


function Error() {
    return (
        <div class="container">
            <img src={error} style={{
                height: '332px',
                position:'relative',
                bottom: '-68px'}} ></img>
            <p style={{
                position: 'relative',
                top: '110px'
}}>The Page you are looking for doesn't exist or an other error occured. Go to <a href="/Home">Home Page.</a></p>
        </div>
    )
}

export default Error
