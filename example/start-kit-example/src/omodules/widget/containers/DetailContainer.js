import React, { Component } from 'react'

class DetailContainer extends Component {
    constructor(props) {
        super(props)
        console.log('constructor');
    }

    componentDidMount() {
        console.log(this.xx);
        this.xx = 1
    }

    render() {
        return <div>
            widget DetailContainer
        </div>
    }

}

export default DetailContainer
