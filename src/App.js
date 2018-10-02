import React, { Component } from 'react';
import './App.css';
import './asset/css/bootstrap.min.css';
import './asset/css/font-awesome.min.css';

import PhotosTable from './components/PhotosTable/PhotosTable';
import Navbar, {} from './components/Navbar/Navbar';

class App extends Component {
	render() {
		return (
		<div className="App">
			<Navbar/>
			<PhotosTable/>
		</div>
		);
	}
}

export default App;
