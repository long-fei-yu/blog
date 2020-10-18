import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Picker from './components/Picker';
import Posts from './components/Posts';
import {selectReddit, invalidateReddit} from './redux/actions';

class App extends React.Component {

    handleChange = (nextReddit) => {
        this.props.selectReddit(nextReddit);
    }

    handleRefreshClick = () => {
        const {invalidateReddit, selectedReddit} = this.props;
        invalidateReddit(selectedReddit);
    }

    render() {
        const {selectedReddit, posts, isFetching, lastUpdated} = this.props;
        return (
            <div>
                <Picker value={selectedReddit} onChange={this.handleChange} options={['reactjs', 'frontend']}/>
                <p>
                    {lastUpdated && <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}. </span>}
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

App.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
}

const mapStateToProps = ({selectedReddit, postsByReddit}) => {
    const {isFetching, lastUpdated, items: posts} = postsByReddit[selectedReddit] || {isFetching: true, items: []};
     
    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated,
    }
}

const mapDispatchToProps = dispatch => ({
    selectReddit: nextReddit => dispatch(selectReddit(nextReddit)),
    invalidateReddit: selectedReddit => dispatch(invalidateReddit(selectedReddit)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
