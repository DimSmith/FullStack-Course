import "./SingleAuthor.css";
import { Author } from '../../Modal/Author';

interface authorProps{
    author:Author;
}

export function SingleAuthor(props:authorProps): JSX.Element {
    return (
        <div className="SingleAuthor">
			<div className="SingleAuthor Box">
                <h4>{props.author.firstName} {props.author.lastName}</h4>
            </div>
        </div>
    );
}
