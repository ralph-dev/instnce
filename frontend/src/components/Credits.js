import React, {Component} from 'react';

class Credits extends Component {
  render(){
    return(
      <div className="widget credits">
        <h1>Credits</h1>
        <div className="links">
          <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
          <div>I18next snippets from <a href="https://github.com/i18next/react-i18next/tree/master/example/react_renderProps/src">https://github.com/i18next/react-i18next/tree/master/example/react_renderProps/src</a></div>
          <div>Background image from globalmedialco <a href="http://globalmedicalco.com/photos/globalmedicalco/17/81651.jpg">http://globalmedicalco.com/photos/globalmedicalco/17/81651.jpg</a></div>
        </div>
      </div>
    );
  }
}
export default Credits;
