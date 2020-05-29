//App.js => UserHome.js

/*This is an after login Component */

/* importing required modules */
import React, {Component} from 'react'
import {View, Text, FlatList, Dimensions, StyleSheet, KeyboardAvoidingView} from 'react-native'

//Importing functions
import SavedNote from '../components/SavedNoteDark'    //Function resposible for maintaining notes (editing, deleting, checking)
import WelcomeUser from '../components/WelcomeUserDark'  //Header for logged in user [View Profile] - incomplete, [settings] - incomplete
import AddNoteButton from '../components/AddNoteButtonDark'  //Button to add notes
import UserSettings from './UserSettingsDark'
import UserHomeLight from './UserHomeLight'


//imprting list of tasks
// import Tasks from '../tasks.json'
var ms = Dimensions.get('window');

 /*This is the User Home Component - accessible after user inputs correct id and password*/

 //Starts export
 export default class UserHome extends Component{
    
    //Initializing initial states of the system
    constructor() {
        super()
        this.state={
            taskid:Math.random().toString(13).replace('0.', ''), //Initial taskid of tasks in task.json
            openSettings:false,
        }
    }
    user_settings = () => {
        this.setState({
            'openSettings':!this.state.openSettings
        })
    }

    // This function adds a new task with random key value (taskid) and empty content value
    add_newtask = () => {
        this.setState({
            'taskid':Math.random().toString(13).replace('0.', '')  //Each time a task is run, taskid increments by 1
        })
        var date = new Date().toLocaleString();

        this.props.Tasks[this.props.id].push({"key":this.state.taskid, "content":"", "last_updated":date, "status":"Incomplete"});   // Pushing new task to list of Tasks
        // alert(this.state.taskid)
        // console.log(this.state.taskid)
    }

    task_header = () => {
        return(
            <View style={styles.taskheader}>
                <Text style={styles.taskheadertext}>Tasks</Text>
            </View>
        )
    }
    /*Beginning of render function*/
    render () {
        if (this.props.user.theme=='light') {
            return(
                <View style={{flex:1}}>
                    <UserHomeLight Tasks={this.props.Tasks} v={this.props.v} logout={this.props.logout} user={this.props.user} id={this.props.id} />
                </View>
            )
        }
        if (this.state.openSettings) {
            // alert(this.props.user.theme)
            // alert(this.props.user.taskMargin)
            return (
              <View style={{flex:1}}>
                <UserSettings  v={this.props.v} logout={this.props.logout} id={this.props.id} user={this.props.user} closeSettings={this.user_settings} />
              </View>
            )
          }

        const id = this.props.id
        const mytask = this.props.Tasks[id]   //this is an array [{key:'', content:''},{}]
    
        //Starts Main function    
        return(
                // Main Container   
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.maincocontainer}>

                    {/* first Container of children items*/}
                        <View style={styles.firstcontainer}>
                                            {/* {child} This Box Contains Welcome User Header => ./components/WelcomeUser.js */}
                            <View style={styles.userheader}>

                    {/* {sub-child}Passing Name of Logged Inuser to the header */}
                                <WelcomeUser user={this.props.user} openSettings={this.user_settings} logout={this.props.logout}/>  
                            </View>

                    {/* {child} This gives the list of all tasks in tasks (Tasks variable)
                        this lists is optimised with Flatlist componenet and SavedNotes function => ./component/SavedNote.js
                        included function - [delete notes, edit notes, check notes] */}
                            <View style={styles.flatlistcontainer}>
                                <FlatList ref={ref => this.flatList = ref}
                                
                                    ListHeaderComponent={this.task_header}
                                    showsVerticalScrollIndicator={false}
                                    onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true})}
                                    onLayout={() => this.flatList.scrollToEnd({animated: true})}  
                                    contentInset= {{bottom:85}} data={mytask} renderItem={({item}) => 
                                    <SavedNote user={this.props.user} task={item} id={item.key} /> }
                                    keyExtractor={item => item.key.toString()}
                                        />
                            </View>
                        </View>

                    {/* Second Container Add notes function container => ./components/AddNoteButton.js  */}                    
                        <View style={styles.addnotes}>

                    {/* Passing function AddNewTask to the button */}
                            <AddNoteButton onPress={this.add_newtask}/>
                        </View>
                    
                </KeyboardAvoidingView>

        )
        //Main Function Ends Here
    }
    /* End of render function*/

}
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({
    
    taskheader:
    {
        margin:20
    },
    taskheadertext:
    {
        fontSize:40,
        color:'white'
    },

    //Avoid KeyBoard Overlap
    maincocontainer: {
        flex:1,
        marginTop:20,
        backgroundColor:'#222222',
    },

    //first Container to Include children items
    firstcontainer: {
        flex:1,
    },

    //Header for Logged In Screen
    userheader: {
        paddingBottom:5,
        paddingTop:10,
        backgroundColor:'#727272',
    },
    flatlistcontainer: {
        width:ms.width,
        flex:1,
    },
    addnotes: {
        height:0.0001,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
})
