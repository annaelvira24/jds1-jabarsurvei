import React from 'react';

function Demo(){
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-t-green">Green</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-t-yellow">Yellow</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-t-blue">Blue</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-outline-t-green">Green</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-outline-t-yellow">Yellow</button>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-outline-t-blue">Blue</button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="alert alert-t-green">Green</div>
                </div>
                <div className="col">
                    <div className="alert alert-t-yellow">Yellow</div>
                </div>
                <div className="col">
                    <div className="alert alert-t-blue">Green</div>
                </div>
            </div>
        </div>
        
    )
}

export default Demo;