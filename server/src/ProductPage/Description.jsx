import './ProductPage.css'

export default function Description(props)
{
    return(
        <div>
            <h2>Description</h2>
            <p id="description-area">{props.data.description}</p>
        </div>
    );
}