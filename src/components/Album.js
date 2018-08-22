import React, { Component } from 'react';
// import album data from inside of data folder
// name albumData
import albumData from './../data/albums';

class Album extends Component {
  constructor(props){
    super(props);
    // whatever selected album's slug matches, store the album data into
    //album
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album : album,
      currentSong: album.songs[0],
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  playDisplay(song) {
    //Play button display
    console.log(song)

  }

  pauseDisplay(song) {

  }



  render() {
    return (
      <section className='album'>
        <section id='album-info'>
          <img id='album-cover-art' src={this.state.album.albumCover}/>
          <div className='album-details'>
            <h1 id='album-title'>{this.state.album.title}</h1>
            <h2 className='artist'>{this.state.album.artist}</h2>
            <div id='release-info'>{this.state.album.releaseInfo}</div>
          </div>

        </section>

        <table id='song-list' textAlign='center' verticalAlign='middle'>
          <colgroup>
            <col id='song-number-column' />
            <col id='song-title-column' />
            <col id='song-duration-column' />
          </colgroup>
          <tbody>
          {this.state.album.songs.map((song, index) =>
              <tr className = 'song' key={index}>

                <span className='ion-play' onClick = {() => this.handleSongClick(song)}>
                  <i class="icon ion-md-play-circle"></i>
                </span>

                <span className='ion-pause' onClick = {() => this.handleSongClick(song)}>
                  <i class="icon ion-md-pause"></i>
                </span>

                <td onMouseEnter = {() => this.playDisplay(song)} onMouseLeave = {() => this.pauseDisplay(song)}> {song.title} </td>
                <td>{song.duration}</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Album;
