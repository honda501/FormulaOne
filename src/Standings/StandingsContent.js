/* @flow */
import React from 'react'

import {
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'

import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers,
} from 'react-navigation'

import ScalableText from 'react-native-text'

import DriversScreen from './Drivers'
import TeamsScreen from './Teams'

class CustomTabBar extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      pressed: '',
    }
  }

  render() {
    return (
      <View style={styles.tabContainer}>
        {this.props.navigation.state.routes.map((route, index) => (
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate(route.routeName)}
            onHideUnderlay={()=>{this.setState({pressed: ''})}}
            onShowUnderlay={()=>{this.setState({pressed: route.routeName})}}
            style={[styles.tab, this.state.pressed ===  route.routeName ? styles.tabPress : {}]}
            key={route.routeName}>
            <View style={[styles.tabView, this.props.navigation.state.index === index ? styles.tabViewActive : {}, this.state.pressed ===  route.routeName ? styles.tabViewActive : {}]}>
              <ScalableText style={[styles.tabTxt, this.props.navigation.state.index === index ? styles.tabTxtActive : {}]}>
                {route.routeName.toUpperCase()}
              </ScalableText>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    )
  }
}

const CustomTabView = ({router, navigation, team}) => {
  const { routes, index } = navigation.state
  const ActiveScreen = router.getComponentForState(navigation.state)

  return (
    <View style={styles.container}>
      <CustomTabBar navigation={navigation} />
      <ActiveScreen
        teamInfo={team}
        navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}/>
    </View>
  )
}
CustomTabView.propTypes = {
  router: React.PropTypes.object.isRequired,
  navigation: React.PropTypes.object.isRequired,
  team: React.PropTypes.func.isRequired,
}

const CustomTabRouter = TabRouter(
  {
    Drivers: {
      screen: DriversScreen,
      path: '/drivers',
    },
    Teams: {
      screen: TeamsScreen,
      path: '/teams',
    },
  },
  {
    // Change this to start on a different tab
    initialRouteName: 'Drivers',
  }
)

const StandingsContent = createNavigationContainer(createNavigator(CustomTabRouter)(CustomTabView))

export default StandingsContent

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    backgroundColor: '#202930',
    flexDirection: 'row',
    height: 60,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPress: {
    backgroundColor: '#2a3540',
  },
  tabView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#202930'
  },
  tabViewActive: {
    borderBottomColor: '#f94057',
  },
  tabTxt: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Raleway-Light',
  },
  tabTxtActive: {
    color: '#f94057',
  },
  header: {
    paddingHorizontal: 10,
    height: 24,
    backgroundColor: '#2a3540',
  },
  headerView: {
    flexDirection: 'row',
  },
  position: {
    width: 40,
    height: 24,
    marginRight: 15,
  },
  positionTxt: {
    textAlign: 'center',
    color: '#fff',
    lineHeight: 24,
  },
  name: {
    color: '#fff',
    lineHeight: 24,
  },
  info: {
    flex: 1,
  },
  wins: {
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
  },
  points: {
    color: '#fff',
    lineHeight: 24,
    textAlign: 'right'
  },
})
