import React from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';


function RenderDish({dish}) {
    return (
        <Card className="col-12 col-md-5 m-1">
            <CardImg width="100%" src={dish.image} alt={dish.name}/>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </Card>
    );
}


function RenderComments({comments}) {
    const comment = comments.map(review => {
        return (
            <div key={review.id}>
                <ul className="list-unstyled">
                    <li className="list-item">{review.comment}</li>
                    <li className="list-item">-- {review.author}, {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(Date.parse(review.date)))}</li>
                </ul>
            </div>

        );
    });
    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {comment}
        </div>
    );
}

const DishDetail = (props) => {
    if (props.dish != null) {
        console.log('DishDetail Component render invoked');
        return (
            <div className="container">
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.dish.comments}/>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}

export default DishDetail;