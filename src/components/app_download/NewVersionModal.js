// /**
//  * 新版本
//  * name: KooHead
//  * date: 2018-03-31 08:19
//  */

// import React, { Component } from 'react'
// import {
//   View,
//   Modal,
//   Image,
//   Text,
//   ScrollView,
//   Toast,
//   Alert,
//   PermissionsAndroid,
//   ToastAndroid
// } from 'react-native'
// import Icon from '../icons'
// import TouchableOpacity from '../normal_touchable_opacity'

// import Dimensions from 'Dimensions'
// import { Progressbar } from './'
// import commonStyles from '../../../config/styles'
// import Platform from 'Platform'
// import { getNetInfo } from '../../../utils'
// const { height, width } = Dimensions.get('window')

// /**
//  *  弹出框组建
//  */

// class NewVersionModal extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       modalVisible: false,
//       versionData: {},
//       showDownloadProgress: false,
//       downloadSuccess: false,
//       downloadFail: false
//     }
//     this.fileName = ''
//   }

//   componentDidMount () {
//     this.addListener()
//   }

//   componentWillUnmount () {
//   }

//   // 下载监听
//   addListener () {
//   }
//   // 下载
//   async dowloadApp () {
//     // 判断用户是否有存储权限权限
//     if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)) {
//       this.dowload()
//     } else {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             'title': '申请空间存储权限',
//             'message': '请开通空间存储权限，否则应用无法正常升级！'
//           }
//         )
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//           this.dowload()
//         } else {
//           ToastAndroid.show('请开通空间存储权限，否则应用无法正常升级！', ToastAndroid.SHORT)
//         }
//       } catch (err) {
//         ToastAndroid.show('请开通空间存储权限，否则应用无法正常升级！', ToastAndroid.SHORT)
//       }
//     }
//   }
//   // 下载
//   async dowload () {
//     let netInfo = await getNetInfo()
//     if (netInfo === 'wifi') {
//       // // 开启监听
//       // this.addListener()
//       UpgradeAndroid.download(this.state.versionData.appAddress)
//       this.setState({
//         showDownloadProgress: true,
//         downloadSuccess: false,
//         downloadFail: false
//       })
//     } else if (netInfo === 'none') {
//       Alert.alert(
//         '网络状态',
//         '当前无网络连接，请检查您的网络状态！',
//         [
//           {text: '是'}
//         ]
//       )
//     } else {
//       Alert.alert(
//         '网络状态',
//         '您当前网络不是wifi，是否继续下载？',
//         [
//           {text: '是',
//             onPress: () => {
//               // 开启监听
//               this.addListener()
//               UpgradeAndroid.download(this.state.versionData.appAddress)
//               this.setState({
//                 showDownloadProgress: true,
//                 downloadSuccess: false,
//                 downloadFail: false
//               })
//             }},
//           {text: '否',
//             onPress: () => {
//             },
//             style: 'cancel'}
//         ]
//       )
//     }
//   }
//   // 获取版本信息
//   getVersionMsg () {
//     let updateMsg = this.state.versionData && this.state.versionData.updateMsg
//     if (updateMsg) {
//       return updateMsg.split('|')
//     }
//     return []
//   }
//   // 显示modal
//   _showModal (versionData) {
//     this.setState({
//       modalVisible: true,
//       versionData
//     })
//   }
//   // 隐藏modal
//   _hideModal () {
//     this.setState({
//       modalVisible: false
//     })
//   }
//   // 升级
//   updateVersion (address) {
//     if (Platform.OS === 'android') {
//       this.dowloadApp()
//       // Linking.canOpenURL(address || '').then(supported => { // weixin://  alipay://
//       //   if (supported) {
//       //     Linking.openURL(address || '')
//       //   }
//       // })
//     }
//   }

