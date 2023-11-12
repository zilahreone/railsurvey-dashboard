import React from 'react'
import ReactECharts from 'echarts-for-react'

function PieDoughnut({ data, text, formatter }) {
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
      // renderMode: "html",
      trigger: 'item',
      // className: 'echarts-tooltip echarts-tooltip-dark',
      formatter: formatter && `{b}: {c} %`
      // formatter: `<div className='echarts-tooltip echarts-tooltip-dark'>sfsdf</div>`
    },
    legend: {
      orient: 'horizontal',
      // orient: 'vertical',
      // align: 'right',
      itemWidth: 15,
      // type: 'scroll',
      top: 230,
      // right: 25,
      // left: 0,
      // bottom: 0
      // itemGap: 15,
    },
    // dataset: {
    //   source: data
    // },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        top: 10,
        bottom: 5,
        radius: ['30%', '70%'],
        center: ['50%', '40%'],
        // center: ['32%', '55%'],
        label: {
          show: true, position: 'inner',
          formatter: function (params) {
            return formatter ? params.data.value + ' %' : params.data.value
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
      <ReactECharts option={option} style={{minWidth: '300px', maxHeight: '325px', justifyContent: 'center', justifyItems: 'center'}} />
      {/* <ReactECharts option={option} /> */}
    </>
  )
}

export default PieDoughnut