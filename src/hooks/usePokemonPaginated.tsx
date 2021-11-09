import React, { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../api/pokemonApi'
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
    const nextPageurl = useRef('https://pokeapi.co/api/v2/pokemon/?limit=40')

    const loadPokemons = async () => {
        setIsLoading(true)
        const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageurl.current)
        nextPageurl.current = resp.data.next
        mapPokemonListToSimplePokemon(resp.data.results)
    }

    const mapPokemonListToSimplePokemon = (pokemonList: Result[]) => {
        const newPökemonList:SimplePokemon[] = pokemonList.map( ({name, url}) => {
            const urlParse = url.split('/')
            const id = urlParse[urlParse.length - 2]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return { id, picture, name }
        })

        setSimplePokemonList([...simplePokemonList, ...newPökemonList])
        setIsLoading(false)
    }

    useEffect(() => {
        loadPokemons()
    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }
}
