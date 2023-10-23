import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

function BarChart({ data, formatter }) {
  const [option, setOption] = useState({
    title: {
      show: false,
      text: 'World Population',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: 'category',
      data: data.map(v => v.name)
    },
    series: [
      {
        type: 'bar',
        data: data.map(v => v.value),
        colorBy: 'data',
        color: ['#DC742E', '#C00000', '#AFABAB', '#70AD47', '#FFC000', '#4472C4']
      }
    ],
  })
  useEffect(() => {
    // console.log(data);
    setOption({
      ...option,
      xAxis: {
        ...option.xAxis,
        axisLabel: {
          formatter: formatter
        }
      },
      yAxis: {
        ...option.yAxis,
        data: data.map(v => v.name)
      },
      series: [
        {
          ...option.series[0],
          data: data.map(v => v.value)
        }
      ]
    })
  }, [data, formatter])
  return (
    <>
      <ReactECharts option={option} />
    </>
  )
}

export default BarChart