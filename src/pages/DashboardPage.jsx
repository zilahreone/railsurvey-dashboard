import React, { useEffect, useMemo, useState } from 'react'
import api from '../utils/api'
import DashboardResult from '../components/DashboardResult'
import station from '@/assets/station.json'
import Report from '../components/Report'
import moment from 'moment'
import { usePDF, Document, Page, PDFDownloadLink, BlobProvider, pdf, PDFViewer } from '@react-pdf/renderer'
import Cookies from 'js-cookie'
import { saveAs } from 'file-saver'
import BarChart from '../components/charts/BarChart'
import PieDoughnut from '../components/charts/PieDoughnut'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const types = [
  { 'ความเสียหายของราง (Situation)': 'situation' },
  { 'ตำแหน่งที่เกิดความเสียหายของราง (Location)': 'location' },
  { 'ลักษณะความเสียหายที่เกิดขึ้น (Pattern, nature)': 'pattern' },
  { 'ลักษณะพื้นที่ที่เกิดความเสียหาย': 'areaCondition' },
  { 'คุณภาพทาง': 'trackQuality' },
  { 'ประวัติการซ่อมบำรุง': 'maintenanceRecord' }
]
const qty = {
  header: ['ลักษณะคุณภาพทาง', 'สมบูรณ์', 'ไม่สมบูรณ์'],
  title: [{ 'มิติทางเรขาคณิต': 'trackGeometryCondition' }, { 'สภาพหินโรยทาง': 'ballastCondition' }, { 'สภาพของหมอนรองทาง': 'sleeperCondition' }, { 'คันทาง': 'trackFoundationCondition' }]
}
const result_template = {
  severity: {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0
  },
  situation: {
    plain_rail: 0,
    rail_end: 0,
    crossing: 0,
    welding_repair: 0,
    fish_plate: 0,
    welding_join: 0,
    turn_out: 0,
    railroad_crossing: 0,
    other: 0
  },
  location: {
    rail_head: 0,
    rail_web: 0,
    rail_foot: 0,
    full_section: 0,
    guade_side: 0,
    surface_of_rail_head: 0
  },
  pattern_nature: {
    fracture: 0,
    crack: 0,
    wear: 0,
    distorted_rail: 0,
    corrosion: 0
  },
  failure_area: {
    main: 0,
    siding: 0,
    slope: 0,
    curve: 0,
    station: 0,
    tunnel: 0,
    bridge: 0,
    flood: 0,
    other: 0
  },
  trackQuality: {
    trackGeometryCondition: {
      perfect: 0,
      imperfect: 0
    },
    ballastCondition: 0,
    sleeperCondition: 0,
    trackFoundationCondition: 0
  },
  maintenanceRecord: {
    true: 0,
    false: 0
  },
}
const mounth = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฎาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม'
]

