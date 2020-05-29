import React, { Component } from 'react';
import {View, Image, KeyboardAvoidingView, Platform, StyleSheet, YellowBox, TextInput, Text, Dimensions, TouchableHighlight, ScrollView, TouchableOpacity, Alert} from 'react-native';
YellowBox.ignoreWarnings(['RootErrorBoundary']);

//Importing list of users
// import this.props.Users from './users.json'


//Importing Images
import Userid_Check from './assets/Userid_Check.png' //check userid image url
import Verified_UserId from './assets/Verified_UserId.png' //verified userid image url
import Show_Pass from './assets/Show_Pass.png';
import Hide_Pass from './assets/Hide_Pass.png';
import Back_Arrow from './assets/Back_Arrow.png'
var messages = ["Sorry, this user id is not available","Kindly fill all the fields", "this userid is available", "Passwords do not match!"];
var ms = Dimensions.get('window')
import UO from './originaluserlist.json'
var x;

export default class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            name:'',
            userid:'',
            password:'',
            password2:'',
            displaySignUpBox:'none',
            enablePass1:true,
            enablePass2:true,
            showPass1:true,
            showPass2:true,
            result:'',
            result2:'',
            User_Status:Userid_Check,
            Pass_View1:Hide_Pass,
            Pass_View2:Hide_Pass
        }
        }
        reset_fields = () => {
            this.setState({
                displaySignUpBox:'none',
                User_Status:Userid_Check,
                result:'',
                result2:'',
            })
        }
        check_availability = () => {
            var len1=0
            var len2=0
            for (x in UO) {
                if ([x]!=this.state.userid) {
                    len1=len1+1
                }
                len2=len2+1
            }
            // alert(len1+ ' ' + len2)
            if ((len1!=len2) && (len1!=0)) {
                this.setState({result:messages[0]})
            } else if ((len1==len2) && (len1!=0)) {
                this.setState({displaySignUpBox:'flex',result:messages[2], User_Status:Verified_UserId})
            }
        }
        reset_results = () => {
            this.setState({
                result:'',
                result2:''
            })
        }

        reset_field1 = () => {
            this.setState({
                enablePass2:(String(this.state.password2).length==''),
                showPass2:true,
                Pass_View2:Hide_Pass,
                result:'',
                result2:''
            })
            if (String(this.state.password)=='') {
                this.setState({
                    enablePass1:true,
                })
                // alert('Hola!')
            }
        }
        reset_field2 = () => {
            this.setState({
                enablePass1:(String(this.state.password).length==''),
                showPass1:true,
                Pass_View1:Hide_Pass,
                result:'',
                result2:''
            })
            if (String(this.state.password2)=='') {
                this.setState({
                    enablePass2:true,
                })
            }
            
        }

        signup_attempt = () => {
            if ((this.state.password) && (this.state.password2) && (this.state.name)) {
                if (this.state.password==this.state.password2) {
                    this.props.Users[this.state.userid] = {"name":this.state.name, "pwd":this.state.password, "taskMargin":8, "theme":"light"}
                    UO[this.state.userid] = {"name":this.state.name, "pwd":this.state.password, "taskMargin":8, "theme":"light"}
                    this.props.Tasks[this.state.userid] = [];
                    Alert.alert("Account Creation",'Hi '+ this.props.Users[this.state.userid].name + '!\nYour account was created successfully!'
                    ,[
                        {text:'Ok!', onPress: () => this.setState({ name:'', userid:'', password:'', password2:'', displaySignUpBox:'none', enablePass1:true, enablePass2:true, showPass1:true, showPass2:true, result:'', result2:'', User_Status:Userid_Check, Pass_View1:Hide_Pass, Pass_View2:Hide_Pass})},
                        {text:'Go to home', onPress: () => {this.props.setUserId(this.state.userid); this.props.signUp(false); this.props.goHome(true);}}
                    ], {cancelable:true} )
                } else {
                this.setState({result2:messages[3]})
                }
            } else {
                this.setState({result2:messages[1]})
            }
        }
    render() {
        var signupbox = StyleSheet.flatten([
            styles.userdetails,{
                display:this.state.displaySignUpBox
            }
        ])
        var resulttext = StyleSheet.flatten([
            {
                display:(this.state.result==''?'none':'flex'),
                color:(this.state.displaySignUpBox=='flex'?'darkgreen':'darkred')
            }
        ])
        var signupresult = StyleSheet.flatten([
            styles.signupresulttext,{
                display:(this.state.result2==''?'none':'flex'),
            }
        ])


        return(

            //Main Container 
            <KeyboardAvoidingView style={styles.mainbox}  behavior={Platform.OS == "ios" ? "padding" : ""}>

                {/* Header for Sign Up */}
                <View style={styles.header}>
                    <TouchableHighlight activeOpacity={1} underlayColor="#0070bb" style={styles.backnavigation} onPress={()=> this.props.signUp(false)}>
                        <Image style={styles.thumb} source={Back_Arrow} />
                    </TouchableHighlight>
                    <Text style={styles.headertext}>Just a few details and you'll be ready</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Body part containing sign up elements */}
                    <View style={styles.bodybox}>
                        <View style={styles.firstcontainer}>
                            <Text style={styles.useridtext}>enter a userid to signup with...</Text>
                            <View style={styles.useridbox}>
                                <TextInput style={styles.inputuserid}  defaultValue={this.state.userid} placeholderTextColor='darkgrey' placeholder={'userid'} onChangeText={(userid)=>this.setState({userid})} onChange={() => this.reset_fields()} />
                                <TouchableOpacity  style={styles.useridverify} onPress={()=>this.check_availability()} activeOpacity={1} disabled={(this.state.userid=='')}>
                                    <Image source={this.state.User_Status} style={styles.thumb}/>                           
                                </TouchableOpacity>
                            </View>
                            <Text style={resulttext}>{this.state.result}</Text>
                            <View style={signupbox}>
                                <Text style={styles.useridtext}>enter your name...</Text>
                                <View style={styles.username}>
                                    <TextInput style={styles.inputname} defaultValue={this.state.name} placeholder={'Enter Name!'} onChangeText={(name)=>this.setState({name})} onChange={()=>this.setState({result:'', result2:''})} />
                                </View>

                                <Text style={styles.useridtext}>enter a password...</Text>

                                <View style={styles.passwordbox}>
                                    {/* Field 1 */}
                                    <TextInput secureTextEntry={this.state.showPass1} style={styles.inputpassword} placeholderTextColor={'gray'}
                                        placeholder={'Enter Your Password Here!'}                                
                                        defaultValue={this.state.password}                                
                                        onChangeText={(password) => this.setState({password})}
                                        onChange={() => this.reset_field1()}
                                        />

                                    <TouchableOpacity
                                        activeOpacity={1}
                                        disabled={(!this.state.enablePass1)}
                                        underlayColor={'#747474'}
                                        style={styles.passwordview} 
                                        onPress={()=> this.setState({showPass1:!this.state.showPass1, Pass_View1:(this.state.Pass_View1==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                        <Image style={styles.thumb} source={this.state.Pass_View1} />
                                    </TouchableOpacity>
                                </View>
                                
                                <Text style={styles.useridtext}>confirm your password...</Text>

                                <View style={styles.passwordbox}>
                                    {/* field 2 */}
                                    <TextInput secureTextEntry={this.state.showPass2} style={styles.inputpassword} placeholderTextColor={'gray'}
                                            placeholder={'Reenter Your Password Here!'}
                                            defaultValue={this.state.password2}                                
                                            onChangeText={(password2) => this.setState({password2})}
                                            onChange={() => this.reset_field2()}
                                            />

                                    <TouchableOpacity
                                        activeOpacity={1}
                                        disabled={!this.state.enablePass2}
                                        underlayColor={'#747474'}
                                        style={styles.passwordview}
                                        onPress={()=> this.setState({showPass2:!this.state.showPass2, Pass_View2:(this.state.Pass_View2==Hide_Pass ? Show_Pass:Hide_Pass)})}>
                                        <Image style={styles.thumb} source={this.state.Pass_View2} />
                                    </TouchableOpacity>
                                </View>

                                <TouchableHighlight style={styles.signupbutton} underlayColor="#000" onPress={() => this.signup_attempt()}>
                                    <Text style={styles.signupbuttontext}>signup</Text>                            
                                </TouchableHighlight>
                                <Text style={signupresult}>{this.state.result2}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )

    }
}

const styles = StyleSheet.create({

    //mainbox containing all
    mainbox:
    {
        marginTop:20,
        flex:1,
    },

    //header for signup
    header:
    {
        marginTop:10,
        padding:5,
        borderRadius:4,
        // backgroundColor:'skyblue',
        alignItems:'center',
        // justifyContent:'center',
        elevation:10,
        flexDirection:'row'        
    },
    
    //Navigate Back button
    backnavigation:{
        height:35,
        width:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:17.5,
        backgroundColor:'white',
        marginHorizontal:10
    },

    //header text
    headertext:
    {
        fontSize:20,
    },

    //body containing all signup elements
    bodybox:{
        alignItems:"center",
        justifyContent:'flex-start',
        paddingTop:30,
    },

    //login box [contains login elements]
    firstcontainer: {
        width:ms.width*8/9,
        backgroundColor:'steelblue',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:10,
        padding:20,
    },

    //text for userid box
    useridtext:
    {
        color:'lightgrey',
        textAlign:'left',
        width:ms.width*7/9,
        marginBottom:5,
    },

    //userid box
    useridbox:
    {
        borderRadius:4,
        flexDirection:'row',
        width:ms.width*7.5/9,
        backgroundColor:'white',
        height:40,
        alignContent:'center',
        justifyContent:'center',
        elevation:5,
        marginBottom:10
    },

    //input for userid
    inputuserid:{
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,
        width:ms.width*7.5/9 - 45,
        paddingHorizontal:10,
        backgroundColor:'lightblue'

    },

    //button for userid verification
    useridverify:{
        width:45,
        alignItems:'center',
        justifyContent:'center'   
    },

    //style for userdetails
    userdetails:
    {
        alignItems:'center'
    },

    //box containing input for username
    username:
    {
        backgroundColor:'white',
        width:ms.width*7.5/9,
        height:40,
        borderRadius:5,
        justifyContent:'center',
        marginBottom:10,
        paddingLeft:10,
        elevation:10
    },

    //name input
    inputname:
    {
    },
    
    //Password input container main
    passwordbox:{
        height:40,
        alignContent:'center',
        justifyContent:'center',
        elevation:5,
        marginBottom:10,
        flexDirection:'row',
        borderRadius:4,
        width:ms.width*7.5/9,
        backgroundColor:'black',
        paddingLeft:10,
    },

    //input for password
    inputpassword:{
        justifyContent:'center',
        width:ms.width*7.5/9 - 60,
        color:'white',
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,       
    },

    //button for password view
    passwordview:{
        justifyContent:"center",
        alignItems:'center',
        width:45,
        borderTopRightRadius:4,
        borderBottomRightRadius:4,
    },    
    
    //button for credential submission
    signupbutton:{
        margin:10,
        borderRadius:4,
        backgroundColor:'#555555',
        alignItems:'center',
        justifyContent:'center',
        elevation:10,
        
    },

    //text style for submit button
    signupbuttontext: {
        fontSize:16,
        color:'white',
        padding:7,
        fontStyle:'italic',
    },

    //result of signup attempt in case of failure
    signupresulttext:{
        textAlign:'center',
        color:'darkred',
        fontStyle:'italic'
    },

    //style for thumbs
    thumb:
    {
        width:35,
        height:35,
    }
})
