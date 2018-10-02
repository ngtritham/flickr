import React from 'react'
//import classNamesnames from 'classnames';

export default (props) => {
    const farmId = props.farmId;
    const serverId = props.serverId;
    const id = props.id;
    const secret = props.secret;
    const url = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`
    const title = props.title;
    const owner = props.owner;

    if(farmId && serverId && id && secret && url) {
        return (
            <div className="col-12 col-md-6 col-lg-2">
                <div className="portfolio-content">
                    <figure>
                        <img src={url} alt=""/>
                    </figure>
                    <div className="entry-content flex flex-column align-items-center justify-content-center" width="330px" height="225px">
                        <h5>{title}</h5>
                        <ul className="flex flex-wrap justify-content-center">
                            <li>{owner}</li>
                            <li>100 views</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    } else {
        return null
    }


}