function DashboardPage() {
  const [total, setTotal] = useState(0)
  const [flag, setFlag] = useState(false)
  const [rawData, setRawData] = useState(null)
  const [analys, setAnalys] = useState('count')
  const [formatter, setFormatter] = useState(null)
  // const [result, setResult] = useState(result_template)
  // const [resultPercent, setResultPercent] = useState(result_template)
  const [resultCount, setResultCount] = useState(result_template)
  const [filter, setFilter] = useState([])
  const [queryFilter, setQueryFilter] = useState({
    date: {
      start: null,
      end: moment().format('YYYY-MM-DD'),
    },
    area: {
      key: null, value: null
    },
    zone: {
      key: null, value: null
    },
    station: {
      from: {
        key: null, value: null
      },
      to: {
        key: null, value: null
      }
    },
    severity: []
  })
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'))
  const [instance, updateInstance] = usePDF({ document: null })
  const [waitDownload, setWaitDownload] = useState(false)
  const [blobURL, setBlobURL] = useState(null)
  // console.log(currentDate);
  useEffect(() => {
    // api.get('/rail-survey?offset=0&datefrom=2020-01-01&dateto=2020-01-10&area=qwe&zone=asd&station=tyut&from=wer&to=pdf&severity=level2', null).then((resp) => {
    api.get(`/rail-survey?offset=0&limit=1000&date-start=${queryFilter.date.start}&date-end=${queryFilter.date.end}`, null).then((resp) => {
      resp.json().then((json) => {
        // console.log(json.map(v => v.generalSurvey.date));
        setTotal(json.length)
        // setData(json)
        setRawData(json)
        // handleFetchResult(json)
        setFlag(true)
      })
    })
  }, [queryFilter.date])
  const handleFetchResult = (railSurvey) => {
    let severityObj = {}
    for (const key in result_template.severity) {
      severityObj[key] = railSurvey.filter((v, i) => v.maintenanceRate.severity === key).length
    }
    const result = Object.assign({}, resultCount, {
      severity: severityObj,
      situation: {
        plain_rail: railSurvey.filter((v, i) => v.railDamageSurvey.situation.includes('plainRail')).length,
        rail_end: railSurvey.filter((v, i) => v.railDamageSurvey.situation.includes('railEnd')).length,
        crossing: railSurvey.filter((v, i) => v.railDamageSurvey.situation.includes('crossing')).length,
        welding_repair: railSurvey.filter((v, i) => v.railDamageSurvey.situation.includes('weldingRepair')).length,
        fish_plate: railSurvey.filter((v, i) => v.railDamageSurvey.situation.includes('fishPlate')).length,
        welding_joint: railSurvey.filter((v, i) => v.railDamageSurvey.situation.includes('weldingJoint')).length,
        turn_out: railSurvey.filter((v, i) => v.railDamageSurvey.situation.includes('turnOut')).length,
        railroad_crossing: railSurvey.filter((v, i) => v.railDamageSurvey.situation.includes('railroadCrossing')).length,
        other: railSurvey.filter((v, i) => v.railDamageSurvey.situation.filter((sit, index) =>
          !['plainRail', 'railEnd', 'crossing', 'weldingRepair', 'fishPlate', 'weldingJoint', 'turnOut', 'railroadCrossing'].includes(sit)).length > 0).length,
      },
      location: {
        rail_head: railSurvey.filter((v, i) => v.railDamageSurvey.location.includes('railHead')).length,
        rail_web: railSurvey.filter((v, i) => v.railDamageSurvey.location.includes('railWeb')).length,
        rail_foot: railSurvey.filter((v, i) => v.railDamageSurvey.location.includes('railFoot')).length,
        full_section: railSurvey.filter((v, i) => v.railDamageSurvey.location.includes('fullSection')).length,
        guade_side: railSurvey.filter((v, i) => v.railDamageSurvey.location.includes('gaugeSide')).length,
        surface_of_rail_head: railSurvey.filter((v, i) => v.railDamageSurvey.location.includes('surfaceRailHead')).length,
      },
      pattern_nature: {
        fracture: railSurvey.filter((v, i) => v.railDamageSurvey.defectPattern.includes('fracture')).length,
        crack: railSurvey.filter((v, i) => v.railDamageSurvey.defectPattern.includes('crack')).length,
        wear: railSurvey.filter((v, i) => v.railDamageSurvey.defectPattern.includes('wear')).length,
        distorted_rail: railSurvey.filter((v, i) => v.railDamageSurvey.defectPattern.includes('distortedRail')).length,
        corrosion: railSurvey.filter((v, i) => v.railDamageSurvey.defectPattern.includes('corrosion')).length,
        surface_defect: railSurvey.filter((v, i) => v.railDamageSurvey.defectPattern.includes('surfaceDefect')).length,
        other: railSurvey.filter((v, i) => v.railDamageSurvey.defectPattern.filter((dp, index) =>
          !['fracture', 'crack', 'wear', 'distortedRail', 'corrosion', 'surfaceDefect'].includes(dp)).length > 0).length,
      },
      failure_area: {
        main: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.includes('main')).length,
        siding: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.includes('siding')).length,
        slope: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.includes('slope')).length,
        curve: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.includes('curve')).length,
        station: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.includes('station')).length,
        tunnel: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.includes('tunnel')).length,
        bridge: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.includes('bridge')).length,
        flood: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.includes('flood')).length,
        other: railSurvey.filter((v, i) => v.generalSurvey.areaCondition.filter((ac, index) =>
          !['main', 'siding', 'slope', 'curve', 'station', 'tunnel', 'bridge', 'flood'].includes(ac)).length > 0).length,
      },
      trackQuality: {
        trackGeometryCondition: {
          perfect: railSurvey.filter((v, i) => v.trackDamageSurvey.trackGeometryCondition.includes('perfect')).length,
          imperfect: railSurvey.filter((v, i) => !v.trackDamageSurvey.trackGeometryCondition.includes('perfect')).length,
        },
        ballastCondition: {
          perfect: railSurvey.filter((v, i) => v.trackDamageSurvey.ballastCondition.includes('perfect')).length,
          imperfect: railSurvey.filter((v, i) => !v.trackDamageSurvey.ballastCondition.includes('perfect')).length,
        },
        sleeperCondition: {
          perfect: railSurvey.filter((v, i) => v.trackDamageSurvey.sleeperCondition.includes('good')).length,
          imperfect: railSurvey.filter((v, i) => !v.trackDamageSurvey.sleeperCondition.includes('good')).length,
        },
        trackFoundationCondition: {
          perfect: railSurvey.filter((v, i) => v.trackDamageSurvey.trackFoundationCondition === 'perfect').length,
          imperfect: railSurvey.filter((v, i) => v.trackDamageSurvey.trackFoundationCondition !== 'perfect').length,
        }
      },
      maintenanceRecord: {
        true: railSurvey.filter((v, i) => v.maintenanceRate.maintenanceRecord.hasMaintenanceRecord).length,
        false: railSurvey.filter((v, i) => !v.maintenanceRate.maintenanceRecord.hasMaintenanceRecord).length
      }
    })
    if (analys === 'count') {
      setFormatter(null)
      return result
    } else {
      setFormatter(`{value} %`)
      let clone_result = JSON.parse(JSON.stringify(result))
      for (const key in result) {
        // result_percent[key] = {}
        if (key !== 'trackQuality') {
          // const sit_count = Object.values(clone_result.situation).reduce((prev, curr) => prev + curr)
          // console.log(sit_count);
          const key_count = Object.values(result[key]).reduce((prev, curr) => prev + curr)
          for (const key2 in result[key]) {
            clone_result[key][key2] = ((parseInt(result[key][key2]) / key_count) * 100).toFixed(2)
            if (key === 'maintenanceRecord') {
              clone_result[key][key2] = `${clone_result[key][key2]} %`
            }
          }
        } else {
          for (const key2 in result[key]) {
            if (key2 === '') { }
            const key_count = Object.values(result[key][key2]).reduce((prev, curr) => prev + curr)
            for (const key3 in result[key][key2]) {
              clone_result[key][key2][key3] = ((parseInt(result[key][key2][key3]) / key_count) * 100).toFixed(2)
              if (key === 'trackQuality') {
                clone_result[key][key2][key3] = `${((parseInt(result[key][key2][key3]) / key_count) * 100).toFixed(2)} %`
              }
            }
          }
        }
      }
      return clone_result
    }
    // return result
    // setTotal(railSurvey.length)
    // setResultCount(result)
    // const length = railSurvey.length
    // const result_percent = {}
    // for (const key in result) {
    //   result_percent[key] = {}
    //   if (key !== 'trackQuality') {
    //     for (const key2 in result[key]) {
    //       result_percent[key][key2] = (parseInt(result[key][key2]) / length) * 100
    //     }
    //   } else {
    //     for (const key2 in result[key]) {
    //       result_percent[key][key2] = {}
    //       for (const key3 in result[key][key2]) {
    //         result_percent[key][key2][key3] = (parseInt(result[key][key2][key3]) / length) * 100
    //       }
    //     }
    //   }
    // }
    // setResultPercent(result_percent)
    // analys === 'count' ? setResult(result) : setResult(result_percent)
  }
  const handleShowResult = (e) => {
    const { value } = e.target
    setAnalys(value)
  }
  const handleCheckType = (e) => {
    // console.log(e.target.value, index);
    const { value } = e.target
    const hasValue = filter.includes(value)
    if (hasValue) {
      setFilter(filter.filter(v => v !== value))
    } else {
      setFilter([...filter, value])
    }
  }
  const handleQueryString = (e) => {
    let { name, value } = e.target
    // console.log(name, value);
    if (name === 'area') {
      setQueryFilter({
        ...queryFilter,
        area: {
          ...queryFilter.area,
          ...JSON.parse(value)
        },
        zone: {
          ...queryFilter.zone,
          key: null,
          value: null
        },
        station: {
          ...queryFilter.station,
          from: {
            ...queryFilter.station.from,
            key: null,
            value: null
          },
          to: {
            ...queryFilter.station.to,
            key: null,
            value: null
          },
        }
      })
    } else if (name === 'zone') {
      setQueryFilter({
        ...queryFilter,
        zone: {
          ...queryFilter.zone,
          ...JSON.parse(value)
        },
        station: {
          ...queryFilter.station,
          from: {
            ...queryFilter.station.from,
            key: null,
            value: null
          },
          to: {
            ...queryFilter.station.to,
            key: null,
            value: null
          },
        }
      })
    } else if (['date-start', 'date-end', 'station-from', 'station-to'].includes(name)) {
      const key = name.split('-')[0]
      const key2 = name.split('-')[1]
      if (key === 'station') {
        value = JSON.parse(value)
      }
      setQueryFilter({
        ...queryFilter,
        [key]: {
          ...queryFilter[key],
          [key2]: value
        }
      })
    } else if (name === 'severity') {
      setQueryFilter({
        ...queryFilter,
        severity: queryFilter.severity.includes(value) ? queryFilter.severity.filter(s => s !== value) : [...queryFilter.severity, value]
      })
    }
  }
  const filterData = useMemo(() => {
    let rtnData = result_template
    let raw = rawData
    try {
      for (const key in queryFilter) {
        if (['area', 'zone'].includes(key)) {
          if (queryFilter[key]['value']) {
            raw = rawData.filter(rData => rData.generalSurvey[key] === queryFilter[key]['value'])
          }
        } else {
          if (key === 'station') {
            let arr = raw
            // const st = queryFilter.area.value && queryFilter.zone.value && station.areas.filter(area => area.value === queryFilter.area.value)[0].zones.filter(zone => zone.value === queryFilter.zone.value)[0].stations.map(s => s.value)
            const st = station.station_all.map(s => s.value)
            for (const skey in queryFilter[key]) {
              if (skey === 'from') {
                if (queryFilter[key][skey]['value']) {
                  st.splice(0, st.indexOf(queryFilter[key][skey]['value']))
                  // console.log(st);
                  arr = []
                  raw.forEach(rData => {
                    st.includes(rData.generalSurvey[key]) && arr.push(rData)
                  })
                  raw = arr
                }
              } else if (skey === 'to') {
                if (queryFilter[key][skey]['value']) {
                  const bef = st.splice(0, st.indexOf(queryFilter[key][skey]['value']) + 1)
                  arr = []
                  raw.forEach(rData => {
                    bef.includes(rData.generalSurvey[key]) && arr.push(rData)
                  })
                  raw = arr
                }
              }
            }
          } else if (key === 'severity') {
            let arr = raw
            if (queryFilter[key].length) {
              arr = []
              raw.forEach(rData => {
                queryFilter[key].includes(rData.maintenanceRate[key]) && arr.push(rData)
              })
              raw = arr
              // console.log(raw.map(v => v.maintenanceRate.severity));
            }
          }
        }
      }
      // console.log(raw.map(r => r.generalSurvey.station));
      rtnData = {
        ...handleFetchResult(raw),
        survey: {
          // date_start: queryFilter.date.start === null ? 'ทั้งหมด' : moment(queryFilter.date.start).format('DD-MM-YYYY').split('-').map((d, index) => index === 1 ? mounth[d - 1] : index === 2 ? parseInt(d) + 543 : d).join(' '),
          date_start: !queryFilter.date.start ? 'ทั้งหมด' : moment(queryFilter.date.start).format('DD-MM-YYYY').split('-').map((d, index) => index === 1 ? mounth[d - 1] : index === 2 ? parseInt(d) + 543 : d).join(' '),
          date_end: !queryFilter.date.end ? 'ทั้งหมด' : moment(queryFilter.date.end).format('DD-MM-YYYY').split('-').map((d, index) => index === 1 ? mounth[d - 1] : index === 2 ? parseInt(d) + 543 : d).join(' '),
          area: queryFilter.area.key || 'ทั้งหมด',
          zone: queryFilter.zone.key || 'ทั้งหมด',
          station_from: queryFilter.station.from.key || 'ทั้งหมด',
          station_to: queryFilter.station.to.key || 'ทั้งหมด',
          total: raw.length
        },
        created_name: Cookies.get('isAuthenticated') || '',
        created_date: moment().format('DD-MM-YYYY').split('-').map((d, index) => index === 1 ? mounth[d - 1] : index === 2 ? parseInt(d) + 543 : d).join(' ') || '',
      }
      setTotal(raw.length)
    } catch (error) {
    }
    // console.log(rawData);
    return rtnData
  }, [flag, analys, queryFilter])
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));

  async function getProps() {
    await delay(1_000);
    return ({
      data: filterData
    })
  }
  const handleDownloadReportPDF = async () => {
    setWaitDownload(true)
    try {
      // const props = await getProps();
      const doc = <Report data={filterData} />;
      const asPdf = pdf(doc); // {} is important, throws without an argument
      // asPdf.updateContainer()
      const blob = await asPdf.toBlob();
      saveAs(blob, `${new moment().format('DD-MM-YYYY')}-FailureReport.pdf`);
    } catch (error) {
    }
    setWaitDownload(false)
  }
  const handlePrint = (event) => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true
    })
    const report = document.getElementById('print')
    const temp_style = report.style
    report.style.paddingTop = '30px'
    report.style.padding = '40px'
    report.style.display = 'block'
    html2canvas(report, {
      scale: 2,
      windowWidth: '1270px',
      // windowHeight: '100px'
    }).then((canvas) => {
      // canvas.style.display = 'block'
      report.style = temp_style
      const imgData = canvas.toDataURL('image/png')
      const ratio = doc.internal.pageSize.getWidth() / canvas.width
      const width = canvas.width * ratio
      const height = canvas.height * ratio
      // console.log(imgData);
      doc.addImage(imgData, 'JPEG', 0, 0, width, height, undefined, 'FAST')
      window.open(doc.output('bloburl'))
    })
  }
  const handleWindownPrint = () => {
    window.print()
  }
  return (
    <div>
      {/* {JSON.stringify(filter)} */}
      {/* {JSON.stringify(queryFilter)} */}
      {/* {JSON.stringify(filterData)} */}
      <div id='print' className="flex flex-col xl:flex-row gap-2">
        <div className={`flex flex-col gap-2 grow`}>
          <div className='flex gap-2 items-center flex-wrap'>
            <div className='grow'>
              <label className="block mb-1 text-sm font-semibold">วันที่สำรวจ</label>
              <input onChange={handleQueryString} type="date" min="2023-01-01" max={currentDate} id="date-start" name='date-start' className="tw-input" placeholder='ทั้งหมด' />
              {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
            </div>
            <div>
              <label className="block mt-5 text-sm font-medium">ถึง</label>
            </div>
            <div className='grow'>
              <label className="block mb-6 text-sm font-medium text-red-700 dark:text-red-500"></label>
              <input onChange={handleQueryString} type="date" value={queryFilter.date.end} min="2023-01-01" max={currentDate} id="date-end" name='date-end' className="tw-input" />
              {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
            </div>
            <div className='grow'>
              <label className="block mb-1 text-sm font-semibold">เขตการเดินรถ</label>
              <select onChange={handleQueryString} id="area" name='area' className="tw-input">
                <option value={JSON.stringify({ key: null, value: null })}>กรุณาเลือกเขตการเดินรถ</option>
                {
                  station.areas.map((ar, index) => (
                    <option key={index} value={JSON.stringify({ key: ar.key, value: ar.value })}>{ar.key}</option>
                  ))
                }
              </select>
              {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
            </div>
          </div>
          <div className='flex flex-wrap gap-2 items-center'>
            <div className='grow'>
              <label className="block mb-1 text-sm font-semibold">แขวง</label>
              <select onChange={handleQueryString} id="zone" name='zone' className="tw-input">
                <option value={JSON.stringify({ key: null, value: null })}>กรุณาเลือกแขวง</option>
                {
                  queryFilter.area.value && station.areas.filter(area => area.value === queryFilter.area.value)[0].zones.map((zone, index) => (
                    <option key={index} value={JSON.stringify({ key: zone.key, value: zone.value })}>{zone.key}</option>
                  ))
                }
              </select>
              {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
            </div>
            <div className='grow'>
              <label className="block mb-1 text-sm font-semibold">สถานี จาก</label>
              <select onChange={handleQueryString} id="station-from" name='station-from' className="tw-input">
                <option value={JSON.stringify({ key: null, value: null })}>กรุณาเลือกสถานี</option>
                {
                  // queryFilter.area.value && queryFilter.zone.value && station.areas.filter(area => area.value === queryFilter.area.value)[0].zones.filter(zone => zone.value === queryFilter.zone.value)[0].stations.map((station, index) => (
                  //   <option key={index} value={JSON.stringify({ key: station.key, value: station.value})}>{station.key}</option>
                  // ))
                  station.station_all.map((station, index) => (
                    <option key={index} value={JSON.stringify({ key: station.key, value: station.value })}>{station.key}</option>
                  ))
                }
              </select>
              {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
            </div>
            <div>
              <label className="block mt-5 text-sm font-medium">ถึง</label>
            </div>
            <div className='grow'>
              <label className="block mb-6 text-sm font-semibold text-red-700 dark:text-red-500"></label>
              <select onChange={handleQueryString} id="station-to" name='station-to' className="tw-input">
                <option value={JSON.stringify({ key: null, value: null })}>กรุณาเลือกสถานี</option>
                {
                  // queryFilter.area.value && queryFilter.zone.value && station.areas.filter(area => area.value === queryFilter.area.value)[0].zones.filter(zone => zone.value === queryFilter.zone.value)[0].stations.map((station, index) => (
                  //   <option key={index} value={JSON.stringify({ key: station.key, value: station.value })}>{station.key}</option>
                  // ))
                  station.station_all.map((station, index) => (
                    <option key={index} value={JSON.stringify({ key: station.key, value: station.value })}>{station.key}</option>
                  ))
                }
              </select>
              {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <div className='grow'>
              <label className="block mb-1 text-sm font-semibold">ระดับความรุนแรง</label>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {
                  Array.from({ length: 5 }, (v, i) =>
                    <li key={i} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input onChange={handleQueryString} name='severity' id={`severity-${i}`} type="checkbox" value={`level${i + 1}`} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                        <label htmlFor={`severity-${i}`} className="w-full py-2.5 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">ระดับ {i + 1}</label>
                      </div>
                    </li>
                  )
                }
              </ul>
              {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-2'>
            <div className='grow'>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex-col dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {
                  types.map((v, i) => i < 3 &&
                    <li key={i} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input onChange={handleCheckType} id={`type-${i}`} type="checkbox" value={Object.values(v)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                        <label htmlFor={`type-${i}`} className="py-2.5 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{Object.keys(v)}</label>
                      </div>
                    </li>)
                }
              </ul>
            </div>
            <div className='grow'>
              <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex-col dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {
                  types.map((v, i) => i > 2 &&
                    <li key={i} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input onChange={handleCheckType} id={`type-${i}`} type="checkbox" value={Object.values(v)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                        <label htmlFor={`type-${i}`} className="py-2.5 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{Object.keys(v)}</label>
                      </div>
                    </li>)
                }
              </ul>
            </div>
          </div>
          <div className='flex flex-wrap gap-x-8 items-center'>
            <div className='flex gap-4'>
              <label className="block text-sm font-medium">กรณีความเสียหายทั้งหมด</label>
              <label className="block text-sm font-medium">{total}</label>
            </div>
            <div className='flex flex-row items-center gap-x-4'>
              <label className="block text-sm font-medium">วิเคราะห์ผล</label>
              <div className="flex items-center dark:border-gray-700">
                <input id="bordered-radio-1" onChange={handleShowResult} checked={analys === 'count'} type="radio" value="count" name="bordered-radio" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300" />
                <label htmlFor="bordered-radio-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">จำนวน</label>
              </div>
              <div className="flex items-center dark:border-gray-700">
                <input id="bordered-radio-2" onChange={handleShowResult} checked={analys === 'percent'} type="radio" value="percent" name="bordered-radio" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300" />
                <label htmlFor="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">เปอร์เซ็นต์</label>
              </div>
            </div>
          </div>
          {
            (!filter.length || filter.some(f => ['pattern', 'location', 'situation'].includes(f))) && (
              <div className='flex flex-wrap gap-0 items-center justify-center'>
                {
                  (!filter.length || filter.includes('situation')) && (
                    <div className='grow border'>
                      <PieDoughnut text={'ความเสียหายของราง'} data={[
                        { value: filterData.situation.plain_rail, name: 'รางปกติ' },
                        { value: filterData.situation.rail_end, name: 'ปลายราง' },
                        { value: filterData.situation.crossing, name: 'จุดตัดราง' },
                        { value: filterData.situation.welding_repair, name: 'รอยเชื่อมซ่อม' },
                        { value: filterData.situation.fish_plate, name: 'ประกับราง' },
                        { value: filterData.situation.welding_joint, name: 'แนวเชื่อมต่อราง' },
                        { value: filterData.situation.turn_out, name: 'ประแจ' },
                        { value: filterData.situation.railroad_crossing, name: 'ทางข้ามราง' },
                        { value: filterData.situation.other, name: 'อื่นๆ' },
                      ]} formatter={formatter} />
                    </div>
                  )
                }
                {
                  (!filter.length || filter.includes('location')) && (
                    <div className='grow border'>
                      <PieDoughnut text={'ตำแหน่งที่เกิดความเสียหายของราง'} data={[
                        { name: 'หัวราง', value: filterData.location.rail_head },
                        { name: 'เอวราง', value: filterData.location.rail_web },
                        { name: 'ฐานราง', value: filterData.location.rail_foot },
                        { name: 'เต็มหน้าตัด', value: filterData.location.full_section },
                        { name: 'สันราง', value: filterData.location.guade_side },
                        { name: 'พื้นผิวบนหัวราง', value: filterData.location.surface_of_rail_head },
                      ]} formatter={formatter} />
                    </div>
                  )
                }
                {
                  (!filter.length || filter.includes('pattern')) && (
                    <div className='grow border'>
                      <PieDoughnut text={'ลักษณะความเสียหายที่เกิดขึ้น'} data={[
                        { name: 'แตกหัก', value: filterData.pattern_nature.fracture },
                        { name: 'แตกร้าว', value: filterData.pattern_nature.crack },
                        { name: 'สึกหรอ', value: filterData.pattern_nature.wear },
                        { name: 'รางคดงอ', value: filterData.pattern_nature.distorted_rail },
                        { name: 'เกิดสนิม/กัดกร่อน', value: filterData.pattern_nature.corrosion },
                        { name: 'เป็นแผล', value: filterData.pattern_nature.surface_defect },
                        { name: 'อื่นๆ', value: filterData.pattern_nature.other },
                      ]} formatter={formatter} />
                    </div>
                  )
                }
              </div>
            )
          }

        </div>
        {
          (!filter.length || filter.some(f => ["trackQuality", "areaCondition", "maintenanceRecord"].includes(f))) && (
            <div className="flex flex-col gap-2 basis-1/3">
              {
                (!filter.length || filter.includes('areaCondition')) && (
                  <div className='border'>
                    {/* <label className="block mb-1 text-md font-semibold text-center">ลักษณะพื้นที่ที่เกิดความเสียหาย</label> */}
                    <BarChart data={[
                      { name: 'อื่นๆ', value: filterData.failure_area.other },
                      { name: 'มีน้ำท่วมขัง', value: filterData.failure_area.flood },
                      { name: 'สะพาน', value: filterData.failure_area.bridge },
                      { name: 'บริเวณอุโมงค์', value: filterData.failure_area.tunnel },
                      { name: 'สถานีรถไฟ', value: filterData.failure_area.station },
                      { name: 'พื้นที่รัศมีโค้ง', value: filterData.failure_area.curve },
                      { name: 'พื้นที่ลาดชัน', value: filterData.failure_area.slope },
                      { name: 'ทางหลีก', value: filterData.failure_area.siding },
                      { name: 'ทางปกติ', value: filterData.failure_area.main }
                    ]} formatter={formatter} />
                  </div>
                )
              }
              <div className='flex flex-wrap gap-2'>
                {
                  (!filter.length || filter.includes('trackQuality')) && (
                    <div className='grow'>
                      <div className="relative overflow-x-auto shadow-md rounded-lg m-2">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="text-md text-gray-900 border bg-[#FFF1C5]">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                ลักษณะคุณภาพทาง
                              </th>
                              <th scope="col" className="px-6 py-3">
                                สมบูรณ์
                              </th>
                              <th scope="col" className="px-6 py-3">
                                ไม่สมบูรณ์
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {qty.title.map((v, i) =>
                              <tr key={i} className="bg-white border hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {Object.keys(v).join()}
                                </th>
                                <td className="px-6 py-4">
                                  {filterData.trackQuality[Object.values(v)].perfect}
                                </td>
                                <td className="px-6 py-4">
                                  {filterData.trackQuality[Object.values(v)].imperfect}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )
                }
                {
                  (!filter.length || filter.includes('maintenanceRecord')) && (
                    <div className='grow'>
                      <div className="relative overflow-x-auto shadow-md rounded-lg m-2">
                        <table className="w-full text-sm text-left text-gray-600 border dark:text-gray-400">
                          <thead className="text-md text-gray-900 border bg-[#FFF1C5]">
                            <tr>
                              <th scope="col" colSpan={4} className="px-6 py-3 text-center">
                                ประวัติการซ่อมบำรุง
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-white border hover:bg-gray-50">
                              <td className="px-6 py-4">
                                เคย
                              </td>
                              <td className="px-6 py-4">
                                {filterData.maintenanceRecord.true}
                              </td>
                              <td className="px-6 py-4">
                                ไม่เคย
                              </td>
                              <td className="px-6 py-4">
                                {filterData.maintenanceRecord.false}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      {/* <div>
        <DashboardResult filter={filter} result={filterData} formatter={formatter} />
      </div> */}
      <div className='flex flex-col items-end'>
        <div className='flex items-center gap-x-2'>
          <div>
            {/* handlePrint */}
            <button onClick={handleWindownPrint} type="button" className="text-white bg-blue-700 hover:bg-blue-800' focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2 text-center inline-flex items-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
              Print
            </button>
          </div>
          <div>
            {/* <PDFDownloadLink
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2 text-center inline-flex items-center mr-2'
              document={<Report data={filterData} />} fileName={`somename-${new moment().format('DD-MM-YYYY-Failure Report')}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : (
                  <div className='flex justify-center items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    Export PDF
                  </div>
                )
              }
            </PDFDownloadLink> */}
            <button onClick={handleDownloadReportPDF} disabled={waitDownload} type="button" className={`text-white  ${waitDownload ? 'bg-blue-400 hover:bg-blue-400' : 'bg-blue-700 hover:bg-blue-800'}  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2 text-center inline-flex items-center mr-2`}>
              {
                !waitDownload ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" role="status" className="w-6 h-6 mr-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                )
              }
              Export PDF
            </button>
            {/* <BlobProvider document={<Report data={filterData} />}>
              {({ blob, url, loading, error }) => {
                console.log(url);
                return <a href={url}>download</a>
              }}
            </BlobProvider> */}
          </div>
        </div>
      </div>
      <div className='bg-slate-100 w-full'>
        {
          // flag && <Report data={filterData} />
        }
      </div>
    </div>
  )
}

export default DashboardPage