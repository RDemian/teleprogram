import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import * as channelsActions from '../../store/channels/actions';
import * as ChannelsSelectors from '../../store/channels/selectors';

import CtrlInput from '../../component/ctrl-input';
import Spinner from '../../component/spinner';
import ErrorIndicator from '../../component/error-indicator';
import { ChannelItem } from './channel-item';
import { DOMAIN } from '../app';
import './styles.scss';

class Channels extends Component {

    static propTypes = {
        channels: PropTypes.array,
        onSelectChannel: PropTypes.func,
        isWidthTablet: PropTypes.bool,
    }

    static defaultProps = {
        channels: [],
        onSelectChannel: ()=>{},
        isWidthTablet: false,
    }

    constructor(props) {
        super(props);
        this.state = {
            searchValue: undefined,
            activeId: null,
        }
    }

    componentDidMount() {
        const { dispatch, channels } = this.props;
        const hasChannels = get(channels, 'length');
        if (!hasChannels) {
            dispatch(channelsActions.fetchList({domain: DOMAIN}));
        }
    }
    
    onChannelClick = (id) => {
        const { isWidthTablet, onSelectChannel } = this.props;

        this.setState(({ activeId }) => {
            return {
                activeId: activeId === id ? null : id,
            }
        });

        if (!isWidthTablet) {
            onSelectChannel(id);
        }
    }

    onLoadProgram = (id) => {
        const { isWidthTablet, onSelectChannel } = this.props;
        if (isWidthTablet) {
            onSelectChannel(id);
        }
    }

    onSearchChange = (ev) => {
        const { value } = ev.target;
        this.setState({
            searchValue: value,
        });
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

    renderHeader() {
        const { searchValue } = this.state;
        return (
            <div className="Channels__header">
                <div className="Channels__title">Телеканалы</div>
                <div className="Channels__filterWrap">
                    <CtrlInput currentValue={searchValue} onChange={this.onSearchChange} />
                </div>
            </div>
        )
    }
    
    renderList() {
        const { channels, isWidthTablet } = this.props;
        const { activeId } = this.state;
        const displayChannels = this.searchList(channels);

        return(
            <ul className="Channels__ul">
                {displayChannels.map(channel => {
                    return (
                        <ChannelItem
                            key={channel.chid}
                            item={channel}
                            active={channel.xvid === activeId}
                            onClick={this.onChannelClick.bind(null, channel.xvid)}
                            onLoadProgram={this.onLoadProgram.bind(null, channel.xvid)}
                            isWidthTablet={isWidthTablet}
                        />
                    )
                })}
                
            </ul>
        )
    }

    render() {
        const { fetching, fetchError } = this.props;
        
        return (
            <div className="Channels">
                {this.renderHeader()}
                {fetching && <Spinner />}
                {fetchError && <ErrorIndicator err={fetchError} />}
                {!fetchError && !fetching && this.renderList()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        channels: ChannelsSelectors.selectItems(state),
        fetching: state.channels.fetching,
        fetchError: state.channels.fetchError,
    }
}

export default connect(mapStateToProps)(Channels)
