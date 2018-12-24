/**
 * 开屏广告
 * 2018-12-21 14:14
 * @author koohead
 * @description 开屏广告
 */

import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  BackHandler
} from 'react-native'
import { SplashScreen, TouchableOpacity } from '../../../components'
import { OPEN_SCREEN_AD_SCREEN, LAST_INACTIVE_TIME } from '../../../data'
import { storage } from '../../../utils'
import { OPEN_SCREEN_REAMINI_TIME } from '../../../config/config'

const IS_ANDROID = Platform.OS === 'android'

const DATA = {
  title: '开屏广告',
  content: '开屏广告内容',
  url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545645009567&di=0ca0c1a2901e968a74a286e8ae980bda&imgtype=0&src=http%3A%2F%2Fwww.desktx.com%2Fd%2Ffile%2Fphone%2Fmeinv%2F20180420%2F782b5f69008fb9d3a3946451121379bc.jpg'
}

/**
 * @class
 * @classdesc 开屏广告
 */
class OpenScreenAdScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      remainingTime: OPEN_SCREEN_REAMINI_TIME
    }
    this.onBackButtonPressAndroid = this._onBackButtonPressAndroid.bind(this)
  }

  async componentDidMount () {
    const data = await storage.getItem(OPEN_SCREEN_AD_SCREEN)
    if (data) {
      this.setState({
        data
      })
      SplashScreen.hide()
      // 开启计时器
      this.openRemainingTimer()
    } else {
      this.props.navigation.navigate('main')
    }
    // 存储广告信息
    storage.setItem(OPEN_SCREEN_AD_SCREEN, DATA)

    // 返回按钮事件监听
    if (IS_ANDROID) {
      BackHandler.addEventListener('onAdBackPress', this.onBackButtonPressAndroid)
    }
  }

  componentWillUnmount () {
    this.interval && clearInterval(this.interval)
    if (IS_ANDROID) {
      BackHandler.removeEventListener('onAdBackPress',
        this.onBackButtonPressAndroid)
    }
  }

  /**
   * android 返回按钮监听事件
   */
  async _onBackButtonPressAndroid () {
    await storage.removeItem(LAST_INACTIVE_TIME)
    this.props.navigation.navigate('main')
  }

  /**
   * 开启计时器
   */
  openRemainingTimer () {
    this.interval = setInterval(async () => {
      if (this.state.remainingTime > 0) {
        this.setState({
          remainingTime: this.state.remainingTime - 1
        })
      } else {
        await storage.removeItem(LAST_INACTIVE_TIME)
        this.props.navigation.navigate('main')
      }
    }, 1000)
  }

  /**
   * 倒计时按钮界面
   */
  _renderTimeView () {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <TouchableOpacity
          onPress={async () => {
            await storage.removeItem(LAST_INACTIVE_TIME)
            this.props.navigation.navigate('main')
          }}
          style={styles.jumpView}>
          <Text style={styles.btnText}>{`跳过广告 ${this.state.remainingTime}s`}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * 内容界面
   */
  _renderPContent () {
    return (
      <TouchableOpacity
        onPress={async () => {
          this.interval && clearInterval(this.interval)
          await storage.removeItem(LAST_INACTIVE_TIME)
          this.props.navigation.navigate('open_screen_detail')
        }}
        style={{ flex: 1 }} />
    )
  }

  /**
   * 渲染内容
   */
  _renderContent () {
    return (
      <View style={styles.contentView}>
        <Image source={{ uri: this.state.data.url }} style={styles.image} />
        <View style={styles.contentPView}>
          <SafeAreaView style={{ flex: 1 }}>
            {
              this._renderTimeView()
            }
            {
              this._renderPContent()
            }
          </SafeAreaView>
        </View>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        { this.state.data ? this._renderContent() : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch'
  },
  contentView: {
    flex: 1
  },
  jumpView: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: 'black',
    opacity: 0.6,
    borderRadius: 10,
    marginTop: Platform.OS === 'android' ? 30 : 10
  },
  contentPView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0
  },
  btnText: {
    fontSize: 16,
    color: 'white'
  }
})

export default OpenScreenAdScreen