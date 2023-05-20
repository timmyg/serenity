import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';

const ActivityColumnChart = ({ statusEvents }) => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // const statusEvents = JSON.parse(statusEventsJson);

    // sort the events by timestamp
    statusEvents.sort(
      (a, b) => new Date(a?.timestamp) - new Date(b?.timestamp)
    );

    const data = {
      morning: { active: 0, inactive: 0 },
      afternoon: { active: 0, inactive: 0 },
      evening: { active: 0, inactive: 0 },
      night: { active: 0, inactive: 0 },
      graveyard: { active: 0, inactive: 0 },
      early: { active: 0, inactive: 0 },
    };

    statusEvents.forEach(event => {
      const eventTime = new Date(event.timestamp);
      const period = determineTimePeriod(eventTime);

      data[period][event.status]++;
    });

    const series = [
      {
        name: 'Active',
        data: Object.keys(data).map(key => data[key].active),
        color: 'purple',
      },
      {
        name: 'Inactive',
        data: Object.keys(data).map(key => data[key].inactive),
        color: 'green',
      },
    ];

    setSeries(series);
  }, [statusEvents]);

  const determineTimePeriod = date => {
    const hour = date.getHours();

    if (hour >= 8 && hour < 12) {
      return 'morning';
    } else if (hour >= 12 && hour < 16) {
      return 'afternoon';
    } else if (hour >= 16 && hour < 20) {
      return 'evening';
    } else if (hour >= 20) {
      return 'night';
    } else if (hour >= 0 && hour < 4) {
      return 'graveyard';
    } else {
      return 'early';
    }
  };

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Activity Stacked Column Chart',
    },
    xAxis: {
      categories: [
        'Morning',
        'Afternoon',
        'Evening',
        'Night',
        'Graveyard',
        'Early',
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Events count',
      },
    },
    plotOptions: {
      column: {
        stacking: 'normal',
      },
    },
    series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ActivityColumnChart;
