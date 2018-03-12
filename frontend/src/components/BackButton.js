import React from "react";

class BackButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: props.color
        }
    }

    mouseEnter() {
        if (this.props.hoverColor) {
            this.setState({
                color: this.props.hoverColor
            })
        }
    }

    mouseLeave() {
        this.setState({
            color: this.props.color
        })
    }

    render() {
        return <div dangerouslySetInnerHTML={{__html: `
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 612 612" style="enable-background:new 0 0 612 612;" xml:space="preserve"
                 width="${this.props.width}" height="${this.props.height}"
                 >
                  <style type="text/css" >
                     #fill {
                              fill: ${this.props.color};
                              transition: 1s
                          }
                      #fill:hover {
                            fill:${this.props.hoverColor}
                      }
                      >
                    </style>
                <g id="fill">
                    <path d="M612,306C612,137,475,0,306,0C137,0,0,137,0,306c0,169,137,306,306,306C475,612,612,475,612,306z M328.9,160.5l39.5,39.5
                        L260.2,308.2l117.8,117.8l-39.3,39.3L181.4,308L328.9,160.5z"/>
                </g>
            </svg>`}} className={"back-button-wrapper"}
                    onClick={this.props.onClick}/>
    }
}

export default BackButton;