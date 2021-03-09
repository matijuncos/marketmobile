import React, {useState} from 'react'
import { View, Text } from 'react-native-animatable'
import { TouchableHighlight, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productActions'

const Comment = (props) => {

    const {comment, updateComment, product, delComment, loggedUser} = props
    const [ edit, setEdit] = useState('')
    const [visible, setVisible] = useState(false)
    
    const editComment = () =>{
            setVisible(!visible)    
            console.log(loggedUser)
            }

const sendNewComment = () =>{
        updateComment({comment: edit, idComment: comment._id})
        setVisible(!visible)    

    }
const deleteComment = () =>{
    delComment({
        idProduct: product._id,
        idComment: comment._id
      })
 }

    return (
        <View style={{width: '100%', padding: 12, backgroundColor: '#f1f3f6', marginVertical: 5, borderRadius:12}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{comment.idUser.firstName}</Text>
            {visible ? (
                <>
                <TextInput
                        style={styles.input}
                        placeholder='Dejá tu comentario!'
                        onChangeText={(value)=>setEdit(value)}
                        autoFocus
                        />  
                 <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} >
                    <TouchableHighlight>
                        <Text style={{marginRight: 8}} onPress={()=>setVisible(false)}>Cancelar</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text style={{marginRight: 8}} onPress={sendNewComment}>Enviar</Text>
                    </TouchableHighlight>
                </View>

                </>
            ):(
                <>
            <Text style={{width: '90%', paddingHorizontal: 10}}>{comment.comment}</Text>
            {loggedUser && (loggedUser.userId === comment.idUser._id )&&(

            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}} >
                <TouchableHighlight>
                    <Text style={{marginRight: 8}} onPress={editComment}>Editar</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={deleteComment}>
                    <Text>Eliminar</Text>
                </TouchableHighlight>
            </View>
                                ) }

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

const mapDispatchToProps ={
    updateComment: productActions.updateComment,
    delComment: productActions.delComment

}

const mapStateToProps = state =>{
    return{
        loggedUser: state.user.loggedUser
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)


//{comment.idUser.firstName}
//{comment.comment}