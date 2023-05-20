import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsHeatmap from 'highcharts/modules/heatmap';
import { useEffect, useState } from 'react';
import { StatusEvent } from '../../../../electron/main';

HighchartsHeatmap(Highcharts);

export function ActivityHeatmap({
  statusEvents,
}: {
  statusEvents: StatusEvent[];
}) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    console.log({ series });
  }, [series]);

  useEffect(() => {
    // const statusEvents = JSON.parse(statusEventsJson);
    const data = [];

    // sort the events by timestamp
    statusEvents.sort(
      (a, b) => new Date(a?.timestamp) - new Date(b?.timestamp)
    );

    let startTime = new Date(statusEvents[0]?.timestamp);
    let inactiveTime = 0;
    let previousStatus = statusEvents[0].status;

    statusEvents.forEach(event => {
      const eventTime = new Date(event?.timestamp);
      const timeDiff = Math.abs((eventTime - startTime) / 1000);

      // if status is inactive and previous status was also inactive, increase inactiveTime
      if (event.status === 'inactive' && previousStatus === 'inactive') {
        inactiveTime += timeDiff;
      } else {
        inactiveTime = 0;
      }

      let grade = 0;

      if (inactiveTime >= 600) {
        grade = 100;
      } else if (inactiveTime >= 300) {
        grade = 90;
      } else if (inactiveTime >= 120) {
        grade = 60;
      }

      const period = determineTimePeriod(eventTime);
      const block = Math.floor(eventTime.getMinutes() / 15);

      data.push({
        period,
        block,
        grade,
      });

      startTime = eventTime;
      previousStatus = event.status;
    });

    const seriesData = {
      morning: [],
      afternoon: [],
      evening: [],
      night: [],
      graveyard: [],
      early: [],
    };

    data.forEach(point => {
      seriesData[point.period].push([point.block, point.grade]);
    });

    const series = Object.keys(seriesData).map(key => ({
      name: key,
      data: seriesData[key],
    }));

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
      type: 'heatmap',
    },
    title: {
      text: 'Activity Heatmap',
    },
    series,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
