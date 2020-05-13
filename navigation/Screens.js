//importing
import React from "react";
import { Block, Text } from "galio-framework";
import SalonsScreen from "../screens/SalonsScreen";
import TokenSignupScreen from "../screens/TokenSignupScreen";
import StartScreen from "../screens/StartScreen";
import Logout from "../screens/Logout";
import { Icon } from "native-base";
import SalonTrackingScreen from "../screens/SalonTrackingScreen";
import ServicesScreen from "../screens/ServicesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import UpdatePasswordScreen from "../screens/UpdatePasswordScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import TokenForgetPasswordScreen from "../screens/TokenForgetPasswordScreen";
import Menu from "./Menu";
import NearestSalonMapScreen from "../screens/NearestSalonMapScreen";
import Drawer from "../components/Drawer";
import OneServiceScreen from "../screens/OneServiceScreen";
import AppointedServicesScreen from "../screens/AppointedServicesScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from "react-navigation";

//stack for profile
const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    UpdateProfile: {
      screen: UpdateProfileScreen,
    },
    ResetPassword: {
      screen: UpdatePasswordScreen,
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
  }
);

//stack for appointed services
const SlotsAvailingStack = createStackNavigator(
  {
    SlotsAvailing: {
      screen: AppointedServicesScreen,
    },
  },
  {
    cardStyle: { backgroundColor: "#EEEEEE" },
  }
);

//tab for maps and services
const MapsAndServiceTab = createBottomTabNavigator({
  SalonTrackingScreen: {
    screen: SalonTrackingScreen,
    navigationOptions: {
      tabBarLabel: false,
      tabBarIcon: () => (
        <Icon
          name="map-marker-outline"
          type="MaterialCommunityIcons"
          style={{ color: "blueviolet" }}
        />
      ),
      header: { visible: true },
    },
  },
  ServicesScreen: {
    screen: ServicesScreen,
    navigationOptions: {
      tabBarLabel: false,
      tabBarIcon: () => (
        <Icon
          name="shopping"
          type="MaterialCommunityIcons"
          style={{ color: "blueviolet" }}
        />
      ),
      header: { visible: true },
    },
  },
});

//stack for home
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: SalonsScreen,
    },

    NearestSalonMap: {
      screen: NearestSalonMapScreen,
    },
    MapandServices: {
      screen: MapsAndServiceTab,
    },
    Service: {
      screen: OneServiceScreen,
    },
    TimePick: {
      screen: AppointmentScreen,
    },
  },
  {
    cardStyle: {
      backgroundColor: "#EEEEEE",
    },
  }
);

//stack for drawer
const AppStack = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="SalonsScreen" title="Salons" />
        ),
      },
    },

    Profile: {
      screen: ProfileStack,
      navigationOptions: () => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
        ),
      }),
    },

    SlotsAvailing: {
      screen: SlotsAvailingStack,
      navigationOptions: () => ({
        drawerLabel: ({ focused }) => (
          <Drawer
            focused={focused}
            screen="Appointed Services"
            title="Appointed Services"
          />
        ),
      }),
    },

    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => (
          <Block style={{ marginVertical: 70 }}>
            <Text>{` `}</Text>
          </Block>
        ),
      },
    },

    Logout: {
      screen: Logout,
      navigationOptions: () => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Logout" title="Logout" />
        ),
      }),
    },
  },
  Menu
);

//switch navigation for application
const AppNavigator = createSwitchNavigator(
  {
    App: AppStack,
    Login: {
      screen: LoginScreen,
    },
    Start: {
      screen: StartScreen,
    },
    Registration: {
      screen: RegistrationScreen,
    },
    TokenSignup: {
      screen: TokenSignupScreen,
    },

    ForgetPassword: {
      screen: ForgetPasswordScreen,
    },
    TokenForgetPassword: {
      screen: TokenForgetPasswordScreen,
    },
  },
  {
    initialRouteName: "Start",
  }
);

//creating application container
const AppContainer = createAppContainer(AppNavigator);

//exporting AppContainer
export default AppContainer;
