import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const Chart = ({ type = 'line', dataSource = [], xAxisData = [], title = '', theme = 'light' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
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

      // 组件卸载时的清理
      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartInstance.current) {
          chartInstance.current.dispose();
          chartInstance.current = null;
        }
      };
    }
  }, [theme]);

  useEffect(() => {
    // 当数据源或图表类型变化时更新图表
    updateChart();
  }, [dataSource, xAxisData, type]);

  const updateChart = () => {
    if (chartInstance.current && Array.isArray(dataSource) && Array.isArray(xAxisData)) {
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
    } else {
      // 数据不满足条件时清空图表
      if (chartInstance.current) {
        chartInstance.current.clear();
      }
    }
  };

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default Chart;