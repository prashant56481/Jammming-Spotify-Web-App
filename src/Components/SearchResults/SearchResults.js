import React from 'react'
import './SearchResults.css'
import App from '/home/damon/jammming/src/Components/App/App.js'
import TrackList from '/home/damon/jammming/src/Components/TrackList/TrackList.js'
import Track from '../Track/Track'
class SearchResults extends React.Component{
  render(){
    return (
      <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/>

      </div>
    );
  }
}
export default SearchResults
