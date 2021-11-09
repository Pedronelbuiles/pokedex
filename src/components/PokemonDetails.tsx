import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterfaces';
import { styles } from '../theme/appTheme';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull;
}

export const PokemonDetails = ({pokemon}: Props) => {
    return (
        <ScrollView 
            style={{
                ...StyleSheet.absoluteFillObject
            }}
            showsVerticalScrollIndicator={false}
        >
            <View 
                style={{
                    ...style.container,
                    marginTop: 370
                }}
            >
                <Text style={style.title}>Types</Text>
                <View
                    style={{flexDirection: 'row'}}
                >
                    {
                        pokemon.types.map(({type}) => (
                            <Text 
                                style={{...style.regualarText, marginRight: 10}}
                                key={type.name}
                            >
                                {type.name}
                            </Text>
                        ))
                    }
                </View>

                <Text style={style.title}>Peso</Text>
                <Text style={style.regualarText}>{pokemon.weight} kg</Text>
            </View>

            <View>
                <Text style={style.container}>Sprites</Text>
                <ScrollView 
                    // style={}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    <FadeInImage 
                        uri={pokemon.sprites.front_default}
                        style={style.basicSprite}
                    />
                    <FadeInImage 
                        uri={pokemon.sprites.back_default}
                        style={style.basicSprite}
                    />
                    <FadeInImage 
                        uri={pokemon.sprites.front_shiny}
                        style={style.basicSprite}
                    />
                    <FadeInImage 
                        uri={pokemon.sprites.back_shiny}
                        style={style.basicSprite}
                    />
                </ScrollView>

                <View 
                    style={{
                        ...style.container,
                    }}
                >
                    <Text style={style.title}>Habilidades base</Text>
                    <View
                        style={{flexDirection: 'row'}}
                    >
                        {
                            pokemon.abilities.map(({ability}) => (
                                <Text 
                                    style={{...style.regualarText, marginRight: 10}}
                                    key={ability.name}
                                >
                                    {ability.name}
                                </Text>
                            ))
                        }
                    </View>
                
                </View>

                <View 
                    style={{
                        ...style.container,
                    }}
                >
                    <Text style={style.title}>Movimientos</Text>
                    <View
                        style={{flexWrap: 'wrap', flexDirection: 'row'}}
                    >
                        {
                            pokemon.moves.map(({move}) => (
                                <Text 
                                    style={{...style.regualarText, marginRight: 10}}
                                    key={move.name}
                                >
                                    {move.name}
                                </Text>
                            ))
                        }
                    </View>
                
                </View>

                <View 
                    style={{
                        ...style.container,
                    }}
                >
                    <Text style={style.title}>Stats base</Text>
                    <View>
                        {
                            pokemon.stats.map((stat, i) => (
                                <View 
                                    key={stat.stat.name + i}
                                    style={{flexDirection: 'row'}}
                                >
                                    <Text 
                                        style={{...style.regualarText, marginRight: 10, width: 150}}
                                    >
                                        {stat.stat.name}
                                    </Text>
                                    <Text 
                                        style={{...style.regualarText, fontWeight: 'bold'}}
                                    >
                                        {stat.base_stat}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                
                </View>

                <View
                    style={{
                        marginTop: 10,
                        marginBottom: 20,
                        alignItems: 'center'
                    }}
                >
                    <FadeInImage 
                        uri={pokemon.sprites.front_default}
                        style={style.basicSprite}
                    />
                </View>

            </View>

        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    regualarText: {
        fontSize: 19,
    },
    basicSprite: {
        width: 100,
        height: 100
    }
})