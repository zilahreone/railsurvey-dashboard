import React, { useEffect, useMemo, useState } from 'react'
import api from '../utils/api'
import DashboardResult from '../components/DashboardResult'
import station from '@/assets/station.json'

function DashboardPage() {
  const types = [
    {'ความเสียหายของราง (Situation)': 'situation'},
    {'ตำแหน่งที่เกิดความเสียหายของราง (Location)': 'location'},
    {'ลักษณะความเสียหายที่เกิดขึ้น (Pattern, nature)': 'pattern'},
    {'ลักษณะพื้นที่ที่เกิดความเสียหาย': 'areaCondition'},
    {'คุณภาพทาง': 'trackQuality'},
    {'ประวัติการซ่อมบำรุง': 'maintenanceRecord'}
  ]
  const result_template = {
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
    }
  }
  const [analys, setAnalys] = useState('count')
  const [total, setTotal] = useState(0)
  const [formatter, setFormatter] = useState(null)
  const [result, setResult] = useState(result_template)
  const [resultPercent, setResultPercent] = useState(result_template)
  const [resultCount, setResultCount] = useState(result_template)
  const [filter, setFilter] = useState([])
  const [queryFilter, setQueryFilter] = useState({
    date: {
      start: null,
      end: null
    },
    area: null,
    zone: null,
    station: {
      from: null,
      to: null
    },
    severity: []
  })
  useEffect(() => {
    // api.get('/rail-survey?offset=0&datefrom=2020-01-01&dateto=2020-01-10&area=qwe&zone=asd&station=tyut&from=wer&to=pdf&severity=level2', null).then((resp) => {
    api.get('/rail-survey?offset=0&maintenanceRateSeverity=level2', null).then((resp) => {
      resp.json().then((json) => {
        // console.log(json.map(v => v.maintenanceRate.severity));
        setTotal(json.length)
        handleFilterResult(json)
      })
    })
  }, [])
  const handleFilterResult = (railSurvey) => {
    const result = Object.assign({}, resultCount, {
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
    setResultCount(result)
    const length = railSurvey.length
    const result_percent = {}
    for (const key in result) {
      result_percent[key] = {}
      if (key !== 'trackQuality') {
        for (const key2 in result[key]) {
          result_percent[key][key2] = (parseInt(result[key][key2]) / length) * 100
        }
      } else {
        for (const key2 in result[key]) {
          result_percent[key][key2] = {}
          for (const key3 in result[key][key2]) {
            result_percent[key][key2][key3] = (parseInt(result[key][key2][key3]) / length) * 100
          }
        }
      }
    }
    setResultPercent(result_percent)
    analys === 'count' ? setResult(result) : setResult(result_percent)
  }
  const handleFetchResult = (e) => {
    const { value } = e.target
    setAnalys(value)
    if (value === 'percent') {
      // console.log(resultPercent)
      setFormatter(`{value} %`)
      setResult(resultPercent)
    } else {
      setFormatter(null)
      // console.log(resultCount)
      setResult(resultCount)
    }
  }
  const handleCheckType = (e) => {
    // console.log(e.target.value, index);
    const {value} = e.target
    const hasValue = filter.includes(value)
    if (hasValue) {
      setFilter(filter.filter(v => v !== value))
    } else {
      setFilter([ ...filter, value ])
    }
  }
  const handleQueryString = (e) => {
    let val = null
    let { name, value } = e.target
    // const kv = name.split('\.')
    if (['date-start', 'date-end'].includes(name)) {
      const kv = name.split('-')
      name = kv[0]
      val = Object.assign({}, queryFilter[name], { [kv[1]]: value })
    } else if (['area', 'zone'].includes(name)) {
      val = value
    } else if (['station-from', 'station-to'].includes(name)) {
      const kv = name.split('-')
      name = kv[0]
      val = Object.assign({}, queryFilter[name], { [kv[1]]: value })
      // console.log(val);
    } else if (name === 'severity') {
      val = queryFilter.severity.includes(value) ? queryFilter.severity.filter(s => s !== value) : [...queryFilter.severity, value]
      // setQuery = sv.map(s => {return {[kv[1]]: s}})
      // setSeveritys(sv)
    }
    setQueryFilter({
      ...queryFilter,
      [name]: val
    })
    // setQueryString({
      //   ...queryString,
      //   [kv[0]]: {
        //     ...queryString[kv[0]],
        //     [kv[1]]: setQuery
        //   }
        // })
  }
  const filterQueyStringBy = useMemo(() => {
    console.log(result);
    return result
  }, [queryFilter])
  return (
    <div>
      {/* {JSON.stringify(filterQueyStringBy)} */}
      <div className='flex flex-col gap-2'>
        <div className='flex flex-wrap gap-2 items-center'>
          <div className='grow'>
            <label className="block mb-1 text-sm font-semibold">วันที่สำรวจ</label>
            <input onChange={handleQueryString} data-date-format="DD MMMM YYYY" type="date" id="date-start" name='date-start' className="tw-input" />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">ถึง</label>
          </div>
          <div className='grow'>
            <label className="block mb-6 text-sm font-medium text-red-700 dark:text-red-500"></label>
            <input onChange={handleQueryString} type="date" max={`${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`} id="date-end" name='date-end' className="tw-input" />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
          </div>
          <div className='grow'>
            <label className="block mb-1 text-sm font-semibold">เขตการเดินรถ</label>
            <select onChange={handleQueryString} defaultValue={"placeholder"} id="area" name='area' className="tw-input">
              <option disabled value={"placeholder"}>กรุณาเลือกเขตการเดินรถ</option>
              {
                station.areas.map((ar, index) => (
                  <option key={index} value={ar.value}>{ar.key}</option>
                ))
              }
            </select>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
          </div>
          <div className='grow'>
            <label className="block mb-1 text-sm font-semibold">แขวง</label>
            <select onChange={handleQueryString} defaultValue={"placeholder"} id="zone"  name='zone' className="tw-input">
              <option disabled value={"placeholder"}>กรุณาเลือกแขวง</option>
              {
                queryFilter.area && station.areas.filter(area => area.value === queryFilter.area)[0].zones.map((zone, index) => (
                  <option key={index} value={zone.value}>{zone.key}</option>
                ))
              }
            </select>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 items-center'>
          <div className='grow'>
            <label className="block mb-1 text-sm font-semibold">สถานี จาก</label>
            <select onChange={handleQueryString} defaultValue={"placeholder"} id="station-from" name='station-from' className="tw-input">
              <option disabled value={"placeholder"}>กรุณาเลือกสถานี</option>
              {
                queryFilter.area && queryFilter.zone && station.areas.filter(area => area.value === queryFilter.area)[0].zones.filter(zone => zone.value === queryFilter.zone)[0].stations.map((station, index) => (
                  <option key={index} value={station.value}>{station.key}</option>
                ))
              }
            </select>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">ถึง</label>
          </div>
          <div className='grow'>
            <label className="block mb-6 text-sm font-semibold text-red-700 dark:text-red-500"></label>
            <select onChange={handleQueryString} defaultValue={"placeholder"} id="station-to" name='station-to' className="tw-input">
              <option disabled value={"placeholder"}>กรุณาเลือกสถานี</option>
              {
                queryFilter.area && queryFilter.zone && station.areas.filter(area => area.value === queryFilter.area)[0].zones.filter(zone => zone.value === queryFilter.zone)[0].stations.map((station, index) => (
                  <option key={index} value={station.value}>{station.key}</option>
                ))
              }
            </select>
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
          </div>
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
            <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p>
          </div>
        </div>
        <div className='flex flex-wrap gap-2 items-center'>
          <div className='flex-1'>
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
          <div className='flex-1'>
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
        <div className='flex flex-wrap gap-8 items-center'>
          <div className='flex gap-4'>
            <label className="block text-sm font-medium">กรณีความเสียหายทั้งหมด</label>
            <label className="block text-sm font-medium">{total}</label>
            <label className="block text-sm font-medium">วิเคราะห์ผล</label>
          </div>
          <div className='flex'>
            <div className="flex items-center pl-4 dark:border-gray-700">
              <input id="bordered-radio-1" onChange={handleFetchResult} checked={analys === 'count'} type="radio" value="count" name="bordered-radio" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300" />
              <label htmlFor="bordered-radio-1" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">จำนวน</label>
            </div>
            <div className="flex items-center pl-4 dark:border-gray-700">
              <input id="bordered-radio-2" onChange={handleFetchResult} checked={analys === 'percent'} type="radio" value="percent" name="bordered-radio" className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300" />
              <label htmlFor="bordered-radio-2" className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">เปอร์เซ็นต์</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DashboardResult filter={filter} result={result} formatter={formatter} />
      </div>
    </div>
  )
}

export default DashboardPage