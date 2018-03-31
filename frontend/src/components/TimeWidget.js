import React from 'react';
import Clock from 'react-live-clock';
import { I18n, Trans } from 'react-i18next';

const TimeWidget = () =>
  <I18n ns="translations">
    {
      (t, { i18n }) => (
        <div className="time-widget">
            <Clock format={t('time')} className={"clock"}/>
            <h1>{t('greeting')}</h1>
        </div>
      )
    }
  </I18n>;

export default TimeWidget
