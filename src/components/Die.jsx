export default function Die(props){
    return(
        <>
            <button style={
                {backgroundColor : props.isHeld ? "#59E391" :"#F5F5F5"}
            }  className="die-button">{props.value}</button>
        </>
    )
}