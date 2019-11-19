import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';

import * as teleprogramsActions from '../../store/teleprograms/actions';
import * as teleprogramsSelectors from '../../store/teleprograms/selectors';
import * as ChannelsSelectors from '../../store/channels/selectors';

import CtrlInput from '../../component/ctrl-input';
import Button from '../../component/button';
import Spinner from '../../component/spinner';
import ErrorIndicator from '../../component/error-indicator';
import { TeleprogramItem } from './teleprogram-item';
import { DOMAIN } from '../app';
import './styles.scss';

const secInHour = 3600;
const secInMin = 60;
const oneMinute = 60000;

class Teleprograms extends Component {

    static propTypes = {
        teleprograms: PropTypes.array,
        selectedChannelId: PropTypes.string,
        isWidthTablet: PropTypes.bool,
        onBackClick: PropTypes.func,
    }

    static defaultProps = {
        teleprograms: [],
        selectedChannelId: null,
        isWidthTablet: false,
        onBackClick: ()=>{},
    }

    constructor(props) {
        super(props);
        this.state = {
            searchValue: undefined,
            currentTime: 0,
        }
        this.startTime = moment().startOf('day').format('YYYY-MM-DD HH:mm');
        this.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm');
        this.timerId = null;
        this.firstScroll = true;
        this.fetchData = true;
        this.currentProgram = React.createRef();
        this.programList = React.createRef();
    }

    componentDidMount() {
        this.getCurrentTime();
        this.timerId = setInterval(this.getCurrentTime, oneMinute);
    }

    componentDidUpdate(prevProps) {
        const { selectedChannelId, teleprograms, fetching } = this.props;
        
        const isPrevProgramsEmpty = !get(prevProps, 'teleprograms.length');
        const isNewChannelId = prevProps.selectedChannelId !== selectedChannelId;
        const hasPrograms = get(teleprograms, 'length');
        const fetchData = isNewChannelId || this.fetchData;
                
        if (fetchData && selectedChannelId && !hasPrograms && !fetching) {
            this.fetchData = false;
            this.getTeleprogramsList(this.prepareParams(selectedChannelId));
        }
        if ((isPrevProgramsEmpty || this.firstScroll) && hasPrograms) {
            this.firstScroll = false;
            this.scrollListToElem();
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    scrollListToElem = () => {
        const currentProgramNode = ReactDOM.findDOMNode(get(this.currentProgram, 'current'));
        const heightHeader = 90;
        if (currentProgramNode) {
            const top = currentProgramNode.getBoundingClientRect().top;
            const programList = this.programList.current;
            programList.scrollTop = top - heightHeader - programList.clientHeight / 2;
            
        }
    }

    getCurrentTime = () => {
        this.setState({
            currentTime: moment().hour() * secInHour + moment().minute() * secInMin,
        })
    }

    getTeleprogramsList(params) {
        const { dispatch } = this.props;
        
        dispatch(teleprogramsActions.fetchList(params));
    }

    prepareParams(xvid) {
        return {
            domain: DOMAIN,
            xvid,
            date_from: this.startTime,
            date_to: this.endTime,
        }
    }

    getTimeInSeconds(time) {
        const hh = moment(time).hour();
        const mm = moment(time).minute();
        const ss = moment(time).second();
        return hh * secInHour + mm * secInMin + ss;
    }

    searchList = (listItems) => {
        const { searchValue } = this.state;
        if (searchValue) {
            return listItems.filter(item => {
                const title = get(item, 'title', '').toUpperCase();
                return ~title.indexOf(searchValue.toUpperCase());
            });
        }
        return listItems;
    }

    onSearchChange = (ev) => {
        const { value } = ev.target;
        this.setState({
            searchValue: value,
        });
    }

    renderHeader() {
        const { searchValue } = this.state;
        return (
            <div className="Teleprograms__header">
                <div className="Teleprograms__title">Телепрограмма</div>
                <div className="Teleprograms__filterWrap">
                    <CtrlInput currentValue={searchValue} onChange={this.onSearchChange} />
                </div>
            </div>
        )
    }

    renderMessage() {
        return (
            <div className="Teleprograms__message">
                <i className="icon-arrow-left"/>
                <span className="Teleprograms__messageText">Выберите канал!</span>
            </div>
        )
    }

    renderList() {
        const { teleprograms, isWidthTablet, onBackClick, checkedChannel } = this.props;
        const { currentTime } = this.state;

        const displayTeleprogram = this.searchList(teleprograms);
        
        return (
            <React.Fragment>
                {isWidthTablet && (
                <div className="Teleprograms__btnBack">
                    <Button onClick={onBackClick}>
                        <i className="icon-arrow-left" />
                        {checkedChannel && checkedChannel[0].title}
                    </Button>
                </div>)}
                    
                <ul className="Teleprograms__ul" ref={this.programList}>
                    {displayTeleprogram.map((program, index) => {
                        const {start, duration} = program;
                        const time = this.getTimeInSeconds(start);
                        const isFinish = Number(time) + Number(duration) < Number(currentTime);
                        const isContinue = (Number(time) <= Number(currentTime)) && (Number(time) + Number(duration) >= Number(currentTime));
                        const pass = currentTime - time;
                        const percent = pass / Number(duration) * 100;
                        return (
                            <TeleprogramItem 
                                key={index}
                                item={program}
                                isFinish={isFinish}
                                isContinue={isContinue}
                                ref={isContinue && this.currentProgram}
                                percent={percent > 0 ? percent : 0}
                                />
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }
    
    render() {
        const { selectedChannelId, fetching, fetchError } = this.props;
        
        return (
            <div className="Teleprograms">
                {this.renderHeader()}
                {fetching && <Spinner />}
                {fetchError && <ErrorIndicator err={fetchError} />}
                {!fetching && !selectedChannelId && this.renderMessage()}
                {!fetching && selectedChannelId && this.renderList()}
            </div>
        )
    }
}

function mapStateToProps(state, { selectedChannelId }) {
    return {
        teleprograms: teleprogramsSelectors.selectItems(state, selectedChannelId),
        fetching: state.teleprograms.fetching,
        fetchError: state.teleprograms.fetchError,
        checkedChannel: ChannelsSelectors.selectItems(state).filter(channel => channel.xvid === selectedChannelId),
    }
}

export default connect(mapStateToProps)(Teleprograms)
