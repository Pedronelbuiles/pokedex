import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ImageColors from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    Pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get('window').width

export const PokemonCard = ({Pokemon}: Props) => {

const [bgColor, setBgColor] = useState('grey')

const isMounted = useRef(true)

const navigation = useNavigation()

useEffect(() => {

    if (!isMounted.current) return

    ImageColors.getColors(Pokemon.picture, {fallback: 'grey'})
        .then((colors => {
            if (colors.platform === 'android') {
                setBgColor(colors.dominant || 'grey')
            } else if (colors.platform === 'ios') {
                setBgColor(colors.background || 'grey')
            } else {
                setBgColor(colors.dominant || 'grey')
            }
        }))
        .catch((error) => {
            console.log(error)
        })
        
    return ( ) => {
        isMounted.current = false
    }

}, [])

    return (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Pokemon' as never, { SimplePokemon: Pokemon, color: bgColor } as never)}
        >
            <View style={{
                ...style.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                <View>
                    <Text style={style.name}>
                        {Pokemon.name}
                        {'\n#' + Pokemon.id}
                    </Text>
                </View>

                <View style={style.pokebolaContainer}>
                    <Image 
                        source={require('../assets/pokebola-blanca.png')}
                        style={style.pokebola}
                    />
                </View>
                
                
                <FadeInImage 
                    uri={Pokemon.picture}
                    style={style.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        marginBottom: 25,
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden'
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -20,
        right: -20,
        opacity: 0.6
    },
    pokemonImage : {
        width: 120,
        height: 120,
        position:'absolute',
        right: -8,
        bottom: -5,
    }
})