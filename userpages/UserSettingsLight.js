import React, { Component } from 'react';
import {View, Text, Image, Alert, Dimensions, TouchableOpacity, ScrollView,StyleSheet, Platform, Button, TextInput, KeyboardAvoidingView} from 'react-native';

import UserSettingsDark from './UserSettingsDark'

import Profile_Pic from '../assets/Profile_Pic_Light.png'
import Back_Arrow from '../assets/Back_Arrow.png';
import Show_Pass from '../assets/Show_Pass.png';
import Hide_Pass from '../assets/View_Eyes.png';

var ms = Dimensions.get('window');

export default class UserSettings extends Component {
    constructor (props) {
        super()
        this.state = ({
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            resultText:'',
            pfv:'none',
            newMargin:'0',
            theme:props.user.theme,
            enablePass1:true,
            enablePass2:true,
            enablePass3:true,
            Pass_View1:Hide_Pass,
            Pass_View2:Hide_Pass,
            Pass_View3:Hide_Pass,
        })
    }

    update_password = () => {
        this.setState({
            pfv:(this.state.pfv=='none'?'flex':'none'),
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            resultText:'',  
        })        
    }
    
    reset_field1 = () => {
        this.setState({
            enablePass2:(this.state.newPassword==''),
            enablePass3:(this.state.confirmPassword==''),
            Pass_View2:Hide_Pass,
            Pass_View3:Hide_Pass,
        })
        if (this.state.oldPassword=='') {
            this.setState({
                enablePass1:true
            })
        }
    }
    
    reset_field2 = () => {
        this.setState({
            enablePass1:(this.state.oldPassword==''),
            enablePass3:(this.state.confirmPassword==''),
            Pass_View1:Hide_Pass,
            Pass_View3:Hide_Pass,
        })
        if (this.state.newPassword=='') {
            this.setState({
                enablePass2:true
            })
        }
    }
    
    reset_field3 = () => {
        this.setState({
            enablePass2:(this.state.newPassword==''),
            enablePass1:(this.state.oldPassword==''),
            Pass_View2:Hide_Pass,
            Pass_View1:Hide_Pass,
        })
        if (this.state.confirmPassword=='') {
            this.setState({
                enablePass3:true
            })
        }
    }

    /*
    password nest =>
    1. oldpassword no match => result = fail 
    2. new password empty => result = fail
    3. new password and old password match and new password confirm password match => result fail
    4. new password and old password match and new password confirm password don't match => result fail
    5. new password and confirm password don't match => result => fail
    6. oldpassword field empty => result= fail
    7. new password and old password don't match and new password confirm password match => result success
    */
    change_password = () => {
        var messages = ["old password is incorrect", "new password field/fields cannot be empty", "passwords do not match", "enter new password different than old password"]
        var text1 =''
        if ((this.state.oldPassword==this.props.user.pwd)) {

            if ((this.state.newPassword!='') && (this.state.confirmPassword == this.state.newPassword) && (this.state.newPassword != this.props.user.pwd)) {
                this.props.user.pwd = this.state.newPassword
                alert('Password Changed Successfully')
                this.setState ({
                    pfv:'none',
                    oldPassword:'',
                    newPassword:'',
                    confirmPassword:'',
                    resultText:'',  
                })
        }

        else if ((this.state.newPassword==this.state.confirmPassword) && (this.state.newPassword==this.props.oldPassword)) {
            this.setState({resultText:messages[3]})
        }

        else if ((this.state.newPassword=='') || (this.state.confirmPassword=='')) {
            text1 = messages[1]
        }
        
        else if (this.state.confirmPassword!=this.state.newPassword) {
            text1 = messages[2]
        }

    }    else {
        text1 = messages[0]
    }
    this.setState({resultText:text1})
    }
    
    set_margin = () => {
        if ((Number(this.state.newMargin)) > 0 && (Number(this.state.newMargin) < 16)) {
        this.props.user.taskMargin = Number(this.state.newMargin)
        alert('Home Screen margin set to ' + this.state.newMargin+'!')
        } else {
            alert('Please enter an acceptable value (1-15)!')
        }
    }

    change_theme = () => {
        this.props.user.theme = (this.props.user.theme=='light'?"dark":'light')
        this.setState({
            theme:(this.state.theme=='light'?"dark":'light'),
        })
        alert('Dark theme applied successfully!')
    }

