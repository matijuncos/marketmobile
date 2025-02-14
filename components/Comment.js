import React, {useState} from 'react'
import { View, Text } from 'react-native-animatable'
import { TouchableHighlight, StyleSheet,ToastAndroid,ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productActions'

const Comment = (props) => {
    const {comment, updateComment,setThisProduct,product, delComment, loggedUser} = props
    const [ edit, setEdit] = useState(comment.comment)
    const [visible, setVisible] = useState(false)
    const editComment = () =>{
        setVisible(!visible)    
    }

    const sendNewComment = async() =>{
        const res=await updateComment({'idComment': comment._id,'comment': edit})
        if(res.success){
            ToastAndroid.showWithGravity(
              'Tu comentario se ha editado',
              ToastAndroid.SHORT,
              ToastAndroid.TOP
            )
            setThisProduct(res.response)
            setVisible(!visible)   
            setEdit('') 
        }
        }
    const deleteComment = async() =>{
        const res=await delComment({'idProduct': product._id,'idComment': comment._id})
        if(res.success){
            ToastAndroid.showWithGravity(
              'Tu comentario se ha eliminado',
              ToastAndroid.SHORT,
              ToastAndroid.TOP
            )
            setThisProduct(res.response)
        }
    }
    return (
        <View style={{width: '100%', padding: 12, backgroundColor: '#f1f3f6', marginVertical: 5, borderRadius:12}}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{comment.idUser.firstName}:</Text>
            {visible ? (
                <>
                <TextInput
                        style={styles.input}
                        placeholder='Dejá tu comentario!'
                        onChangeText={(value)=>setEdit(value)}
                        autoFocus
                        value={edit}
                        />  
                 <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} >
                    <TouchableHighlight onPress={()=>setVisible(false)}>
                        <Text style={{marginRight: 8}}>Cancelar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{sendNewComment()}}>
                        <Text style={{marginRight:8}} >Enviar</Text>
                    </TouchableHighlight>
                </View>

                </>
            ):(
                <>
            <Text style={{width: '90%', paddingLeft: 20}}>{comment.comment}</Text>
            {loggedUser && (loggedUser.userId === comment.idUser._id )&&(

            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} >
                <TouchableHighlight onPress={()=>editComment()}>
                    <Text style={{marginRight: 8}}>Editar</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>deleteComment()}>
                    <Text>Eliminar</Text>
                </TouchableHighlight>
            </View>
            )}
            </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputView:{
        height: 40,
        borderRadius: 10,
        backgroundColor: 'red',
        marginTop: 10,
        marginBottom:15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        width:'95%',
        borderColor: 'black',
        borderWidth: 1
    
    },
    input:{
        height: 40,
        flex: 1,
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 10
    }
    });

    
const mapStateToProps = state =>{
    return{
        loggedUser: state.user.loggedUser
    }
}
export default connect(mapStateToProps)(Comment)


//{comment.idUser.firstName}
//{comment.comment}