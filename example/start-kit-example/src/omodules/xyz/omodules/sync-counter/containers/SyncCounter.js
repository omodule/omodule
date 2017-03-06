import React from 'react';
import { connect } from 'react-redux';
import { increase, decrease } from '../reducer/index';
import { namespace } from '../omodule';
import { namespace as asyncNamespace } from '../../async-counter/omodule';
import { hashHistory } from 'react-router';

const SyncCounter = props => {
    return (
        <div>
            syncCounter
            result: {props.syncCounter}
            <div onClick={props.increase}>+</div>
            <div onClick={props.decrease}>-</div>
            lazyCounter
            result: {props.lazyCounter}
            <div
                onClick={() => {
                    hashHistory.push('widget/async-counter');
                }}
            >Goto AsyncCounter</div>
        </div>
    );
};

const mapStateToProps = (state, ownState) => {
    return {
        syncCounter: state[namespace],
        lazyCounter: state[asyncNamespace]
    };
};

const mapDispathchToProps = dispatch => {
    return {
        increase: increase(dispatch),
        decrease: decrease(dispatch)
    };
};

export default connect(mapStateToProps, mapDispathchToProps)(SyncCounter);
