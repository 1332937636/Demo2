import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';

const Chart = ({ type = 'line', dataSource = [], xAxisData = [], title = '', theme = 'light' }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // 初始化图表
    if (chartRef.current) {
      try {
        chartInstance.current = echarts.init(chartRef.current, theme);
        // 更新图表数据
        updateChart();
      } catch (error) {
        console.error('Failed to initialize chart:', error);
      }
    }

    // 窗口大小变化时重绘图表
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, [theme]);

  useEffect(() => {
    // 当数据源或图表类型变化时更新图表
    updateChart();
  }, [dataSource, type]);

  const updateChart = () => {
    if (!chartInstance.current) {
      return;
    }

    if (dataSource.length === 0 || xAxisData.length === 0) {
      // 显示空数据提示
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
          data: [],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
          },
        },
        series: [],
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: '暂无数据',
              fontSize: 18,
              color: '#999',
            },
          },
        ],
      }, true);
      return;
    }

    try {
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
    } catch (error) {
      console.error('Failed to update chart:', error);
    }
  };

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default Chart;