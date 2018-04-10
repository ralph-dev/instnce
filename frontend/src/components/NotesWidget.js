import React, {Component} from 'react';
import {I18n} from 'react-i18next';

class Notes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentNote: "",
      noteList: []
    };

    this.addNote = this.addNote.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.deleteNotes = this.deleteNotes.bind(this);
  }

  componentWillMount() {
    var notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) this.setState({noteList: notes});
  }

  addNote(e) {
    e.preventDefault();
    var myNote = this.state.noteList.slice();
    let date = new Date().toDateString()
    let newNote = {noteTitle: this.state.currentNote, noteDate: date};
    if (this.state.currentNote != '') myNote.push(newNote);
    localStorage.setItem("notes", JSON.stringify(myNote));
    this.setState({noteList: myNote, currentNote: ""});
  }

  handleNote(e) {
    this.setState({currentNote: e.target.value});
  }

  deleteNotes() {
    if (window.confirm('This will erase all your notes.')) {
      this.setState({noteList: []});
      localStorage.setItem("notes", JSON.stringify([]));
    }
  }

  deleteNote(content) {
    var myNote = this.state.noteList.slice();
    var index = myNote.indexOf(content);
    myNote.splice(index, 1);
    this.setState({noteList: myNote});
    localStorage.setItem("notes", JSON.stringify(myNote));
  }

  render() {
    const nl = this.state.noteList;
    const display = nl.map(content => {
      return (
        <li key={content}>
          <div>{content.noteTitle}    <i>{content.noteDate}</i> <button className="trash" title="Delete Note" onClick={() => this.deleteNote(content)}/></div>
        </li>
      );
    });

    return (
      <I18n ns="translations">
        {
          (t, { i18n }) => (
            <div className="widget notes">
              <div className="note_grid">
                <div className="list" ref="list">
                  <ul>{display}</ul>
                </div>
                <form className="add_note" onSubmit={this.addNote}>
                  <h1>{t('notestitle')}</h1>
                  <label>
                    <input className="field" type="text" value={this.state.currentNote} onChange={this.handleNote}/>
                  </label>
                </form>
                <button className="clear" onClick={this.deleteNotes}>{t('clearbutton')}</button>
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default Notes;
