import React from 'react'
import { View, Text } from 'react-native-animatable'

const Comment = ({comment}) => {
    return (
        <View style={{flexDirection: 'row', width: '95%', paddingHorizontal: 12, backgroundColor: '#f1f3f6', marginVertical: 5, borderRadius:12}}>
            <Text style={{fontWeight: 'bold'}}>Usuario: </Text>
            <Text style={{width: '90%', paddingHorizontal: 10}}>este mensaje es un comentario de prueba pasjaps pasj apsojaspoj </Text>
        </View>
    )
}

export default Comment
//{comment.idUser.firstName}
//{comment.comment}