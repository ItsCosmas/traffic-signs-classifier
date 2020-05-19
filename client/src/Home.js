import React from 'react';
import Classifier from './components/Classifier';

// Third Party
import { ToastProvider } from 'react-toast-notifications';

function Home() {
	return (
		<ToastProvider>
			<div className='home'>
				<div className='jumbotron'>
					<h1 className='heading heading--main text--white'>
						Traffic Sign Classifier
					</h1>
					<h4 className='text text--white'>
						Tip: Try Give Some Clear Images
					</h4>
				</div>
				<Classifier />
				<div className='footer'>
					<p className='text text--grey'>
						The Model Accuracy score against training data is:{' '}
						<span className='text--bold'>0.97537</span>
					</p>
					<p className='text text--grey'>
						<a
							href={`https://github.com/ItsCosmas/traffic-signs-classifier`}
							rel='noopener noreferrer'>
							Open Source
						</a>
					</p>
					<p className='text text--grey'>
						<a
							href={`https://itscosmas.me`}
							target={'_blank'}
							rel='noopener noreferrer'>
							&copy; Cosmas Gikunju
						</a>
					</p>
				</div>
			</div>
		</ToastProvider>
	);
}

export default Home;
