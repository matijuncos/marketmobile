import React from 'react'
import { View, Text } from 'react-native-animatable'
import { TouchableHighlight } from 'react-native'

const Comment = ({comment}) => {
    return (
        <View style={{flexDirection: 'row', width: '95%', padding: 12, backgroundColor: '#f1f3f6', marginVertical: 5, borderRadius:12}}>
            <Text style={{fontWeight: 'bold'}}>{comment.idUser.firstName}</Text>
            <Text style={{width: '90%', paddingHorizontal: 10}}>{comment.comment}</Text>
            {/* <View style={{flexDirection: 'row'}}>
                <Text>Editar</Text>
                <Text>Borrar</Text>
            </View> */}
        </View>
    )
}

export default Comment
//{comment.idUser.firstName}
//{comment.comment}