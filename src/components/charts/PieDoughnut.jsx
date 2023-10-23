import React from 'react'
import ReactECharts from 'echarts-for-react'

function PieDoughnut({ data }) {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['30%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  }
  return (
    <>
      <ReactECharts option={option} />
    </>
  )
}

export default PieDoughnut