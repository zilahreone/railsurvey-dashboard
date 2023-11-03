import React from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer'
import srtImg from '@images/bg/srt-logo.png'
import rmtImg from '@images/bg/rmt-logo.png'
import nstdaImg from '@images/footer/logo-nstda.png'
import mtecImg from '@images/footer/logo-mtec.png'
import nectecImg from '@images/footer/logo-nectec.png'
import font from '@/assets/fonts/THSarabunNew.ttf'

Font.register({ family: 'THSarabunNew', src: font, fontStyle: 'normal', fontWeight: 'normal' })

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    // backgroundColor: '#E4E4E4',
    paddingTop: '15px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '0',
    fontFamily: 'THSarabunNew',
    fontSize: 14
  },
  border: {
    borderStyle: 'solid',
    borderWidth: '2px',
    height: '780px',
    paddingVertical: '5px',
    paddingHorizontal: '10px'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    // alignItems: 'center',
    paddingBottom: '10px'
  },
  flexRow: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '-1px'
  },
  value: {
    // borderBottom: '1px groove gray',
    borderBottom: '1px solid gray',
    // position: 'absolute',
    // width: '100%',
    // height:'1.1em',
    // marginBottom: '5px'
    // width: 'auto',
    // alignContent: 'center',
    // justifyContent: 'center'
  },
  image: {
    width: '30px',
    objectFit: 'contain',
  },
  image2: {
    width: '45px',
    objectFit: 'contain',
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  title: {
    color: '#C00000',
    fontWeight: 'heavy',
    paddingBottom: '2px',
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  removeBorder: {
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableColWidthZero: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 0,
  },
  highLight: {
    backgroundColor: '#FFF2CC'
  },
  // tableCell: {
  //   alignContent: 'left',
  //   justifyContent: 'flex-start',
  //   textAlign: 'left',
  //   margin: "auto",
  //   marginTop: 5,
  //   fontSize: 10,
  //   fontWeight: '10px',
  // },
  tableCell: {
    width: '100%',
    paddingLeft: '4px',
    paddingRight: '4px',
    margin: "auto",
    marginTop: 5,
    fontSize: 13,
    fontWeight: '10px',
  },
  center: {
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  left: {
    alignContent: 'left',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  right: {
    alignContent: 'right',
    justifyContent: 'flex-end',
    textAlign: 'right',
  }
});

function Report({ data }) {
  return (
    <>
    {/* {JSON.stringify(data)} */}
      {/* <PDFViewer style={styles.viewer}> */}
        {/* Start of the document*/}
        <Document>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View style={styles.flex}>
              <Image style={styles.image} src={srtImg} />
              <Image style={styles.image2} src={rmtImg} />
            </View>
            <View style={styles.border}>


              <View style={{ ...styles.flexCol, gap: '10px' }}>

                <View style={styles.flexCol}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', flexBasis: '50%' }}>
                      <Text>วันที่สำรวจจาก</Text>
                      <View style={{ ...styles.value, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Text>{ data.survey.date_start }</Text>
                      </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', flexBasis: '50%' }}>
                      <Text>ถึง</Text>
                      <View style={{ ...styles.value, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Text>{ data.survey.date_end }</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', flexBasis: '50%' }}>
                      <Text>เขตการเดินรถ</Text>
                      <View style={{ ...styles.value, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Text>{ data.survey.area }</Text>
                      </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', flexBasis: '50%' }}>
                      <Text>แขวง</Text>
                      <View style={{ ...styles.value, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Text>{ data.survey.zone }</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', flexBasis: '50%' }}>
                      <Text>สถานีจาก</Text>
                      <View style={{ ...styles.value, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Text>{ data.survey.station_from }</Text>
                      </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', flexBasis: '50%' }}>
                      <Text>ถึง</Text>
                      <View style={{ ...styles.value, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Text>{ data.survey.station_to }</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ display: 'flex', flexDirection: 'row', flexBasis: '100%' }}>
                      <Text>จำนวนผลการวิเคราะห์ทั้งหมด</Text>
                      <View style={{ ...styles.value, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                        <Text>{ data.survey.total }</Text>
                      </View>
                    </View>
                  </View>

                </View>

                <View style={styles.flexCol}>

                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, styles.highLight, { width: '100%' }]}>
                        <Text style={styles.tableCell}>ความรุนแรงของความเสียหาย</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, { width: '25%' }]}>
                        <Text style={[styles.tableCell, styles.center]}>ระดับความรุนแรง</Text>
                      </View>
                      <View style={[styles.tableCol, { width: '75%' }]}>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, styles.center, { width: '20%' }]}>
                            <Text style={styles.tableCell}>ระดับ 1</Text>
                          </View>
                          <View style={[styles.tableCol, styles.center, { width: '20%' }]}>
                            <Text style={styles.tableCell}>ระดับ 2</Text>
                          </View>
                          <View style={[styles.tableCol, styles.center, { width: '20%' }]}>
                            <Text style={styles.tableCell}>ระดับ 3</Text>
                          </View>
                          <View style={[styles.tableCol, styles.center, { width: '20%' }]}>
                            <Text style={styles.tableCell}>ระดับ 4</Text>
                          </View>
                          <View style={[styles.tableCol, styles.center, { width: '20%', borderRightWidth: 0 }]}>
                            <Text style={styles.tableCell}>ระดับ 5</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, styles.center, { width: '20%', borderBottomWidth: 0 }]}>
                            <Text style={styles.tableCell}>{ data.severity.level1 }</Text>
                          </View>
                          <View style={[styles.tableCol, styles.center, { width: '20%', borderBottomWidth: 0 }]}>
                            <Text style={styles.tableCell}>{ data.severity.level2 }</Text>
                          </View>
                          <View style={[styles.tableCol, styles.center, { width: '20%', borderBottomWidth: 0 }]}>
                            <Text style={styles.tableCell}>{ data.severity.level3 }</Text>
                          </View>
                          <View style={[styles.tableCol, styles.center, { width: '20%', borderBottomWidth: 0 }]}>
                            <Text style={styles.tableCell}>{ data.severity.level4 }</Text>
                          </View>
                          <View style={[styles.tableCol, styles.center, { width: '20%', borderBottomWidth: 0, borderRightWidth: 0 }]}>
                            <Text style={styles.tableCell}>{ data.severity.level5 }</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.flexCol}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, styles.highLight, { width: '100%' }]}>
                        <Text style={styles.tableCell}>ลักษณะพื้นที่ที่เกิดความเสียหาย</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, { width: '100%' }]}>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>ทางปกติ</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.main }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>บริเวณอุโมง</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.tunnel }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>ทางหลีก</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.siding }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>สะพาน</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.bridge }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>พื้นที่ลาดชัน</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.slope }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>มีน้ำท่วมขัง</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.flood }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>พื้นที่รัสมีโค้ง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.curve }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>อื่นๆ</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.other }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>สถานีรถไฟ</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}>{ data.failure_area.siding }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '25%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '25%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                        </View>
                      </View>
                    </View>


                  </View>
                </View>

                <View style={styles.flexCol}>
                  <Text style={styles.title}>การสำรวจความเสียหายของราง</Text>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, styles.center, { width: '34%' }]}>
                        <Text style={styles.tableCell}>ความเสียหายของราง (Situation)</Text>
                      </View>
                      <View style={[styles.tableCol, styles.center, { width: '33%' }]}>
                        <Text style={styles.tableCell}>ตำแหน่งที่เกิดความเสียหายของราง (Location)</Text>
                      </View>
                      <View style={[styles.tableCol, styles.center, styles.highLight, { width: '33%' }]}>
                        <Text style={styles.tableCell}>ลักษณะความเสียหายที่เกิดขึ้น (Pattern, nature)</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCol, { width: '100%' }]}>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>รางปกติ</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.plain_rail }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>หัวราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.location.rail_head }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>แตกหัก</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.pattern_nature.fracture }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>ปลายราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.rail_end }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>เอวราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.location.rail_web }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>แตกร้าว</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.pattern_nature.crack }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>จุดตัดราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.crossing }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>ฐานราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.location.rail_foot }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>สึกหรอ</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.pattern_nature.wear }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>รอยเชื่อมซ่อม</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.welding_repair }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>เต็มหน้าตัด</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.location.full_section }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>รางคดงอ</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.pattern_nature.distorted_rail }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>ประกับราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.fish_plate }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>สันราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.location.guade_side }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>เกิดสนิม/กัดกร่อน</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.pattern_nature.corrosion }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>แนวเชื่อมต่อราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.welding_joint }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>พื้นผิวบนหัวราง</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.location.surface_of_rail_head }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>เกิดแผล/เสียรูป</Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}>{ data.pattern_nature.surface_defect }</Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>ประแจ</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.turn_out }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>ทางข้าม</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.railroad_crossing }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                        </View>
                        <View style={styles.tableRow}>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}>อื่นๆ</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '14%' }]}>
                            <Text style={styles.tableCell}>{ data.situation.other }</Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, width: '13%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, { borderBottomWidth: 0, borderRightWidth: 0, width: '20%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                          <View style={[styles.tableCol, styles.removeBorder, { width: '13%' }]}>
                            <Text style={styles.tableCell}></Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                {/* <View style={[styles.flexRow, { gap: '30px' }]}> */}
                <View style={[styles.flexRow, { gap: '30px' }]} >
                  <View style={styles.flexCol}>
                    <Text style={styles.title}>การสำรวจความเสียหายของทาง</Text>
                    <View style={styles.table}>
                      <View style={[styles.tableRow]}>
                        <View style={[styles.tableCol, styles.highLight, { width: '50%' }]}>
                          <Text style={styles.tableCell}>คุณภาพทาง</Text>
                        </View>
                        <View style={[styles.tableCol, styles.highLight, { width: '25%' }]}>
                          <Text style={styles.tableCell}>สมบูรณ์</Text>
                        </View>
                        <View style={[styles.tableCol, styles.highLight, { width: '25%' }]}>
                          <Text style={styles.tableCell}>ไม่สมบูรณ์</Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={styles.tableCell}>มิติทางเรขาคณิต</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>{ data.trackQuality.trackGeometryCondition.perfect }</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>{ data.trackQuality.trackGeometryCondition.imperfect }</Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={styles.tableCell}>สภาพหินโรยทาง</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>{ data.trackQuality.ballastCondition.perfect }</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>{ data.trackQuality.ballastCondition.imperfect }</Text>
                        </View>
                      </View>
                      {/* <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={styles.tableCell}>วาระการอัดหินโรยทาง</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}></Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={styles.tableCell}>ชนิดของหมอนรองทาง</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>0</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>0</Text>
                        </View>
                      </View> */}
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={styles.tableCell}>สภาพหมอนรองทาง</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>{ data.trackQuality.sleeperCondition.perfect }</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>{ data.trackQuality.sleeperCondition.imperfect }</Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={styles.tableCell}>คันทาง</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>{ data.trackQuality.trackFoundationCondition.perfect }</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '25%' }]}>
                          <Text style={styles.tableCell}>{ data.trackQuality.trackFoundationCondition.imperfect }</Text>
                        </View>
                      </View>
                    </View>

                    <View style={[styles.flex, { marginTop: '5px' }]}>
                      <Image style={[styles.image, { width: '55px' }]} src={nstdaImg} />
                      <Image style={[styles.image, { width: '55px' }]} src={mtecImg} />
                      <Image style={[styles.image, { width: '65px' }]} src={nectecImg} />
                    </View>
                  </View>

                  <View style={styles.flexCol}>
                    <Text style={styles.title}>ประวัติการซ่อมบำรุง</Text>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={styles.tableCell}>เคย</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={[styles.tableCell]}>{ data.maintenanceRecord.true }</Text>
                        </View>
                      </View>
                      <View style={styles.tableRow}>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={styles.tableCell}>ไม่เคย</Text>
                        </View>
                        <View style={[styles.tableCol, { width: '50%' }]}>
                          <Text style={[styles.tableCell]}>{ data.maintenanceRecord.false }</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ border: '1px', height: '120px', marginTop: '20px' }}>
                      <View style={[styles.flexCol, { alignItems: 'center' }]}>
                        <Text style={{ marginBottom: '70px' }}>รายงานผลโดย</Text>
                        <View style={[styles.flexCol, { alignItems: 'center' }]}>
                          <Text>{ data.created_name }</Text>
                          <Text>{ data.created_date }</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

              </View>

            </View>
          </Page>
        </Document>
      {/* </PDFViewer> */}
    </>

  )
}

export default Report