import React from 'react'

type PropsType ={
    id: number
    masagges: string
}

const Masagges: React.FC<PropsType> = (props) => {
    return (
        <div>{props.masagges}</div>
    )
}

export default Masagges