    delete_account = () => {
        var id = this.props.id
        Alert.alert('Delete Account', "This action is irreversible,\n Do you still want to proceed?", [{text:'Yes', onPress: () => {
        this.props.logout();
        alert('Account Deleted Successfully!')
        delete this.props.v[id];
        }
    }, {text:'No',}], {cancelable:true} )
    }

    
    render() {
        var passboxcontainer = StyleSheet.flatten([
            styles.updatepasscontainer,{
                display:this.state.pfv
            }
        ])
        if (this.props.user.theme=='dark') {
            return (
                <View style={{flex:1}}>
                  <UserSettingsDark id={this.props.id} logout={this.props.logout} v={this.props.v} user={this.props.user}  closeSettings={this.props.closeSettings} />
                </View>
              )
        }
        return(
            <View style={styles.mainbox}>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>

                        <TouchableOpacity activeOpacity={1} underlayColor="white" style={styles.backnavigation} onPress={()=> this.props.closeSettings()}>
                            <Image style={styles.buttonthumbs} source={Back_Arrow} />
                        </TouchableOpacity>


                    <View style={styles.header}>
                        
                        <View style={styles.profilepiccontainer}>
                            <Image source={Profile_Pic} style={styles.picthumb} />
                        </View>

                        <View style={styles.welcometextbox}>
                            <Text style={styles.userwelcometext}> Hello {this.props.user.name}!</Text>
                        </View>

                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.settings}>

                        <View style={styles.themes}>
                            <TouchableOpacity activeOpacity={0.5} onPress={()=> this.update_password()} style={styles.buttontbox3}>
                                <Text style={styles.buttontboxtext}>Update Password</Text>
                            </TouchableOpacity>
                        </View>

                        {/* <TouchableOpacity activeOpacity={0.7} style={styles.passwordexpand} onPress={() => this.update_password()}>
                            <Text style={styles.passwordupdatebuttontext}>Update Password</Text>
                        </TouchableOpacity> */}
                        <View style={passboxcontainer}>
                            {/* passwords */}
                            <View style={styles.boxofall}>

                                {/* old password */}


                                <View style={styles.inputboxes}>
                                    <Text style={styles.passtext}>Enter Old Password!</Text>
                                    <View style={styles.passbox}>
                                        <TextInput style={styles.textinputpass} secureTextEntry={this.state.Pass_View1==Hide_Pass} placeholder={''} defaultValue={this.state.oldPassword} onChangeText={(oldPassword)=>this.setState({oldPassword})} onChange={() => this.reset_field1()} />
                                        <TouchableOpacity
                                        activeOpacity={1}
                                        disabled={!this.state.enablePass1}
                                        style={styles.passwordview}
                                        onPress={()=> this.setState({Pass_View1:(this.state.Pass_View1==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                        <Image style={styles.buttonthumbs} source={this.state.Pass_View1} />
                                    </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.inputboxes}>
                                    <Text style={styles.passtext}>Enter New Password!</Text>
                                    <View style={styles.passbox}>
                                        <TextInput style={styles.textinputpass} secureTextEntry={this.state.Pass_View2==Hide_Pass} placeholder={''} defaultValue={this.state.newPassword} onChangeText={(newPassword) => this.setState({newPassword})} onChange={() => this.reset_field2()} />
                                        <TouchableOpacity
                                        activeOpacity={1}
                                        disabled={!this.state.enablePass2}
                                        style={styles.passwordview}
                                        onPress={()=> this.setState({Pass_View2:(this.state.Pass_View2==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                        <Image style={styles.buttonthumbs} source={this.state.Pass_View2} />
                                    </TouchableOpacity>
                                    </View>                                
                                </View>

                                <View style={styles.inputboxes}>
                                    <Text style={styles.passtext}>Confirm your new password!</Text>
                                    <View style={styles.passbox}>
                                        <TextInput style={styles.textinputpass} secureTextEntry={this.state.Pass_View3==Hide_Pass} placeholder={''} defaultValue={this.state.confirmPassword} onChangeText={(confirmPassword)=>this.setState({confirmPassword})} onChange={() => this.reset_field3()} />
                                        <TouchableOpacity
                                        activeOpacity={1}
                                        disabled={!this.state.enablePass3}
                                        style={styles.passwordview}
                                        onPress={()=> this.setState({Pass_View3:(this.state.Pass_View3==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                        <Image style={styles.buttonthumbs} source={this.state.Pass_View3} />
                                    </TouchableOpacity>
                                    </View>
                                </View>

                                <Text style={styles.resulttext}>{this.state.resultText}</Text>
                            </View>
                            <TouchableOpacity marginTop={10} activeOpacity={0.5} onPress={()=> this.change_password()} style={styles.buttontbox}>
                                <Text style={styles.buttontboxtext}>update</Text>
                            </TouchableOpacity>                            
                        </View>
                        <View style={styles.themes}>
                            <View style={styles.margbox}>
                                <Text style={styles.margintext}>Enter New Margin Value (max. 15) -</Text>
                                <TextInput style={styles.marginvalue} keyboardType={'numeric'} placeholder={'___'} placeholderTextColor='steelblue' maxLength={15} onChangeText={(newMargin) => this.setState({newMargin})} />
                            </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={()=> this.set_margin()} style={styles.buttontbox}>
                                <Text style={styles.buttontboxtext}>update margin</Text>
                            </TouchableOpacity>                            
                        </View>
                        <View style={styles.themes}>
                            <View style={styles.margbox}>
                                <Text style={styles.margintext}>Change Theme</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={()=> this.change_theme()} style={styles.buttontbox2}>
                                <Text style={styles.buttontboxtext2}>{(this.state.theme=='light'?"DARK":'LIGHT')}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=> this.delete_account()} style={styles.buttontbox4}>
                        <Text style={styles.buttontboxtext3}>DELETE ACCOUNT</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainbox:
    {
        flex:1,
        backgroundColor:'#DBDBDB',
        alignItems:'center',
        marginTop:20
    },
    header:
    {
        flex:1/5,
        alignItems:'center',
        width:ms.width,
        justifyContent:'center',
        paddingBottom:5,
        marginBottom:10,
    },
    backnavigation:
    {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:16,
        height:32,
        width:32,
        marginTop:10,
        marginLeft:10
    },
    buttonthumbs:{
        height:35,
        width:35,
    },
    profilepiccontainer:
    {
        marginTop:10,
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        elevation:10
    },
    picthumb:
    {
        height:55,
        width:55
    },
    welcometextbox:
    {
        marginVertical:5,
        padding:4,
        backgroundColor:'white',
        borderRadius:3,
    },
    userwelcometext:
    {
        color:'black',
        fontSize:15,
    },
    settings:
    {
        borderTopWidth:1,
        flex:4/5,
    },
    updatepasscontainer:
    {
        marginHorizontal:15,
        marginBottom:5,
        borderRadius:5,
        flex:1,
        backgroundColor:'darkblue',
    },
    boxofall:
    {
        flex:1,
    },
    inputboxes:
    {
        marginTop:10,
        marginHorizontal:20,
    },
    passtext:
    {
        fontStyle:'italic',
        color:'white',
        fontSize:10,
        padding:3
    },
    passbox:
    {
        paddingLeft:10,
        borderRadius:3,
        backgroundColor:'white',
        alignContent:'center',
        justifyContent:'center',
        width:ms.width*7/9,
        elevation:5,
        flexDirection:'row',
    },
    textinputpass:
    {
        paddingVertical:3,
        color:'black',
        fontSize:18,
        width:ms.width*7/9-55,
    },
    passwordview:{
        justifyContent:"center",
        alignItems:'center',
        width:45,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },
    resulttext:
    {
        color:'red',
        fontSize:12,
        padding:2,
        textAlign:'justify'
    },
    margbox:{
        flexDirection:'row',
        borderRadius:5,
    },
    margintext:
    {
        padding:10,
        fontSize:18,
        color:'black'
    },
    marginvalue:
    {
        color:'steelblue',
        width:30,
        fontSize:20,
        paddingTop:2,
    },
    themes:{
        margin:5,
        backgroundColor:'white',
        borderRadius:5,
        justifyContent:'center',
    },
    buttontbox:
    {
        backgroundColor:'#0087BD',
        alignItems:'center',
        justifyContent:'center',
        padding:8,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    buttontbox2:
    {
        backgroundColor:'black',
        alignItems:'center',
        justifyContent:'center',
        padding:8,
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
    },
    buttontbox3:
    {
        backgroundColor:'#0087BD',
        alignItems:'center',
        justifyContent:'center',
        padding:8,
        borderRadius:5,
    },
    buttontbox4:
    {
        backgroundColor:'#7C0A02',
        alignItems:'center',
        justifyContent:'center',
        padding:8,
        borderRadius:5,
        margin:5
    },
    buttontboxtext:{
        color:'black',
        fontSize:18,
    },
    buttontboxtext2:
    {
        color:'white',
        fontSize:18,
    },
    buttontboxtext3:
    {
        color:'white',
        fontSize:18,
    },
})