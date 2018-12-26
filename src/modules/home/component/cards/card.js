/**
 * 卡片组件
 * 2018-12-14 14:13
 * @author koohead
 * @description home底部按钮界面
 */

import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  Image
} from 'react-native'
import {
  TouchableOpacity
} from '../../../../components'
import { withNavigation } from 'react-navigation'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width * 0.94

/**
 * @class
 * @classdesc 滑动卡片
 */
class Card extends Component {
  _renderContent () {
    const { type } = this.props
    if (type === 1) {
      return this._renderTextInput()
    } else {
      return this._renderImage()
    }
  }
  _renderImage () {
    const { img } = this.props
    return (
      <View style={{ width: '100%', height: '80%' }}>
        <Image source={{ uri: img }} style={{ width: '100%', height: '80%', borderTopLeftRadius: 10, borderTopRightRadius: 10, overlayColor: 'white' }} />
      </View>
    )
  }
  _renderTextInput () {
    const { text } = this.props
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 20, color: 'white' }}>{text}</Text>
      </View>
    )
  }

  render () {
    const { cardHeight, stackOffsetY, stackDepth, navigation } = this.props
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('card_detail')
        }}>
        <View style={[styles.card, { backgroundColor: this.props.backgroundColor, height: cardHeight - stackOffsetY * stackDepth + stackOffsetY }]}>
          {
            this._renderContent()
          }
        </View>
      </TouchableOpacity>
    )
  }
}

Card.defaultProps = {
  cardHeight: 0,
  stackOffsetY: 15,
  stackDepth: 3
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 10
  }
})

export default withNavigation(Card)
