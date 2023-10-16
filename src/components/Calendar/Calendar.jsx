import React from 'react';
import moment from 'moment/moment';
import "moment/locale/ru";

export const Calendar = (props) => {
    const { date } = props;
    moment.updateLocale('ru', { week: { dow: 1 } });

    const startDay = moment().startOf('month').startOf('week');
    const endDay = moment().endOf('month').endOf('week');
    let endDayMonth = moment().endOf('month');
    endDayMonth = parseInt(endDayMonth.format('D'));
    let index = moment().startOf('month');
    let startDayMonth = parseInt(index.format('D'));
    let dayString = moment().format('dddd');
    dayString = dayString[0].toUpperCase() + dayString.slice(1);
    const monthNow = moment().format('MMMM')
    const monthInGenitive = moment().format('MMMM').replace(/ь$/,'я');

    const day = date.getDate();
    const year = date.getFullYear();
    let calendar = [];
    const days = startDay.clone();

    while (!days.isAfter(endDay)) {
        calendar.push(parseInt(days.clone().format('D')));
        days.add(1, 'day');
    }

    const id = () => {
        const randomNumber1 = Math.floor(Math.random() * 1000000001);
        const randomNumber2 = Math.floor(Math.random() * 1000000001);
        return randomNumber1 + randomNumber2;
    };

    let indexStarDayMonth = calendar.indexOf(startDayMonth);
    let indexEndDayMonth = calendar.indexOf(endDayMonth);
    let tbody = [];
    let tr = [];
    let countIter = 1;

    (() => {
        for (let i = 0; i <= calendar.length - 1; i++) {
            if (countIter < 7) {
                if (calendar[i] === day) {
                    tr.push(
                        <td key={id()} className='ui-datepicker-today'>
                            {calendar[i]}
                        </td>
                    );
                } else if (i < indexStarDayMonth || i > indexEndDayMonth) {
                    tr.push(
                        <td key={id()} className='ui-datepicker-other-month'>
                            {calendar[i]}
                        </td>
                    );
                } else {
                    tr.push(<td key={id()}>{calendar[i]}</td>);
                }
            } else {
                if (i > indexEndDayMonth) {
                    tr.push(
                        <td key={id()} className='ui-datepicker-other-month'>
                            {calendar[i]}
                        </td>
                    );
                } else {
                    tr.push(<td key={id()}>{calendar[i]}</td>);
                }
                tbody.push(<tr key={id()}>{tr}</tr>);
                tr = [];
                countIter = 0;
            }
            countIter++;
        }
    })();


    return (
        <div className='ui-datepicker'>
            <div className='ui-datepicker-material-header'>
                <div className='ui-datepicker-material-day'>{dayString}</div>
                <div className='ui-datepicker-material-date'>
                    <div className='ui-datepicker-material-day-num'>{day}</div>
                    <div className='ui-datepicker-material-month'>{monthInGenitive}</div>
                    <div className='ui-datepicker-material-year'>{year}</div>
                </div>
            </div>
            <div className='ui-datepicker-header'>
                <div className='ui-datepicker-title'>
                    <span className='ui-datepicker-month'>{monthNow}</span>
                    &nbsp;
                    <span className='ui-datepicker-year'>{year}</span>
                </div>
            </div>
            <table className='ui-datepicker-calendar'>
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className='ui-datepicker-week-end' />
                    <col className='ui-datepicker-week-end' />
                </colgroup>
                <thead>
                    <tr>
                        <th scope='col' title='Понедельник'>
                            Пн
                        </th>
                        <th scope='col' title='Вторник'>
                            Вт
                        </th>
                        <th scope='col' title='Среда'>
                            Ср
                        </th>
                        <th scope='col' title='Четверг'>
                            Чт
                        </th>
                        <th scope='col' title='Пятница'>
                            Пт
                        </th>
                        <th scope='col' title='Суббота'>
                            Сб
                        </th>
                        <th scope='col' title='Воскресенье'>
                            Вс
                        </th>
                    </tr>
                </thead>
                <tbody>{tbody}</tbody>
            </table>
        </div>
    );
};
