
export default function Error() {
    const errorImg = [
        "https://i.chzbgr.com/full/8125888256/hDEDABA33",
        "https://i.makeagif.com/media/7-16-2021/_tiA6v.gif",
        "https://media4.giphy.com/media/WbOlqVYADCjD2/giphy.gif",
        "https://i.gifer.com/DbgN.gif",
    ]

    const rand = errorImg[Math.floor(Math.random() * 3)]
    return (
        <>
            <div className="flex justify-center h-125">
                <img src={rand} alt="apologies" />
            </div>
            <h1 className="text-7xl text-center">NO SE HA ENCONTRADO LA SOLICITUD...</h1>
        </>
    )
}