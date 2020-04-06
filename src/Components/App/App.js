import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Playlist from '../Playlist/Playlist'
import SearchBar from '../SearchBar/SearchBar'
import Spotify from '../../util/Spotify'
import SearchResults from '/home/damon/jammming/src/Components/SearchResults/SearchResults.js'
class App extends React.Component {
  constructor(props){
      super(props);
      this.state={
        searchResults:[],
        playlistName:'MyPlayList',
        playlistTracks:[]
      };
      this.addTrack=this.addTrack.bind(this);
      this.removeTrack=this.removeTrack.bind(this);
      this.updatePlaylistName=this.updatePlaylistName.bind(this);
      this.savePlaylist=this.savePlaylist.bind(this);
      this.search=this.search.bind(this);
  }
  addTrack(track){
    let tracks=this.state.playlistTracks;
        if(tracks.find(savedTrack=>
                      savedTrack.id===track.id)){
            return ;
        }
          tracks.push(track);
          this.setState({playlistTracks:tracks});
  }
  removeTrack(track){
        let tracks=this.state.playlistTracks;
        tracks=tracks.filter(currentTrack => currentTrack.id!==track.id);
        this.setState({playlistTracks:tracks});
  }
  updatePlaylistName(name){
        this.setState({playlistName:name});
  }
  savePlaylist(){
        //alert("This Method is Linked")
        const trackUris=this.state.playlistTracks.map(track=>track.uri);
        Spotify.savePlaylist(this.state.playlistName,trackUris).then(()=>{
          this.setState({
            playlistName:'New Playlist',
            playlistTracks:[]
          })
        })
  }
  search(term){
         Spotify.search(term).then(searchResults=>{
           this.setState({searchResults:searchResults});
         });
  }
  render(){
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search} />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
                         onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName}
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist} />
        </div>
        </div>
      </div>
    );
  }
}

export default App;
/*
{name:'name1',artist:'artist1',album:'album1',id:1},
{name:'name2',artist:'artist2',album:'album2',id:2},
{name:'name3',artist:'artist3',album:'album3',id:3}
.{name:'playlistname1',artist:'playlistartist1',album:'playlistalbum1',id:101},
                {name:'playlistname2',artist:'playlistartist2',album:'playlistalbum2',id:102},
                {name:'playlistname3',artist:'playlistartist3',album:'playlistalbum3',id:103}
*/
