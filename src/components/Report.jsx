import React from 'react'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer'
import srtImg from '@images/bg/srt-logo.png'
import rmtImg from '@images/bg/rmt-logo.png'
import nstdaImg from '@images/footer/logo-nstda.png'
import mtecImg from '@images/footer/logo-mtec.png'
import nectecImg from '@images/footer/logo-nectec.png'
import font from '@/assets/fonts/THSarabunNew.ttf'

Font.register({ family: 'THSarabunNew', src: font })

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    paddingTop: '15px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingBottom: '0',
    fontFamily: 'THSarabunNew',
    fontSize: '14px'
  },
  border: {
    borderStyle: 'solid',
    borderWidth: '2px',
    height: '780px',
    paddingVertical: '5px',
    paddingHorizontal: '10px'
  },
  font: {
    fontFamily: 'THSarabunNew',
    fontSize: '16px'
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
    fontWeight: 'extrabold',
    paddingBottom: '2px',
  },
  table: {
    display: "flex", 
    width: "auto", 
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
  tableColWidthZero: {
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 0, 
  },
  tableCell: {
    alignContent: 'left',
    justifyContent: 'flex-start',
    textAlign: 'left',
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    fontWeight: '10px',
  }
});

function Report() {
  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}
        <Page size="A4" style={styles.page}>
          <View style={styles.flex}>
            <Image style={styles.image} src={srtImg} />
            <Image style={styles.image2} src={rmtImg} />
          </View>
          <View style={styles.border}>

          <View style={{...styles.flexCol, gap: '15px'}}>


            <View style={styles.flexCol}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{display: 'flex', flexDirection: 'row', flexBasis: '50%'}}>
                  <Text>วันที่สำรวจจาก</Text>
                  <View style={{...styles.value, display:'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Text>Hello สวัสดี</Text>
                  </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', flexBasis: '50%'}}>
                  <Text>ถึง</Text>
                  <View style={{...styles.value, display:'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Text>Hello สวัสดี</Text>
                  </View>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{display: 'flex', flexDirection: 'row', flexBasis: '50%'}}>
                  <Text>เขตการเดินรถ</Text>
                  <View style={{...styles.value, display:'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Text>Hello สวัสดี</Text>
                  </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', flexBasis: '50%'}}>
                  <Text>แขวง</Text>
                  <View style={{...styles.value, display:'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Text>Hello สวัสดี</Text>
                  </View>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{display: 'flex', flexDirection: 'row', flexBasis: '50%'}}>
                  <Text>สถานีจาก</Text>
                  <View style={{...styles.value, display:'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Text>Hello สวัสดี</Text>
                  </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', flexBasis: '50%'}}>
                  <Text>ถึง</Text>
                  <View style={{...styles.value, display:'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Text>Hello สวัสดี</Text>
                  </View>
                </View>
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{display: 'flex', flexDirection: 'row', flexBasis: '100%'}}>
                  <Text>จำนวนผลการวิเคราะห์ทั้งหมด</Text>
                  <View style={{...styles.value, display:'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1}}>
                    <Text>Hello สวัสดี</Text>
                  </View>
                </View>
              </View>


              {/* <View style={styles.flexRow}>
                <Text>จำนวนผลการวิเคราะห์ทั้งหมด</Text>
                <View style={{display: 'flex', justifyContent: 'center'}}>
                  <Text >Hello สวัสดี</Text>
                  <Text >Hello สวัสดี</Text>
                </View>
              </View> */}
            </View>

            <View style={styles.flexCol}>
              {/* <Text style={styles.title}>การสำรวจความเสียหายของราง</Text> */}
              <View style={styles.table}> 
                <View style={styles.tableRow}> 
                  <View style={{...styles.tableCol, width: '100%'}}> 
                    <Text style={{...styles.tableCell}}>ความรุนแรงของความเสียหาย</Text>
                  </View>
                </View>
                <View style={styles.tableRow}> 
                  <View style={{...styles.tableCol, width: '25%'}}> 
                    <Text style={styles.tableCell}>ระดับความรุนแรง</Text> 
                  </View>
                  <View style={{...styles.tableCol, width: '75%'}}>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '20%'}}> 
                        <Text style={styles.tableCell}>ระดับ 1</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '20%'}}> 
                        <Text style={styles.tableCell}>ระดับ 2</Text> 
                      </View>
                      <View style={{...styles.tableCol, width: '20%'}}> 
                        <Text style={styles.tableCell}>ระดับ 3</Text> 
                      </View>
                      <View style={{...styles.tableCol, width: '20%'}}> 
                        <Text style={styles.tableCell}>ระดับ 4</Text> 
                      </View>
                      <View style={{...styles.tableCol, width: '20%', borderRightWidth: 0}}> 
                        <Text style={styles.tableCell}>ระดับ 5</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '20%', borderBottomWidth: 0}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View> 
                      <View style={{...styles.tableCol, width: '20%', borderBottomWidth: 0}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                      <View style={{...styles.tableCol, width: '20%', borderBottomWidth: 0}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                      <View style={{...styles.tableCol, width: '20%', borderBottomWidth: 0}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                      <View style={{...styles.tableCol, width: '20%', borderBottomWidth: 0, borderRightWidth: 0}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.flexCol}>
              {/* <Text style={styles.title}>การสำรวจความเสียหายของราง</Text> */}
              <View style={styles.table}> 
                <View style={styles.tableRow}> 
                  <View style={{...styles.tableCol, width: '100%'}}> 
                    <Text style={{...styles.tableCell}}>ลักษณะพื้นที่ที่เกิดความเสียหาย</Text>
                  </View>
                </View>
                <View style={styles.tableRow}> 
                  <View style={{...styles.tableCol, width: '50%'}}>
                    <View style={{...styles.flexRow}}>
                      <Text>จำนวนผลการวิเคราะห์ทั้งหมด</Text>
                      <Text style={{ flexGrow: 1}}>Hello สวัสดี</Text>
                    </View>
                  </View>
                  <View style={{...styles.tableCol, width: '50%'}}>
                  </View>
                </View> 
              </View>
            </View>

            <View style={styles.flexCol}>
              <Text style={styles.title}>การสำรวจความเสียหายของราง</Text>
              <View style={styles.table}> 
                <View style={styles.tableRow}> 
                  <View style={{...styles.tableCol, width: '34%'}}> 
                    <Text style={styles.tableCell}>ความเสียหายของราง (Situation)</Text>
                  </View> 
                  <View style={{...styles.tableCol, width: '33%'}}> 
                    <Text style={styles.tableCell}>ตำแหน่งที่เกิดความเสียหายของราง (Location)</Text> 
                  </View> 
                  <View style={{...styles.tableCol, width: '33%'}}> 
                    <Text style={styles.tableCell}>ลักษณะความเสียหายที่เกิดขึ้น (Pattern, nature)</Text> 
                  </View>
                </View>
                <View style={styles.tableRow}> 
                  <View style={{...styles.tableCol, width: '34%'}}>

                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>รางปกติ</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>ปลายราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>จุดตัดราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>รอยเชื่อมซ่อม</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>ประกับราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>แนวเชื่อมต่อราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>ประแจ</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>ทางข้ามราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>อื่นๆ</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>



                  </View> 
                  <View style={{...styles.tableCol, width: '33%'}}> 
                      <View style={styles.tableRow}> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>หัวราง</Text>
                        </View> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>0</Text> 
                        </View>
                      </View>
                      <View style={styles.tableRow}> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>เอวราง</Text>
                        </View> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>0</Text> 
                        </View>
                      </View>
                      <View style={styles.tableRow}> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>ฐานราง</Text>
                        </View> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>0</Text> 
                        </View>
                      </View>
                      <View style={styles.tableRow}> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>เต็มหน้าตัด</Text>
                        </View> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>0</Text> 
                        </View>
                      </View>
                      <View style={styles.tableRow}> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>สันราง</Text>
                        </View> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>0</Text> 
                        </View>
                      </View>
                      <View style={styles.tableRow}> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>พื้นผิวบนหัวราง</Text>
                        </View> 
                        <View style={{...styles.tableCol, width: '50%'}}> 
                          <Text style={styles.tableCell}>0</Text> 
                        </View>
                      </View>

                      
                  </View> 
                  <View style={{...styles.tableCol, width: '33%'}}>
                    {/* <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> */}
                    <View style={styles.tableCell}>


                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>รางปกติ</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>ปลายราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>จุดตัดราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>รอยเชื่อมซ่อม</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>ประกับราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>แนวเชื่อมต่อราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>ประแจ</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>ทางข้ามราง</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>
                    <View style={styles.tableRow}> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>อื่นๆ</Text>
                      </View> 
                      <View style={{...styles.tableCol, width: '50%'}}> 
                        <Text style={styles.tableCell}>0</Text> 
                      </View>
                    </View>



                    </View>
                  </View>
                </View> 
              </View>
            </View>

            <View style={{...styles.flexRow, gap: '30px'}}>
              <View style={styles.flexCol}>
                <Text style={styles.title}>การสำรวจความเสียหายของทาง</Text>
                <View style={styles.table}> 
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>คุณภาพทาง</Text>
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}> 
                      <Text style={styles.tableCell}>สมบูรณ์</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}> 
                      <Text style={styles.tableCell}>ไม่สมบูรณ์</Text> 
                    </View>
                  </View>
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>React-PDF</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}> 
                      <Text style={styles.tableCell}>3 User </Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}>
                      <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                    </View>
                  </View> 
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>React-PDF</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}> 
                      <Text style={styles.tableCell}>3 User </Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}>
                      <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                    </View>
                  </View> 
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>React-PDF</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}> 
                      <Text style={styles.tableCell}>3 User </Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}>
                      <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                    </View>
                  </View> 
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>React-PDF</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}> 
                      <Text style={styles.tableCell}>3 User </Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}>
                      <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                    </View>
                  </View> 
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>React-PDF</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}> 
                      <Text style={styles.tableCell}>3 User </Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}>
                      <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                    </View>
                  </View> 
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>React-PDF</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}> 
                      <Text style={styles.tableCell}>3 User </Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '25%'}}>
                      <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text> 
                    </View>
                  </View> 
                </View>
                <View style={{...styles.flex, marginTop: '15px'}}>
                  <Image style={{...styles.image, width: '55px'}} src={nstdaImg} />
                  <Image style={{...styles.image, width: '55px'}} src={mtecImg} />
                  <Image style={{...styles.image, width: '65px'}} src={nectecImg} />
                </View>
              </View>
              <View style={styles.flexCol}>
                <Text style={styles.title}>ประวัติการซ่อมบำรุง</Text>
                <View style={styles.table}> 
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>เคย</Text>
                    </View> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>สมบูรณ์</Text> 
                    </View>
                  </View>
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>ไม่เคย</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width: '50%'}}> 
                      <Text style={styles.tableCell}>3 User </Text> 
                    </View>
                  </View> 
                </View>
                <View style={{border: '1px', height: '100px', marginTop: '20px'}}>
                  <View style={{...styles.flexCol, alignItems: 'center'}}>
                    <Text style={{marginBottom: '50px'}}>รายงานผลโดย</Text>
                    <View style={{...styles.flexCol}}>
                      <Text>รายงานผลโดย</Text>
                      <Text>รายงานผลโดย</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>


          </View>


          </View>
          {/* <View style={styles.section}>
          </View>
          <View style={styles.section}>
            <Text>World</Text>
          </View> */}
        </Page>
      </Document>
    </PDFViewer>

  )
}

export default Report