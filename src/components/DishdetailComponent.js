import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


class DishDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderDish(dish) {
        if(dish != null) {
            return (
                <Card>
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
                                <li className="list-item">-- {review.author}, {review.date}</li>
                            </ul>
                    </div>

                );
            });
            return (
                <div className="row container">
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
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.selectedDish)}
                </div>
            </div>
        );
    }
}

export default DishDetail;