import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YASearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyC5nd-7mwZ-MjSb_Iw_FE5sbX_PZh73jyI';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSeacrh('naruto');
    }

    videoSeacrh(term) {
        YASearch({ key: API_KEY, term: term }, (data) => {
            this.setState({
                videos: data,
                selectedVideo: data[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSeacrh(term) }, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={ videoSearch } />
                <VideoDetail video={ this.state.selectedVideo } />
                <VideoList
                    onVideoSelect={ selectedVideo => this.setState({ selectedVideo })}
                    videos={ this.state.videos }
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));