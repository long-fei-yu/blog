import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit} from './redux/actions';
import Picker from './components/Picker';
import Posts from './components/Posts';

class App extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const {fetchPostsIfNeeded, selectedSubreddit} = this.props;
        fetchPostsIfNeeded(selectedSubreddit);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const {fetchPostsIfNeeded, selectedSubreddit} = this.props;
            fetchPostsIfNeeded(selectedSubreddit);
        }
    }

    handleChange(nextSubreddit) {
        this.props.selectSubreddit(nextSubreddit);
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const {fetchPostsIfNeeded, invalidateSubreddit, selectedSubreddit} = this.props;
        
        invalidateSubreddit(selectedSubreddit);
        fetchPostsIfNeeded(selectedSubreddit);
    }

    render() {
        const {selectedSubreddit, posts, isFetching, lastUpdated} = this.props;

        return (
            <div>
                <Picker
                    value={selectedSubreddit}
                    onChange={this.handleChange}
                    options={['reactjs', 'frontend']}/>

                <p>
                    {lastUpdated && (
                        <span>
                            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
                        </span>
                    )}

                    {!isFetching && (
                        <a href="#" onClick={this.handleRefreshClick}>
                            Refresh
                        </a>
                    )}
                </p>

                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {!isFetching && posts.length === 0 && <h2>Empty.</h2>}

                {posts.length > 0 && (
                    <div style={{opacity: isFetching ? 0.5 : 1}}>
                        <Posts posts={posts}/>
                    </div>
                )}
            </div>
        )
    }
}

/**
 *
 * @param state
 * @returns {{selectedSubreddit: *, posts: Array, isFetching: boolean, lastUpdated}}
 *
 * isFetching 显示进度条
 * lastUpdated 存放数据最后更新时间
 * posts 列表数据
 */
const mapStateToProps = (state) => {
    const {selectedSubreddit, postsBySubreddit} = state;
    const {isFetching, lastUpdated, items: posts} = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    };

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated,
    }
};

const mapDispatchToProps = dispatch => ({
    fetchPostsIfNeeded: (subreddit) => dispatch(fetchPostsIfNeeded(subreddit)),
    invalidateSubreddit: (subreddit) => dispatch(invalidateSubreddit(subreddit)),
    selectSubreddit: (subreddit) => dispatch(selectSubreddit(subreddit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
