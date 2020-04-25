import React from "react";
import axios from "axios";
import {Stars} from "form-ratings";

export default class RestroomDetails extends React.Component {
  
    constructor(props) {
      super(props);
  
        this.state = {
            restroomId: this.props.match.params.id,
            businessName: '',
            businessType: '',
            address: '',
            isAccessible: false,
            isSingleStall: false,
            isGenderNeutral: false,
            hasChangingTable: false,
            reviews: [],
            message: null
        }

    this.loadData = this.loadData.bind(this);
    this.addReviewClicked = this.addReviewClicked.bind(this);
    this.deleteReviewClicked = this.deleteReviewClicked.bind(this);
    this.averageReviews = this.averageReviews.bind(this);

    }


    loadData = async () => {

      let restroom = await axios.get(`http://localhost:8080/restrooms/${this.state.restroomId}`)

      console.log(`Got restroom: ${JSON.stringify(restroom)}`);

      await this.setState({
        businessName: restroom.data.businessName,
        businessType: restroom.data.businessType,
        address: restroom.data.address,
        isAccessible: restroom.data.isAccessible,
        isSingleStall: restroom.data.isSingleStall,
        isGenderNeutral: restroom.data.isGenderNeutral,
        hasChangingTable: restroom.data.hasChangingTable
      });

      let reviews = await axios.get(`http://localhost:8080/reviews/restroom/${this.state.restroomId}`)

      console.log(`Got ${reviews.data.length} reviews`);

      await this.setState({reviews: reviews.data})
    
      };
    
      componentDidMount() {
        this.loadData();
      }


 
      refreshReviews = async () => {
        // let response = await axios.get(`http://localhost:8080/reviews/restroom/${this.state.restroomId}`)
         
        // console.log(`Got ${response.data.length} reviews`);

        // await this.setState({reviews: response.data});

      }

      averageReviews() {
        let sum = 0;
        this.refreshReviews();
        for (let i = 0; i < this.state.reviews.length; i++ ) {
          sum += this.state.reviews[i].rating;
        }
        return sum / this.state.reviews.length;
      }

      addReviewClicked(){
        this.props.history.push(`/add-review/${this.state.restroomId}`);
      }

      updateReviewClicked(reviewId) {
        console.log('Update: ' + reviewId);
        this.props.history.push(`/reviews/update/${this.state.restroomId}/${reviewId}`);
      }
      
      deleteReviewClicked(reviewId) {
        axios.delete(`http://localhost:8080/reviews/${reviewId}`)
        .then(response => {
          this.setState({message: `Review deleted!`});
          this.refreshReviews();
      })
      }

    render() {
        const restroom = {
            businessName: this.state.businessName,
            address: this.state.address,
            businessType: this.state.businessType,
            isAccessible: this.state.isAccessible,
            isSingleStall: this.state.isSingleStall,
            isGenderNeutral: this.state.isGenderNeutral,
            hasChangingTable: this.state.hasChangingTable
        }

        return(
        <div className="container">
            <div className="container">
                <h1>{restroom.businessName}</h1>
                <Stars value={this.averageReviews()} color="gold" /> <br />
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table className="table table-striped">
              <tbody>
            
                <tr>
                    <td>Address: </td>
                    <td>{restroom.address}</td>
                </tr>

                <tr>
                    <td>Business Type: </td>
                    <td>{restroom.businessType}</td>
                </tr>
                
                <tr>
                    <td>Single Stall?</td>
                    <td>{restroom.isSingleStall? "Yes" : "No"}</td>
                </tr>

                <tr>
                    <td>Accessible Option?</td>
                    <td>{restroom.isAccessible? "Yes" : "No"}</td>
                </tr>

                <tr>
                    <td>Gender Neutral Option?</td>
                    <td>{restroom.isGenderNeutral? "Yes" : "No"}</td>
                </tr>

                <tr>
                    <td>Has Changing Table(s)?</td>
                    <td>{restroom.hasChangingTable? "Yes" : "No"}</td>
                </tr>
            
              </tbody>
            </table>
            <button className="btn btn-success" onClick={this.addReviewClicked}>Leave a Review</button> &emsp;
            <a href="/restrooms">See All Restrooms</a>
        </div>

        <br />

        <div className="container">
          <h1>Reviews</h1>

            <table className="table">
                <tbody>
                {
                this.state.reviews.map(
                    review => 
                    <tr key={review.id}>
                        <td>Username: <br />
                            {review.username} <br />
                            <br />
                            Rating: <br />
                            <Stars value={review.rating} color="gold" /> <br />
                            <br />
                            Review: <br />
                            {review.reviewText}
                        </td>

                        <td>
                            <button className="btn btn-success" onClick={() => this.updateReviewClicked(review.id)}>Update</button><br /><br />
                            <button className="btn btn-warning" onClick={() => this.deleteReviewClicked(review.id)}>Delete</button>
                        </td>
                  </tr>
              )
            }
            
        
            </tbody>
        </table>
      </div>
      </div>
      </div>

        )
    }
}

    