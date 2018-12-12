/**
 * app路由管理器
 * 2018-12-11 10:03
 * @author koohead
 * @description app导航管理
 */

import {
  createStackNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation'

/**
 * 在react-navigation 3.x之后，需要手动添加 “createAppContainer”
 */
import { createAppContainer } from '@react-navigation/native'

// 引导页
import { GuideScreen } from '../modules/guide/screens'

// 主页面
import { HomeScreen } from '../modules/home/screens'

// 登录注册相关界面
import { SigninScreen, ProfileScreen } from '../modules/profile/screens'

// 主界面
const mainNavigator = createStackNavigator({
  home: {
    screen: HomeScreen,
    path: '/drawer/main/home'
  }
})

/**
 * 抽屉功能
 */
const drawerNavigator = createDrawerNavigator({
  main: {
    screen: mainNavigator,
    path: '/drawer/main'
  },
  profile: {
    screen: ProfileScreen,
    path: '/drawer/profile'
  }
}, {
  initialRouteName: 'main',
  swipeEnabled: true,
  animationEnabled: true,
  lazy: false,
  tabBarPosition: 'bottom',
  drawerType: 'slide'
})

/**
 * 根界面
 */
const rootNavigator = createStackNavigator({
  drawer: {
    screen: drawerNavigator,
    path: '/drawer',
    navigationOptions: {
      header: null
    }
  },
  signin: {
    screen: SigninScreen,
    path: '/signin'
  }
})

/**
 * 引导页
 */
const guideNavigator = createStackNavigator({
  welcome: {
    screen: GuideScreen,
    path: '/guide',
    navigationOptions: {
      header: null
    }
  }
})

/**
 * 路由配置
 */
const Router = createSwitchNavigator({
  guide: guideNavigator,
  root: rootNavigator
}, {
  initialRouteName: 'guide'
})

export default createAppContainer(Router)
