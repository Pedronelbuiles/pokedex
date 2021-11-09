import React, { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi'
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonSearch = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])

    const loadPokemons = async () => {
        const resp = await pokemonApi.get<PokemonPaginatedResponse>('https://pokeapi.co/api/v2/pokemon/?limit=1200')
        mapPokemonListToSimplePokemon(resp.data.results)
    }

    const mapPokemonListToSimplePokemon = (pokemonList: Result[]) => {
        const newPökemonList:SimplePokemon[] = pokemonList.map( ({name, url}) => {
            const urlParse = url.split('/')
            const id = urlParse[urlParse.length - 2]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return { id, picture, name }
        })

        setSimplePokemonList(newPökemonList)
        setIsFetching(false)
    }

    useEffect(() => {
        loadPokemons()
    }, [])

    return {
        isFetching,
        simplePokemonList
    }
}
