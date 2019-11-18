import React from 'react';
import PropTypes from 'prop-types';
import last from 'lodash/last';

import Button from '../../../component/button';

import { BASE_URL } from '../../../api';
import './styles.scss';

export class ChannelItem extends React.PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        onClick: PropTypes.func,
        onProgramClick: PropTypes.func,
        active: PropTypes.bool,
        isWidthTablet: PropTypes.bool,
    }
    
    static defaultProps = {
        onClick: () => {},
        onProgramClick: () => {},
        active: false,
        isWidthTablet: false,
    }

    replaceTag = (description) => {
        let desc = description.replace(/<p>/g, '');
        return desc.replace(/<\/p>/g, '');
    }
    
    getBtnDesc = (descText) => {
        const regExp = /([^]*)<br>/;
        return last(regExp.exec(descText));
    }
    
    getDesc = (descText) => {
        const regExp = /([^]*)<br>/;
        return descText.replace(regExp, '');
    }

    onProgramClick = (ev) => {
        const { item, onLoadProgram } = this.props;
        ev.stopPropagation();
        onLoadProgram(item.xvid);
    }

    render() {
        const { item, onClick, active, isWidthTablet } = this.props;
        const { description, logo, title } = item;
        const descText = this.replaceTag(description);
        const btnDesc = this.getBtnDesc(descText);
        const desc = this.getDesc(descText);
        return (
            <li className="ChannelItem" onClick={onClick}>
                <div className="ChannelItem__title">
                    <img className="ChannelItem__titleLogo" src={`${BASE_URL}${logo}`} alt={title} />
                    <div className="ChannelItem__titleText">{title}</div>
                    <i className={`${active ? `icon-arrow-up` : `icon-arrow-down`}`} />
                </div>
                { active && (
                    <div className="ChannelItem__desc">
                        {isWidthTablet && (
                        <div className="ChannelItem__btnWrap">
                            <Button onClick={this.onProgramClick}>
                                Телепрограмма
                                <i className="icon-arrow-right" />
                            </Button>
                        </div>)}
                        <div className="ChannelItem__descBtn">{btnDesc}</div>
                        <div className="ChannelItem__descText">{desc}</div>
                    </div>
                ) }
            </li>
        )
    }
}
