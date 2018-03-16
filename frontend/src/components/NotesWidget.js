import React, {Component} from 'react';

class Notes extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentNote: "",
      noteList: [],
    };
    this.addNote = this.addNote.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.deleteNotes = this.deleteNotes.bind(this);
  }
  componentWillMount(){
    var notes = JSON.parse(localStorage.getItem("notes"));
    if (notes){
      this.setState({noteList: notes});
    }
  }
  componentDidMount(){
    this.updateNote();
  }
  componentDidUpdate(){
    this.updateNote();
  }
  updateNote(){
    var html = '';
    for (var i = 0; i<this.state.noteList.length; i++){
      html += '<div class="note">' + this.state.noteList[i] + '</div>';
    }
    this.refs.list.innerHTML = html;
  }
  addNote(e){
    e.preventDefault();
    var myNote = this.state.noteList.slice();
    myNote.push(this.state.currentNote);
    localStorage.setItem("notes", JSON.stringify(myNote));
    this.setState({noteList: myNote});
    this.setState({currentNote: ""});
  }

  handleNote(e){
    this.setState({currentNote: e.target.value});
  }
  deleteNotes(){
    this.setState({noteList: []});
    localStorage.clear();
  }

  render(){
    return (
      <div className="notes">
        <form onSubmit={this.addNote}>
        <div>Notes</div>
        <label>
          <input id="field" type="text" value={this.state.currentNote} onChange={this.handleNote} />
        </label>
        </form>
        <button className="clear" onClick={this.deleteNotes}>Clear</button>
        <div className="list" ref="list"></div>
      </div>
    );
  }

}
export default Notes;
