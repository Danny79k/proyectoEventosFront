import { Link } from "react-router-dom"
import { AsociationContext, UserContext } from "../utils/Context"
import { useContext } from "react"
import useFetch from "../components/useFetch"
import Loading from "../components/Loading"
import Error from "../components/Error"

export default function MisAsociaciones() {

    const { user } = useContext(UserContext)
    const { asociaciones, setAsociaciones } = useContext(AsociationContext)
    const { data, loading, error } = useFetch(`https://jeffrey.informaticamajada.es/api/user/${user.id}/associations`)

    if (loading) return (<div className="mt-20"><Loading /></div>)
    if (error) return (<div className="mt-20"><Error /></div>)

    console.log(data);
    return (
        <div className="mt-20">
            <div>
                <h1>Todas mis asociaciones</h1>
                <div className="flex">
                    <div className="bg-green-400 text-7xl rounded-3xl border-2 justify-self-center">
                        <Link to={'/nueva-asociacion'}>+</Link>
                    </div>
                </div>
            </div>
            <div>
                <h1>Asociaciones miembro</h1>
            </div>
        </div>
    )
}
