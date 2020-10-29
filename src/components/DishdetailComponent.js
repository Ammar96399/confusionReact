import React from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';


class DishDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderDish(dish) {
        if(dish != null) {
            return (
                <Card className="col-12 col-md-5 m-1">
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </Card>
            );
        }

        else {
            return (
                <div></div>
            );
        }
    }

    renderComments(dish) {
        if(dish != null && dish.comments != null) {
            const comment = dish.comments.map(review => {
                return (
                    <div key={review.id}>
                            <ul className="list-unstyled">
                                <li className="list-item">{review.comment}</li>
                                <li className="list-item">-- {review.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(review.date)))}</li>
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

        else {
            return (
                <div></div>
            );
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;