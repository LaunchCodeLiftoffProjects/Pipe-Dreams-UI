import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import StarRatings from 'react-star-ratings';

export default class ReviewComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            restroomId: this.props.match.params.id,
            businessName: '',
            username: '',
            rating: 1,
            reviewText: '',
            message: null
          }
        
        this.changeRating = this.changeRating.bind(this);
        this.loadData = this.loadData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.validate = this.validate.bind(this);
    }

    loadData() {
        axios.get(`http://localhost:8080/restrooms/${this.state.restroomId}`)
        .then(
          response => {
            this.setState({
              businessName: response.data.businessName
            })
          })
      }
    componentDidMount() {
        this.loadData();
        console.log(this.state.restroomId);
    }

    changeRating(newRating, name ) {
        this.setState({
          rating: newRating
        });
     
      }
    

    onSubmit (values){
        const review = {
            restroomId: this.state.restroomId,
            businessName: this.state.businessName,
            username: values.username,
            rating: values.rating,
            reviewText: values.reviewText
          };

          console.log(review);
        // axios.post(`http://localhost:8080/restrooms/${this.state.restroomId}/details`, review)
        //   .then((response) => {
        //       this.setState({message: `Review added to Restroom ID: ${this.state.restroomId}.`});
        //   })
        
    }
    render() {
        const {restroomId, businessName, username, rating, reviewText} = this.state;
        if (this.state.restroomId === -1) {
            return
        }
          
        return (
            <div>
                { this.state.isLoading && <div>Loading...please wait!</div>}
          
            {!this.state.isLoading && <div>
                <h1>Add Review</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Formik
                        initialValues = {{restroomId, businessName, username, rating, reviewText}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}>
            {
                (props) => (
                  <Form>
                    {// <ErrorMessage name="userName" component="div"
                    //   className="alert alert-warning" />
                }
                
                    <fieldset className="form-group">
                      <label>Restroom ID: </label>
                      <Field className="form-control" type="text" name="id" value={restroomId} disabled />
                    </fieldset>

                    <fieldset className="form-group">
                      <label>Business Name: </label>
                      <Field className="form-control" type="text" name="businessName" value={businessName} disabled />
                    </fieldset>

                    <fieldset className="form-group">
                    <label>Rating: </label>
                    <StarRatings
                      rating={this.state.rating}
                      starRatedColor="blue"
                      changeRating={this.changeRating}
                      numberOfStars={5}
                      name='rating'
                  />
                  </fieldset>

                    <fieldset className="form-group">
                      <label>Username: </label>
                      <Field className="form-control" type="text" name="username" />
                    </fieldset>
                  
                    <fieldset className="form-group">
                      <label>Review: </label>
                      <Field className="form-control" type="textarea" name="reviewText" />
                    </fieldset>

                    <button className="btn btn-success" type="submit">Save</button>
                    <a href='/restrooms/'>Cancel</a>
                </Form>
                )}
            </Formik>
        </div>
    </div>
           }
    </div>
    );
    }
}