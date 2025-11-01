import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const Chart = ({ type = 'line', dataSource = [], xAxisData = [], title = '', theme = 'light' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
        chartInstance.current = echarts.init(chartRef.current, theme);
        // 更新图表数据
        updateChart();

    // 窗口大小变化时重绘图表
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);
  }, [theme]);

  useEffect(() => {
    // 当数据源或图表类型变化时更新图表
    updateChart();
  }, []);

  const updateChart = () => {
      chartInstance.current.setOption({
        title: {
          text: title || '图表',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
          },
        },
        series: dataSource.map(item => ({
          ...item,
          type: type,
        })),
      }, true);
  };

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default Chart;