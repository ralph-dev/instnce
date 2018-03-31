import React from 'react';
import lscache from 'lscache';
import config from "../config";
import {bindActionCreators} from "redux";
import {getLocationAndWeather} from "../redux/actions/weatherActions";
import {connect} from "react-redux";
import {setFontSize} from "../redux/actions/settings";
import {I18n} from 'react-i18next';
class SettingsWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize: props.fontSize
        }
    }

    componentWillMount() {
        this.location = lscache.get(config.LOCATION_LOCAL_STORE_KEY) || {lat: undefined, long: undefined};
    }

    setFontSize(e) {
        this.setState({
            fontSize: e.target.value
        });
    }

    submitFontSize() {
        this.props.setFontSize(this.state.fontSize);
    }

    render() {
        return(
          <I18n ns="translations">
            {
              (t, { i18n }) => (
                <div className="widget settings-widget">
                    <h1>{t('settingstitle')}</h1>
                    <div className="weather-settings section">
                        <h2>{t('weather')}</h2>
                        <p>{t('location')}: {this.location.lat}, {this.location.long}</p>
                        <button className="settings-button" onClick={this.props.updateLocation}>{t('refresh')}</button>
                    </div>
                    <div className={"section"}>
                        <h2>{t('font')}</h2>
                        <p style={{fontSize: `${this.state.fontSize}rem`}}>Aa</p>
                        <input type="range" min="0.5" max="2" step="0.1" value={this.state.fontSize} onChange={this.setFontSize.bind(this)}/>
                        <button className="font-size-button settings-button" onClick={this.submitFontSize.bind(this)}>{t('set')}</button>
                        <h2>{t('language')}</h2>
                        <button className="settings-button" onClick={() => i18n.changeLanguage('fr')}>Français</button>
                        <button className="settings-button"onClick={() => i18n.changeLanguage('en')}>English</button>
                    </div>
                </div>
              )
            }
          </I18n>
        )
    }
}

const mapStateToProps = state => ({
    fontSize: state.settings.fontSize
});


const mapDispatchToProps = dispatch => bindActionCreators({
    updateLocation: () => getLocationAndWeather(true),
    setFontSize
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (SettingsWidget);
