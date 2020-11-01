import React, {Component} from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Row,
    ModalHeader,
    ModalBody, Label, Modal
} from 'reactstrap'
import {Control, LocalForm, Errors} from "react-redux-form"
import { Link } from 'react-router-dom'

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

        )
    })
    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {comment}
            <CommentForm/>
        </div>
    )
}

const DishDetail = (props) => {
    if (props.dish != null) {
        console.log('DishDetail Component render invoked');
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments}/>
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

const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state= {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values))
        alert("Current State is: " + JSON.stringify(values))
    }

    render() {
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"/> Submit Comment
                </Button>
                <div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={3}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" name="rating"
                                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group ">
                                    <Label htmlFor="author" md={3}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" name="author"
                                                      className="form-control"
                                                      validators={{
                                                          maxLength: maxLength(15),
                                                          minLength: minLength(3)
                                                      }}>
                                        </Control.text>
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                maxLength: 'Must be 15 characters or less',
                                                minLength: 'Must be greater than 2 characters'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="feedback" md={3}>Feedback</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".feedback" name="feedback"
                                                      className="form-control" rows={6}>
                                        </Control.textarea>
                                    </Col>
                                </Row>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}

export default DishDetail;