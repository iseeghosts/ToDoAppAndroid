//App.js => UserHome.js => Welcome.js
//                        |=> SavedNote.js
//                        |=> AddNoteButton.js

/* importing required modules */
import React from 'react'
import {View, Image, TouchableHighlight, StyleSheet} from 'react-native'

/*Importing Button Images */
import Add_Note from './../assets/Add_Notes_Light.png' //Image uri for Add note button

/* this function enables handling style and input to addnote button*/

//Note:this is a function rather than a class component to avoid unneccessary extra work as it doesn't need much configuration

//Start Export (imports props which is a function in UserHome => ./../userpages/UserHome.js, [add_newtask])
export default function AddNote(props){

    //start return
    return(

        // this contains add note button
        <View style={styles.maincontainer}>

        {/* {child} this button adds an empty note to tasks declared in Tasks in UserHome => ./../userpages/UserHome.js
        when clicked/touched triggers add_newtask function in UserHome  [add_newtask] */}
            <TouchableHighlight style={styles.addnotebutton} onPress={ () => props.onPress()}>
                <Image source={Add_Note} style={styles.thumbnail}  />                       
            </TouchableHighlight>

        </View>
        //End of main container
    )
    //End of return
}
//End of export

/*Styles (in order of heirarchy)*/
const styles = StyleSheet.create({

    //main container containing all child items
    maincontainer:{
        backgroundColor:'transparent',
        marginRight:5,
        marginBottom:5,
    },

    //button containing add note logo 
    addnotebutton:{
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:'#0070bb',
        alignItems:'center',
        justifyContent:'center',
        elevation:10
    },

    //image style
    thumbnail:{
        width:50,
        height:50,
    },
})

