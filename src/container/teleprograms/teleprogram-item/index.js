import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './styles.scss';

export class TeleprogramItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        isFinish: PropTypes.bool,
        isContinue: PropTypes.bool,
        percent: PropTypes.number,
    }
    
    static defaultProps = {
        isFinish: false,
        isContinue: false,
        percent: 0,
    }

    state = {
        active: false,
    }

    onClick = () => {
        this.setState(state => ({
            active: !state.active,
        }));
    }

    render() {
        const { item, isFinish, isContinue, percent } = this.props;
        const { active } = this.state;
        const { start, desc, title } = item;
        const startTime = start ? moment(start).format('HH:mm') : '';
        
        let currentElemStyle = {};
        if (isContinue) {
            currentElemStyle = {
                backgroundImage: `linear-gradient(to right, #c5cef9 ${percent}%, #ebecf0 ${percent}%)`,
            };
        }

        return (
            <li 
                className={`TeleprogramItem ${isFinish && 'TeleprogramItem_finish'}`}
                style={currentElemStyle}
                onClick={this.onClick}
            >
                <div className="TeleprogramItem__title">
                    <div className="TeleprogramItem__titleStart">{startTime}</div>
                    <div className="TeleprogramItem__titleText">{title}</div>
                </div>
                { active && (
                    <div className="TeleprogramItem__desc">
                        <div className="TeleprogramItem__descText">{desc}</div>
                    </div>
                ) }
            </li>
        )
    }
}
