import React from 'react';
import { connect } from 'react-redux';
import { increase, decrease } from '../reducer/index';
import { namespace } from '../omodule';
import { namespace as syncNamespace } from '../../sync-counter/omodule';
import { hashHistory } from 'react-router';

const LazyCounter = props => {
    return (
        <div>
            LazyCounter
            result: {props.syncCounter}
            <div onClick={props.increase}>+</div>
            <div onClick={props.decrease}>-</div>
            <div
                onClick={() => {
                    hashHistory.push('widget/sync-counter');
                }}
            >Goto SyncCounter</div>
        </div>
    );
};

const mapStateToProps = (state, ownState) => {
    return {
        syncCounter: state[namespace]
    };
};

const mapDispathchToProps = dispatch => {
    return {
        increase: increase(dispatch),
        decrease: decrease(dispatch)
    };
};

export default connect(mapStateToProps, mapDispathchToProps)(LazyCounter);
