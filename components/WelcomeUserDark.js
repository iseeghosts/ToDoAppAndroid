//App.js => UserHome.js => Welcome.js

/* This is Welcome header, part of After Login Screen, it staays on top, support styles are mentioned in UserHome.js => ../userpages/UserHome.js */

/* importing required modules */
import React, { Component } from 'react'
import {Text, TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native'

/*Importing Button Images */
import Profile_Image from './../assets/Profile_Pic_Dark.png'  //sample profile logo
import Settings_User from './../assets/Settings_Icon_Dark.png'   //settings icon

var ms = Dimensions.get('window'); //getting screen dimensions

/* This function renders the top header/banner, including handling touches and styles*/

//Starts export
export default class WelcomeUser extends Component {
  
  //Initial State of the function
  constructor() {
    super()
    this.state = {
      profileMenu:'flex',   //
      backColor:'#474747',
      elevate:10
    }
  }

  // This functions expands profile icon to profile options if profileMenu:'none', clicking again will undo the changes 
  profile_menu = () => {
      this.setState({
        'profileMenu':(this.state.profileMenu=='flex'?'none':'flex'),
        'backColor':(this.state.profileMenu=='flex'?'transparent':'#474747'),
        elevate:(this.state.profileMenu=='flex'?0:10),
      })
    
  }

  //Start of rendering functions (this part renders all elements of Profile header, handles touches, and styles)
  render() {

    //this varible enables header style be affected by touch events 
    var elevated = StyleSheet.flatten([
      styles.header,{
        backgroundColor:this.state.backColor,
        elevation:this.state.elevate
      }
    ])

    //this variable enables profile container style be affected by touch events

    //this varibles enables visibility of profile option be affected by touch events
    var menuContainter = StyleSheet.flatten([
        styles.seccontainer,{
            display:this.state.profileMenu
        }
    ])

    //Start of return
    return (
      // Contains all elements within visible area of screen
      <View style={styles.maincontainer}>

          <View style={elevated}>

            {/* This button enables/disbles extended profile menu and visibility of profile option [profile_menu] */}
            <TouchableOpacity onPress={() => this.profile_menu()} style={styles.piccontainer}>
              <Image source={Profile_Image} style={styles.logo} />
            </TouchableOpacity>

            {/* {child} this container holds profile menu and their attributes including visibility ^profile_menu,
            returns username extracted from Users.json => ./../users.json, passed via App.js -> UserHome.js -> WelcomeUser.js
            the touch events for this buttons haven't been configured yet */}
            <View style={menuContainter}>
              <Text style={styles.welcometext}>Hello {this.props.user.name}!</Text>

              {/* future - app settings for user*/}
              <TouchableOpacity style={styles.settings} onPress={() => this.props.openSettings()}>
                  <Image source={Settings_User} style={styles.logo} />
              </TouchableOpacity>

              {/* future - View Profile details and provide option to logout */}
              <TouchableOpacity onPress={()=> this.props.logout()} style={styles.profilebutton}>
                  <Text style={styles.logoutbuttontext}>log out!</Text>
              </TouchableOpacity>

            </View>
            {/* end of child container */}
          </View>
      </View>


    )
    //End of return
  }

  //End of render function
} 
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

  maincontainer:{
    backgroundColor:'transparent',
    marginBottom:5,
    marginHorizontal:ms.width/40,
  },

  header: {
    width:ms.width*9.5/10,
    height:50,
    borderRadius:25,
    flexDirection:'row',
    alignItems:'center',
  },
  piccontainer:{
    width:40,
    height:40,
    marginLeft:5,
    borderRadius:20,
    backgroundColor:'#828282',
    justifyContent:'center',
    alignItems:'center',
    elevation:10
  },
  seccontainer: {
      width:ms.width*9.5/10 - 50,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:"space-between",
      paddingHorizontal:5
  },
  welcometext:{
    marginHorizontal:10,
    color:'black',
    fontStyle:'italic',
    fontSize:15,
    fontWeight:'500',
  },
  profilebutton:{
      justifyContent:'center',
      alignItems:'center',
      height:35,
      borderRadius:17.5,
      elevation:10,
      backgroundColor:'grey',
  },
  logoutbuttontext: {
    paddingHorizontal:10,
    color:'black',
    fontStyle:'italic',
    fontSize:15,
    fontWeight:'500',
  },
  settings:{
    height:28,
    width:28,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:14,
    elevation:10
  },
  logo:{
    width:40,
    height:40,
  },
})