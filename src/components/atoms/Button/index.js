function Button(props) {
    return <button className={`h-10 px-6 font-semibold rounded ${props.buttonClassname}`}>{props.children}</button>
}

export default Button;