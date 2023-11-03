import React from 'react'
import ReactECharts from 'echarts-for-react'

function PieDoughnut({ data, text }) {
  const option = {
    title: {
      text: text,
      left: 'center',
      textStyle: {
        fontFamily: 'Sarabun',
        color: 'rgba(0, 0, 0, 1)',
      },
      padding: [5, 0]
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      type: 'scroll',
      top: 'bottom'
      // right: 0,
      // left: 0,
      // bottom: 'left'
      // itemGap: 15,
    },
    // dataset: {
    //   source: data
    // },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['30%', '80%'],
        center: ['50%', '50%'],
        label: {
          show: true, position: 'inner',
          formatter: function (params) {
            return params.data.value
          },
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          // emphasis: {
          //   label: {
          //     show: true,
          //     position: 'center',
          //     textStyle: {
          //       fontSize: '30',
          //       fontWeight: 'bold'
          //     }
          //   }
          // }
        },
        // avoidLabelOverlap: true,
        // encode: {
        //   itemName: 'product',
        //   value: '2015'
        // }
        // label: {
        //   show: true,
        //   position: 'center'
        // },
        // emphasis: {
        //   label: {
        //     show: false,
        //     fontSize: 20,
        //     fontWeight: 'bold'
        //   },
        //   // itemStyle: {
        //   //   shadowBlur: 10,
        //   //   shadowOffsetX: 0,
        //   //   shadowColor: 'rgba(0, 0, 0, 0.5)'
        //   // }
        // },
        // labelLine: {
        //   show: false
        // },
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