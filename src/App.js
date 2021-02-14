import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import IndexView from './components/index-view';
import AddProduct from './components/add-product';

import originalProducts from './data/original-products';

// var localStorageTest = originalProducts;
   var ip = window.location.host;
    
class App extends Component {
	constructor(props) {
		super(props);
		if (!localStorage.getItem('products')) {
			localStorage.setItem('products', JSON.stringify(originalProducts));
			this.state = { products: originalProducts };
		} else {
			this.state = { products: JSON.parse(localStorage.getItem('products')) };
		}

		this.addProduct = this.addProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.modifyProduct = this.modifyProduct.bind(this);
	}

	componentWillUnmount() {
		localStorage.setItem('products', JSON.stringify(this.state.products));
	}

	deleteProduct(productInfo) {
		this.setState({
			products: this.state.products.filter((product) => {
				return product.name !== productInfo.title;
			})

		}, () => {
			localStorage.setItem('products', JSON.stringify(this.state.products));
		});

		
		// how to take out an item from an array - filter?
	}

	modifyProduct(productInfo, nameBeforeEdit) {
		var updatedProducts = this.state.products;
		this.setState({
			products: updatedProducts.map((product) => {
				if (product.name === nameBeforeEdit) {
					return {
						name: productInfo.title,
						description: productInfo.description,
						price: productInfo.price,
						offerPrice: productInfo.offerPrice
					}
				} else {
					return product;
				}
			})
		}, () => localStorage.setItem('products', JSON.stringify(this.state.products)));		
	}

	addProduct(productInfo) {
		var updatedProducts = this.state.products;
		updatedProducts.push({
	    name: productInfo.title,
		description: productInfo.description,
		price: productInfo.price,
		offerPrice: productInfo.offerPrice
	  });

		this.setState({
			products: updatedProducts
		}, () => localStorage.setItem('products', JSON.stringify(this.state.products)))
	}

  render() {
    return (
      <div className="App">
				<div id="new-container"></div>
				<div className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<h2>My Products from {ip}</h2>
			</div>
				<div id="root"></div>
				<IndexView
					productBank={this.state.products}
					modifyProduct={this.modifyProduct}
					deleteProduct={this.deleteProduct} />
				<AddProduct addProduct={this.addProduct} />
      </div>
    );
  }
}

export default App;
