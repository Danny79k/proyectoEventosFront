import { Link } from "react-router-dom"
import { AsociationContext } from "../utils/Context"
import { useContext } from "react"


export default function MisAsociaciones(){

    const {asociaciones, setAsociaciones} = useContext(AsociationContext)

    return(
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
