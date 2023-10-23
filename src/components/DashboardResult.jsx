import React, { useEffect, useState } from 'react'
import BarChart from './charts/BarChart'
import PieDoughnut from './charts/PieDoughnut'

function DashboardResult({ filter, result, formatter }) {
  const qty = {
    header: ['ลักษณะคุณภาพทาง', 'สมบูรณ์', 'ไม่สมบูรณ์'],
    title: [{'มิติทางเรขาคณิต': 'trackGeometryCondition'}, {'สภาพหินโรยทาง': 'ballastCondition'}, {'สภาพของหมอนรองทาง': 'sleeperCondition'}, {'คันทาง': 'trackFoundationCondition'}]
  }
  return (
    <>
    {/* { JSON.stringify(result) } */}
    <div className='tw-chart-container'>
      {
        (!filter.length || filter.includes('situation')) && (
          <div className='basis-1/3 grow border'>
            <PieDoughnut data={[
              { value: result.situation.plain_rail, name: 'รางปกติ' },
              { value: result.situation.rail_end, name: 'ปลายราง' },
              { value: result.situation.crossing, name: 'จุดตัดราง' },
              { value: result.situation.welding_repair, name: 'รอยเชื่อมซ่อม' },
              { value: result.situation.fish_plate, name: 'ประกับราง' },
              { value: result.situation.welding_joint, name: 'แนวเชื่อมต่อราง' },
              { value: result.situation.turn_out, name: 'ประแจ' },
              { value: result.situation.railroad_crossing, name: 'ทางข้ามราง' },
              { value: result.situation.other, name: 'อื่นๆ' },
            ]} />
          </div>
        )
      }
      {
        (!filter.length || filter.includes('location')) && (
          <div className='basis-1/3 grow border'>
            <PieDoughnut data={[
              {name: 'หัวราง', value: result.location.rail_head },
              {name: 'เอวราง', value: result.location.rail_web },
              {name: 'ฐานราง', value: result.location.rail_foot },
              {name: 'เต็มหน้าตัด', value: result.location.full_section },
              {name: 'สันราง', value: result.location.guade_side },
              {name: 'พื้นผิวบนหัวราง', value: result.location.surface_of_rail_head },
            ]} />
          </div>
        )
      }
      {
        (!filter.length || filter.includes('pattern')) && (
          <div className='basis-1/3 grow border'>
            <PieDoughnut data={[
              {name: 'แตกหัก', value: result.pattern_nature.fracture },
              {name: 'แตกร้าว', value: result.pattern_nature.crack },
              {name: 'สึกหรอ', value: result.pattern_nature.wear },
              {name: 'รางคดงอ', value: result.pattern_nature.distorted_rail },
              {name: 'เกิดสนิม/กัดกร่อน', value: result.pattern_nature.corrosion },
              {name: 'เป็นแผล', value: result.pattern_nature.surface_defect },
              {name: 'อื่นๆ', value: result.pattern_nature.other },
            ]} />
          </div>
        )
      }
      {
        (!filter.length || filter.includes('areaCondition')) && (
          <div className='basis-1/3 grow border'>
            <label className="block mb-1 text-md font-semibold text-center">ลักษณะพื้นที่ที่เกิดความเสียหาย</label>
            <BarChart data={[
              { name: 'มีน้ำท่วมขัง', value: result.failure_area.flood },
              { name: 'สะพาน', value: result.failure_area.bridge },
              { name: 'บริเวณอุโมงค์', value: result.failure_area.tunnel },
              { name: 'สถานีรถไฟ', value: result.failure_area.station },
              { name: 'พื้นที่รัสมีโค้ง', value: result.failure_area.curve },
              { name: 'พื้นที่ลาดชัน', value: result.failure_area.slope },
            ]} formatter={formatter} />
          </div>
        )
      }
      {
        (!filter.length || filter.includes('trackQuality')) && (
          <div className='basis-1/2 border'>
            <div className="relative overflow-x-auto shadow-md rounded-lg m-2">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-md text-gray-900 bg-gray-50">
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
                    <tr key={i} className="bg-white border-b hover:bg-gray-50">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        { Object.keys(v).join() }
                      </th>
                      <td className="px-6 py-4">
                        { result.trackQuality[Object.values(v)].perfect }
                      </td>
                      <td className="px-6 py-4">
                        { result.trackQuality[Object.values(v)].imperfect }
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
          <div className='basis-1/2 border'>
            <div className="relative overflow-x-auto shadow-md rounded-lg m-2">
              <table className="w-full text-sm text-left text-gray-600 dark:text-gray-400">
                <thead className="text-md text-gray-900 bg-gray-50">
                  <tr>
                    <th scope="col" colSpan={4} className="px-6 py-3 text-center">
                      ประวัติการซ่อมบำรุง
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      เคย
                    </td>
                    <td className="px-6 py-4">
                      { result.maintenanceRecord.true }
                    </td>
                    <td className="px-6 py-4">
                      ไม่เคย
                    </td>
                    <td className="px-6 py-4">
                    { result.maintenanceRecord.false }
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </div>
    </>
  )
}

export default DashboardResult