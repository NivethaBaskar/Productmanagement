import React, { Component } from 'react';
import ProductDetails from './product-details';

class ProductListing extends Component {
	constructor() {
		super();
		this.state = {
			detailsHidden: true
		}
	}

	toggleDetails(e) {
		console.log("Toggle Details runs");
		this.setState({
			detailsHidden: !this.state.detailsHidden
		});
	}

	render() {

		if (this.state.detailsHidden) {
			return (
				<li className="product-listing">
					<div>{this.props.name}</div>
					<div className="strick-out-text">{`  ${this.props.price}  `}</div>
					<div>{this.props.offerPrice}</div>
					<div className="detail-toggle" onClick={this.toggleDetails.bind(this)}>Edit/Delete</div>
				</li>
			);
		} else {
			return (
				<li className="product-listing">
					<div className="detail-toggle" onClick={this.toggleDetails.bind(this)}>{this.props.name}</div>
					<ProductDetails
						modifyProduct={this.props.modifyProduct}
						deleteProduct={this.props.deleteProduct}
						name={this.props.name}
						offerPrice={this.props.offerPrice}
						price={this.props.price}
						description={this.props.description}/>
				</li>
			);
		}
	}
}

export default ProductListing;
