import React from 'react';
import Channels from '../channels';
import Teleprograms from '../teleprograms';
import { ErrorWrap } from '../../component/error-wrap';

import './styles.scss';

//Это не контейнер но расположен в каталоге container - т.к. в реальном приложении здесь запрашивалась бы информация о пользователе и производилась маршрутизация.
export const DOMAIN = 'oren';
export const mediaWidthTablet = '(max-width: 800px)';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedChannelId: null,
            isWidthTablet: false,
        }
    }

    componentDidMount() {
        const mediaQueryList = window.matchMedia(mediaWidthTablet);
        mediaQueryList.addListener(this.handleMediaChange);
        this.handleMediaChange(mediaQueryList);
    }

    handleMediaChange = (mql) => {
        this.setState({
            isWidthTablet: mql.matches,
        })
    };

    onSelectChannel = (id) => {
        this.setState(({ selectedChannelId }) => {
            return {
                selectedChannelId: selectedChannelId === id ? null : id,
            }
        });
    }

    onBackClick = () => {
        this.setState({
            selectedChannelId: null,
        })
    }

    render() {
        const { isWidthTablet, selectedChannelId } = this.state;
        const displayChannels = isWidthTablet ? !selectedChannelId : true;
        const displayTeleprograms = isWidthTablet ? selectedChannelId : true;

        return (
            <div className="App">
                {displayChannels && (
                    <ErrorWrap>
                        <Channels
                        selectedChannelId={selectedChannelId}
                        onSelectChannel={this.onSelectChannel}
                        isWidthTablet={isWidthTablet} />
                    </ErrorWrap>
                )}
                {displayTeleprograms && (
                    <ErrorWrap>
                        <Teleprograms
                            selectedChannelId={selectedChannelId}
                            isWidthTablet={isWidthTablet}
                            onBackClick={this.onBackClick} />
                    </ErrorWrap>
                )}
            </div>
        )
    }
}

export default App;
