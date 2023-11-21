import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'

function BarChart({ data, formatter }) {
  const [option, setOption] = useState({
    title: {
      show: true,
      text: 'ลักษณะพื้นที่ที่เกิดความเสียหาย',
      left: 'center',
      textStyle: {
        fontFamily: 'Sarabun',
        color: 'rgba(0, 0, 0, 1)',
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      // formatter: formatter ? `{b}: {c} %` : null
    },
    legend: {
      textStyle: {
        fontSize: 24
      }
    },
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
        barCategoryGap: '50%',
        barWidth: 20,
        barGap: '-100%',
        label: {
          show: true,
        },
        data: data.map(v => v.value),
        colorBy: 'data',
        color: ['#DC742E', '#C00000', '#AFABAB', '#70AD47', '#FFC000', '#4472C4', '#E67A30', '#6E231F', '#5B9BD5']
      }
    ],
  })
  useEffect(() => {
    // console.log(formatter);
    setOption({
      ...option,
      tooltip: {
        ...option.tooltip,
        formatter: formatter && `{b}: {c} %`
      },
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
          label: {
            ...option.series[0].label,
          formatter: formatter && '{c} %'
          },
          data: data.map(v => v.value)
        }
      ]
    })
  }, [data, formatter])
  return (
    <>
      <ReactECharts option={option} style={{width:'100%'}} />
    </>
  )
}

export default BarChart