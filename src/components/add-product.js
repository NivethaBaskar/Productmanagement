import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NewProductForm from './new-product-form';

class AddProduct extends Component {


	constructor(props) {
		super(props);

		this.openProductForm = this.openProductForm.bind(this);
		this.keyCounter = 0;
	}

	openProductForm() {
		this.keyCounter++;
		ReactDOM.render(<NewProductForm key={this.keyCounter} addProduct={this.props.addProduct} />, document.getElementById('new-container'));
	}

	render() {
		return <button className="AddProduct" onClick={this.openProductForm}>Add Product</button>
	}
}

export default AddProduct;