//   _renderButtonView () {
//     let { onPress } = this.props
//     if (this.state.showDownloadProgress) {
//       return <Progressbar ref={(pb) => { this.progressBar = pb }} />
//     } else if (this.state.downloadSuccess) {
//       return (<TouchableOpacity
//         style={styles.btnView}
//         onPress={() => {
//           UpgradeAndroid.installApk(this.fileName)
//         }}
//       >
//         <Text style={styles.updateText}>点击安装</Text>
//       </TouchableOpacity>)
//     } else if (this.state.downloadFail) {
//       return (<TouchableOpacity
//         style={styles.btnView}
//         onPress={() => {
//           this.dowloadApp()
//         }}
//       >
//         <Text style={styles.updateText}>下载失败，重试</Text>
//       </TouchableOpacity>)
//     } else {
//       return (
//         <TouchableOpacity
//           style={styles.btnView}
//           onPress={() => {
//             if (this.state.versionData.updateState === 0) {
//               this.updateVersion(this.state.versionData.address)
//               onPress(false)
//             } else {
//               onPress(false)
//               this.updateVersion(this.state.versionData.address)
//             }
//           }}
//         >
//           <Text style={styles.updateText}>升级</Text>
//         </TouchableOpacity>
//       )
//     }
//   }

//   _renderContent () {
//     const { onClose } = this.props
//     return (
//       <View style={styles.contentView}>
//         <View style={styles.updateView}>
//           <View style={styles.updateMsgView}>
//             <Text style={styles.titleText}>
//               {`是否升级到${this.state.versionData.version}版本？`}
//             </Text>
//             <View style={styles.msgContentView}>
//               <ScrollView bounces={false} >
//                 { this.getVersionMsg().map((item, i) => (
//                   <Text key={i} style={styles.commonText}>{item}</Text>
//                 )) }
//                 <View style={{marginBottom: 5}} />
//               </ScrollView>
//             </View>
//             {
//               this._renderButtonView()
//             }
//           </View>
//           <Image style={styles.image} source={require('../../../assets/icons/update2.png')} />
//         </View>
//         {
//           this.state.versionData.updateState === 0 && <TouchableOpacity style={styles.closeView} onPress={() => {
//             onClose(true)
//             this.setState({
//               modalVisible: false
//             })
//           }}>
//             <Icon size={30} color={'white'} name='ios-close-circle-outline' type='ionicon' />
//           </TouchableOpacity>
//         }
//       </View>
//     )
//   }
//   render () {
//     return (
//       <Modal
//         animationType={'fade'}
//         transparent
//         visible={this.state.modalVisible}
//         onRequestClose={() => {}}
//       >
//         <View style={styles.backView} />
//         <View style={styles.container}>
//           {this._renderContent()}
//         </View>
//       </Modal>
//     )
//   }
// }

// NewVersionModal.defaultProps = {
//   uri: '',
//   onPress: () => {}
// }

// const styles = {
//   container: {
//     position: 'absolute',
//     height,
//     width,
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   backView: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     opacity: 0.7,
//     backgroundColor: 'black'
//   },
//   contentView: {
//     backgroundColor: 'transparent',
//     alignItems: 'center'
//   },
//   image: {
//     height: width * 0.35,
//     width: width * 0.7,
//     resizeMode: 'stretch',
//     borderRadius: 10
//   },
//   closeView: {
//     height: 30,
//     width: 30,
//     backgroundColor: 'transparent',
//     marginTop: 30
//   },
//   updateView: {
//     height: width * 0.9,
//     width: width * 0.7,
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10
//   },
//   updateMsgView: {
//     height: width * 0.8,
//     position: 'absolute',
//     width: width * 0.7,
//     top: width * 0.1,
//     backgroundColor: 'white',
//     padding: 10,
//     borderBottomLeftRadius: 5,
//     borderBottomRightRadius: 5
//   },
//   titleText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: width * 0.25
//   },
//   commonText: {
//     fontSize: 14,
//     color: commonStyles.textDarkColor.color,
//     marginTop: 5
//   },
//   msgContentView: {
//     flex: 1
//   },
//   btnView: {
//     height: 35,
//     backgroundColor: '#fd7635',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 5
//   },
//   updateText: {
//     fontSize: 16,
//     color: 'white'
//   }
// }

// export default NewVersionModal