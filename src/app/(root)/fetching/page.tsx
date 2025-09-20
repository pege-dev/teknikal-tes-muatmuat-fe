import { LucideLink } from "lucide-react"
import Link from "next/link"


const fetchPokemon = async () => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon-species")

        if (!res.ok) return null

        const data = await res.json()

        return data
    } catch (error) {
        console.error("Error Fetching Pokemon", error)
        return null
    }
}


const fetchEffect = async () => {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/ability/battle-armor")

        if (!res.ok) return null

        const data = await res.json()

        return data


    } catch (error) {
        console.error("Error Fetching Effect", error)
        return null
    }
}


interface PokemonType {
    name: string
}

export default async function FetchingPage() {

    const [pokemon, effect] = await Promise.all([fetchPokemon(), fetchEffect()])

    return (
        <>
            <div className="flex items-center gap-2 md:flex-row flex-col justify-between pb-4 border-b">
                <div className="flex items-center gap-2">
                    <h1 className="font-bold text-4xl">Fetching Page</h1>
                    <Link className="flex items-center gap-2 text-sky-600 px-4 py-2 rounded-md" href="/">

                        <LucideLink className="size-4" />
                        Halaman Products
                    </Link>
                </div>

            </div>


            <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="">
                    <h2 className="font-bold text-2xl mb-4">Fetching Pokemon Data</h2>
                    <table className="border-collapse w-full border border-slate-400">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 text-center px-2 py-1 w-fit">NO.</th>
                                <th className="border border-gray-300 text-center px-2 py-1 w-fit">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon?.results.map((pokemon: PokemonType, index: number) => (
                                <tr key={pokemon.name}>
                                    <td className="border border-gray-300 text-center px-2 py-1">{index + 1}</td>
                                    <td className="border border-gray-300 text-center px-2 py-1">{pokemon.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="md:border-t-0 border-t">
                    <h2 className="font-bold text-2xl mb-4">Fetching Pokemon Effects</h2>
                    {effect && (
                        effect.effect_entries.map((effect: any, index: number) => (
                            <div key={index}>
                                <p><span className="font-bold">Effect: </span>{effect.effect}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}